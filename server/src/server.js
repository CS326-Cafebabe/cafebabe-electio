var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/electio';

var logging = true;

function serverLog(message){
  if (logging === true){
    console.log("[" + new Date() + "]: " + message);
  }
}

MongoClient.connect(url, function(err, db) {
  // Put everything that uses `app` into this callback function.
  // from app.use(bodyParser.text());
  // all the way to
  // app.listen(3000, ...
  // Also put all of the helper functions that use mock database
  // methods like readDocument, writeDocument, ...


  var express = require('express');

  var bodyParser = require('body-parser');
  var validate = require('express-jsonschema').validate;

  var MessageSchema = require('./schemas/message.json');
  var database = require('./database');
  var addDocument = database.addDocument;
  var readDocument = database.readDocument;
  var writeDocument = database.writeDocument;
  var getCollection = database.getCollection;
  var UserSchema = require('./schemas/user_data.json');
  var NewUserSchema = require('./schemas/newUser_data.json')
  var nodemailer = require('nodemailer');
  var fs = require('fs');

  var mongo_express = require('mongo-express/lib/middleware');
  // Import the default Mongo Express configuration
  var mongo_express_config = require('mongo-express/config.default.js');
  var ResetDatabase = require('./resetdatabase');

  //var numberOfCandidates = 9;

  var app = express();
  app.use(express.static('../client/build'));
  app.use(bodyParser.text());
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use('/mongo_express', mongo_express(mongo_express_config));

  app.listen(3000, function() {
    serverLog("Started listening on port 3000!")
  });

  function buildAuthToken(userid){
    return new Buffer(JSON.stringify({ id: userid })).toString('base64');
  }

  //post a new user
  app.post('/users/newuser', validate({ body: NewUserSchema }), function(req, res){
    serverLog("POST user/newUser");

    var body = req.body;
    var newUser = {
      email: body.email,
      password: body.password,
      fullName: body.fullName,
      gender: null,
      race: null,
      hispanic: null,
      registered: null,
      age: null,
      politicalAffiliation: null,
      location: null,
      vote: null,
      emailSettings: []
    }

    //For every key in body, update the key in the newUser object.
    //This means that everything that is included is updated.
    //(NOTE: In javascript, the for..in.. operation loops through every KEY in an object.)
    for (i in body){
      newUser[i] = body[i];
    }

    //Verify data we've been given:

    //Email should be in this regex and less than or equal to 100 characters
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ( !emailRegex.test(newUser.email) || newUser.email.length > 100){
      res.status(400).end("Invalid email");
      //password should also be less than 100 chars. I imagine this can be more
      //specific when we implement password hashing, but this will do for now.
    } else if (newUser.password.length > 100) {
      res.status(400).end("Invalid password");
    } else if (newUser.fullName.length > 100) {
      res.status(400).end("Invalid fullName")
    } else {

      //check db does not have any users with that email yet...
      db.collection('users').find().toArray(function(err, result){

          if (err){
            res.status(500).end();
          }
          //check response is non zero
          if (result != null) {

            var valid = true;
            for (var i = 0; i<result.length; i++){
              if (result[i].email === newUser.email){
                valid = false;
              }
            }

            if (valid === false){
              res.status(409).end("Email already registered.")
            } else {

              //otherwise add the new user
              db.collection('users').insertOne(newUser, function(err, result) {
                if (err) {
                  // Something bad happened, and the insertion failed.
                  res.status(500).end();
                } else {
                  // Success!
                  res.status(201);
                  res.send(result.insertedId);
                }
              });

            }

          } else {
            res.status(400).end();
          }

      });

    }

  });

  app.delete('/users/:userid', function(req,res){
    serverLog("DELETE /users/" + req.params.userid);

    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    //first check authentication
    if (userid === fromUser){

      //if that checks out, delete from db
      db.collection("users").deleteOne({"_id": new ObjectID(userid)}, function (err, results){

        if (err){
          res.status(500).end();
        }

        //Send response with success
        if (results.deletedCount > 0){
          res.send();
        } else {
          res.status(400).end();
        }

      });

    } else {
      res.status(401).end();
    }

  });

  //Trends getAllWeeks
  app.get('/weeks', function(req, res) {
    serverLog("GET /weeks");
    db.collection('weeklyState').find().toArray(function(err, weeks){
      if(err){
        res.status(500);
        res.send("Database err " + err);
      }
      else{
        res.status(200);
        res.send(weeks);
      }
    });
  });

  //Trends getAllUserRaceGender
  app.get('/users/race/gender', function(req, res) {
    serverLog("GET /users/race/gender");
    db.collection('users').find().toArray(function(err, users){
      if(err){
        res.status(500);
        res.send("Database err " + err);
      }
      else{
        res.status(200);
        res.send(userRaceGender(users));
      }
    });
  });

  function userRaceGender(users){
    var userData = [];
    for(var i = 0; i < users.length; i++){
      var raceGen = {race: users[i].race, gender: users[i].gender}
      userData.push(raceGen);
    }
    return userData;
  }

  // get all events
  app.get('/events', function(req, res) {
    serverLog("GET /events");
    var allEvents = getCollection('events');
    var numEvents = Object.keys(allEvents).length;

    var events = [];
    for (var i = 1; i <= numEvents; i++) {
      events.push(readDocument('events', i));
    }
    res.send(events);
  })

  // get some events
  app.get('/events/:page', function(req, res) {
    serverLog("GET /events/" + req.params.page);
    var pageNum = parseInt(req.params.page, 10);
    var start = 0;
    if (pageNum === 2) start = 3;

    var events = [];
    for (var i = start + 1; i <= start + 3; i++) {    // only need 3 events
      events.push(readDocument('events', i));
    }
    res.send(events);
  });

  function getCandidates(callback){

    // Peform a simple find and return all the documents
    db.collection('candidates').find().toArray(function(err, candidates) {
      if (err){
        return callback(err, null)
      }
      //check response is non zero
      if (candidates != null) {
         //console.dir(doc);
         callback(null, candidates)
      } else {
         return callback(null, null);
      }

    });

  }

  function sortCandidates(candidates){
    //Sort the candidates
    //Get surName connected to id
    //Get surNames
    var surNameIdDict = {};
    var surNameArray = [];
    for (var j = 0; j<candidates.length; j++) {
      var split = candidates[j].fullName.split(" ");
      var surName = (split)[split.length-1];
      surNameIdDict[surName] = j;
      surNameArray.push(surName);
    }
    //sort surNames
    surNameArray.sort();
    //push the candidate of the correct id into the right position
    var sortedCandidates = [];

    for (var k = 0; k<surNameArray.length; k++){
      var oldId = surNameIdDict[surNameArray[k]];
      sortedCandidates.push(candidates[oldId]);
    }
    //Return data
    return sortedCandidates;
  }

  // get all candidates
  app.get('/candidates', function(req, res) {
    serverLog("GET /candidates");

    getCandidates( function (err, candidates){


      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send();
      } else if (candidates === null) {
        // Couldn't find the feed in the database.
        res.status(400).send();
      } else {

        // Send data.
        res.send(sortCandidates(candidates));
      }

  });

  });

  app.get('/candidates/id/:candidateid', function(req, res) {
    serverLog("GET /candidates/id/" + req.params.candidateid);
    var candidateID = new ObjectID(req.params.candidateid);

    db.collection('candidates').findOne({_id: candidateID},
      function(err, candidate) {
        if (err) {
          // An error occurred.
          res.status(500).send("Database error: " + err);
        } else if (candidate === null) {
          // Candidate not found
          res.status(400).send();
        }
        res.send(candidate);
    });

  });

  // get independent candidates
  app.get('/candidates/independent', function(req, res) {
    serverLog("GET /candidates/independent");
    //uses find to get candidates of independent parties
    //build the query using $or
    var query = {
      $or: [
        { "party": new ObjectID("000000000000000000000003") },
        { "party": new ObjectID("000000000000000000000004") }
      ]
    };
    //find all candidates matching that query
    db.collection('candidates').find(query).toArray(function(err, candidates) {
      if (err){
        res.status(500).send();
      }
      else if (candidates === null) {
        // Didn't find any candidates
        res.status(400).send();
      } else {
        //send em!
         res.send(candidates);
      }
    });
  });

  // Reset database.
  app.post('/resetdb', function(req, res) {
    serverLog("POST /resetdb");
    //reset JSON db
    database.resetDatabase();

    //Reset Mongo DB
    ResetDatabase(db, function() {
      res.send();
    });

  });

  //get user data
  app.get('/users/:userid', function(req, res) {
    serverLog("GET /users/"+ req.params.userid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    if(fromUser === req.params.userid){
      db.collection('users').findOne({_id: userId},
        function(err, user) {
          if (err) {
            // An error occurred.
            res.status(500).send("Database error: " + err);
          } else if (user === null) {
            // user not found
            res.status(400).send();
          }
          res.send(user);
      });
    }
    else{
      res.status(401).end();
    }
  });

  /*
  //get user data
  app.get('/users/:userid', function(req, res) {
    serverLog("GET /users/"+ req.params.userid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    if(fromUser === userId){
      var user = readDocument('users', userId);
      res.send(user);
    }
    else{
      res.status(401).end();
    }
  });
  */

  //set user data
  app.put('/users/:userid', validate({ body: UserSchema }), function(req, res) {
    serverLog("PUT /users/" + req.params.userid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    var body = req.body;
    if(fromUser === req.params.userid){
      var update =   { $set: {
          "_id": userId,
          "email": body.email,
          "password": body.password,
          "fullName": body.fullName,
          "gender": body.gender,
          "race": body.race,
          "hispanic": body.hispanic,
          "registered": body.registered,
          "age": body.age,
          "politicalAffiliation": new ObjectID(body.politicalAffiliation),
          "location": body.location,
          "vote": body.vote,

          "emailSettings": body.emailSettings
        }}
      db.collection('users').updateOne({_id: userId}, update, function(err, result) {
          if(err) {
            // An error occurred.
            res.status(500).send("Database error: " + err);
          } else if (result.modifiedCount === 0) {
              res.status(400).send();
          }
          db.collection('users').findOne({_id: userId},
            function(err, user) {
              if (err) {
                // An error occurred.
                res.status(500).send("Database error: " + err);
              } else if (user === null) {
                // user not found
                res.status(400).send();
              }
              res.send(user);
          });
        });
    }
    else {
      res.status(401).end();
    }
  });

  /*
  //set user data
  app.put('/users/:userid', validate({ body: UserSchema }), function(req, res) {
    serverLog("PUT /users/" + req.params.userid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    var body = req.body;
    if(fromUser === userId){
      var userData = {
        "_id": userId,
        "email": body.email,
        "password": body.password,
        "fullName": body.fullName,
        "gender": body.gender,
        "race": body.race,
        "hispanic": body.hispanic,
        "registered": body.registered,
        "age": body.age,
        "politicalAffiliation": body.politicalAffiliation,
        "location": body.location,
        "vote": body.vote,

        "emailSettings": body.emailSettings
      }
      writeDocument('users', userData);
      res.send(userData);
    }
    else{
      res.status(401).end();
    }
  });
  */

  //get user Name
  app.get('/users/:userid/fullName', function(req, res) {
    serverLog("GET /users/" + req.params.userid + "/fullName");
    var userID = new ObjectID(req.params.userid);

    db.collection('users').findOne({_id: userID},
      function(err, user) {
        if (err) {
          // An error occurred.
          res.status(500).send("Database error: " + err);
        } else if (user === null) {
          // Candidate not found
          res.status(400).send();
        }
        res.send(user.fullName);
    });
  })

  //get user party
  app.get('/users/:userid/party', function(req, res) {
    serverLog("GET /users/" + req.params.userid + "/party");
    var userID = new ObjectID(req.params.userid);
    db.collection('users').findOne({_id: userID},
      function(err, user) {
        if (err) {
          // An error occurred.
          res.status(500).send("Database error: " + err);
        } else if (user === null) {
          // Candidate not found
          res.status(400).send();
        }
        res.send(user.politicalAffiliation);
    });
  })

  //Get All Chats
  app.get('/chat', function(req, res) {
    serverLog("GET /chat");
    db.collection('chatBox').find().toArray(function(err, chats){
      if(err){
        res.status(500);
        res.send("Database err " + err);
      }
      else{
        res.status(200);
        res.send(chats);
      }
    });  })

  //Get Single Chat
  app.get('/chat/:chatId', function(req, res){
    serverLog("GET /chat/" + req.params.chatId);
    var chatID = new ObjectID(req.params.chatId);
    db.collection('chatBox').findOne({_id: chatID},
      function(err, chatBox) {
        if (err) {
          // An error occurred.
          res.status(500).send("Database error: " + err);
        } else if (chatBox === null) {
          // ChatBox not found
          res.status(400).send();
        }
        res.send(chatBox);
    });

    // var chatId = parseInt(req.params.chatId, 10);
    // res.send(readDocument('chatBox', chatId));
  })

  // function postMessage(chatBoxId, authorId, message){
  //   var chatBox = readDocument('chatBox', chatBoxId);
  //   chatBox.messages.push({
  //     "author": authorId,
  //     "contents": message
  //   });
  //   writeDocument('chatBox', chatBox);
  //   return chatBox;
  // }

  //postMessage
  app.post('/chat/:chatId/messages/', validate({body: MessageSchema }), function(req, res) {
    serverLog("POST /chat/" + req.params.chatId + "/messages");
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var message = req.body;
    var author = req.body.author;
    var chatID = new ObjectID(req.params.chatId);
    var newMessage = ({
      "author": new ObjectID(author),
      "contents": message.contents,
    });
    if (fromUser === author) {
      db.collection('chatBox').updateOne({ _id: chatID },
        {
          $push: {
            "messages": newMessage
              }
          }, function(err, chatBox) {
            if (err) {
              res.status(500).send("Database error: " + err);
            }
          else if (chatBox === null) {
            // ChatBox not found
            res.status(400).send();
          }
          res.send(chatBox);
      // var author = getUserIdFromToken(req.get('Authorization'));
      // var body = req.body;
      // var chatBoxId = parseInt(req.params.chatId, 10);
      // if(author === body.author) {
      //   var chatBox = postMessage(chatBoxId, author, body.contents);
      //   res.status(201);
      //   res.set('Location', '/chat/' + chatBoxId + '/messages/')
      //   res.send(chatBox);
      // }
      // else res.status(401).end();
  });
  }
})


  //get party
  app.get('/parties/:partyid', function(req, res) {
    serverLog("GET /parties/" + req.params.partyid);
    var partyID = new ObjectID(req.params.partyid);
    db.collection('parties').findOne({_id: partyID },
      function(err, party) {
        if (err) {
          // An error occurred.
          res.status(500).send("Database error: " + err);
        } else if (party === null) {
          // Candidate not found
          res.status(400).send();
        }
        res.send(party);
    });
  });

  //get all candidates of a given party
  app.get('/candidates/party/:partyid', function(req, res) {
    serverLog("GET /candidates/party/" + req.params.partyid);
    var partyid = new ObjectID(req.params.partyid);
    //look up the candidates of that party (find returns an array of them all)
    db.collection('candidates').find({"party": partyid}).toArray(function(err, candidates) {
      if (err){
        res.status(500).send();
      }
      else if (candidates === null) {
        // Didn't find any candidates
        res.status(400).send();
      } else {
        //send back the candidates
         res.send(candidates);
      }
    });
  });

  //get user data
  app.get('/users/:userid/emailsettings', function(req, res) {
    serverLog("GET /users/" + req.params.userid + "/emailsettings");
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);

    //check the sender for authorization
    if(fromUser === req.params.userid){
      //look up the user with proper id
      db.collection('users').findOne({_id: userId}, function(err, user){
      if(err){
        res.status(500).send();
      }else if (user === null) {
        // Didn't find any users
        res.status(400).send();
      } else {
        //send back that user's email settings array
         res.send(user.emailSettings);
      }
    });
  }
    else{
      res.status(401).end();
    }
  });

  //adds a candidate to the emailsettings of a user
  app.put('/users/:userid/emailsettings/:candid', function(req, res) {
    serverLog("PUT /users/" + req.params.userid + "/emailsettings/" + req.params.candid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    var candId = new ObjectID(req.params.candid);

    //need to make sure user is authorized
    if(fromUser === req.params.userid){

      //build the update to send
      var update = { $addToSet: {} };
      update.$addToSet["emailSettings"] = candId;

      //update the user object with the new added candid
      db.collection('users').updateOne({ _id: userId }, update, function(err, user) {
          if (err) {
            res.status(500).send();
          }else if (user === null) {
            res.status(400).send();
          } else {
              //look up the candidate object so as to send the email
              db.collection('candidates').findOne({_id: candId}, function(err, candidate){
                if (err) {
                  res.status(500).send();
                }
                else{
                  var subMessage = 'You just subscribed to emails regarding events affiliated with ' + candidate.fullName + ". To unsubscribe please return to email settings.";

                  //send the email
                  makeTransporter(function(transporter, devRecipient) {
                    var mailOptions = {
                        from: '"Elect.io" <electio.notifications@gmail.com>', // sender address
                        to: devRecipient, // list of receivers
                        subject: 'Recent Subscription', // Subject line
                        text: subMessage // plaintext body
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                      if(error){
                          return console.log(error);
                      }
                      console.log("[" + new Date() + ']: Message sent: ' + info.response);
                    });
                  });

                  //find the user to send the array back
                  db.collection('users').findOne({_id: userId}, function(err, user){
                  if(err){
                    res.status(500).send();
                  }else if (user === null) {
                    // Didn't find any users
                    res.status(400).send();
                  } else {
                     res.send(user.emailSettings);
                  }
                  });
                }
              });

            }
      });
    }
    else{
      res.status(401).end();
    }
  });

  //removes a candidate to the emailsettings of a user
  app.delete('/users/:userid/emailsettings/:candid', function(req, res) {
    serverLog("DELETE /users/" + req.params.userid + "/emailsettings" + req.params.candid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = new ObjectID(req.params.userid);
    var candId = new ObjectID(req.params.candid);

    //need to make sure user is authorized
    if(fromUser === req.params.userid){
      //update the users email settings, pull the candidateId
      db.collection('users').updateOne({ _id: userId },
            {
              $pull: {
                emailSettings: candId
              }
            }, function(err,user) {
              if (err) {
                res.status(500).send();
              }else if (user === null) {
                res.status(400).send();
              }
              else{
                  db.collection('candidates').findOne({_id: candId}, function(err, candidate){
                    //get the candidate info so it can send the email
                    if (err) {
                      res.status(500).send();
                    }
                    else{
                      var subMessage = 'You just unsubscribed to emails regarding events affiliated with ' + candidate.fullName + ". To subscribe again please return to email settings.";
                      //send the email
                      makeTransporter(function(transporter, devRecipient) {

                        var mailOptions = {
                            from: '"Elect.io" <electio.notifications@gmail.com>', // sender address
                            to: devRecipient, // list of receivers
                            subject: 'Recent Unsubscription', // Subject line
                            text: subMessage // plaintext body
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                          if(error){
                              return console.log(error);
                          }
                          console.log("[" + new Date() + ']: Message sent: ' + info.response);
                        });
                      });

                      //look up the user to send back the array of email settings
                      db.collection('users').findOne({_id: userId}, function(err, user){
                      if(err){
                        res.status(500).send();
                      }else if (user === null) {
                        // Didn't find any users
                        res.status(400).send();
                      } else {
                         res.send(user.emailSettings);
                      }
                      });
                    }
                  });
                }
            });
    }
    else{
      res.status(401).end();
    }
  });

  function makeTransporter(cb) {
    fs.readFile('./src/emailaccount.json', function(err, data) {
        if(err) console.error(err);
        var emailaccount = JSON.parse(data);
        var devRecipient = emailaccount.devRecipient
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: emailaccount.email,
                pass: emailaccount.password
            }
        });
        cb(transporter, devRecipient)
    });
  }


  //we call makeTransporter on an interval to send emails about upcoming events
  makeTransporter(function(transporter, devRecipient) {
    // console.log('hi');
    setInterval(function(){
      var events = getCollection('events');
      var numEvents = Object.keys(events).length;

      for(var i = 1; i <= numEvents; i++){

        var candEvent = readDocument('events', i);
        //if the time differential is 2 weeks away or less and it hasnt been notified
        if((candEvent.unixTime - (new Date).getTime()/1000 < 1209600) && (candEvent.unixTime - (new Date).getTime()/1000 > 0) && (candEvent.emailSent === false)){
          var users = getCollection('users');
          var numUsers = Object.keys(users).length;

          var subjectLine = 'Upcoming: ' + candEvent.name;
          var content = "This is a notification that " + candEvent.name + " is upcoming because you subscribed to a candidate affiliated with this event. \n \n The event will take place on the " + candEvent.date + "."
          //I would count the number of users here and iterate through all of them,
          //creating a list of recipients who actually would receive the email
          //based on their subscriptions.
          //However for dev purposes I only send 1 email to a dev email, not an email
          //actually in the db (which would be a quick change below in mailOptions)
          var usersToReceive = [];
          for(var j = 1; j <= numUsers; j ++){
            var user = readDocument('users', j);
            //iterate over the users subscriptions, check if associated with event
            for(var c = 0; c < user.emailSettings.length; c ++){
              //if the candId is shared, add to a list of users to receive the email, break to next user
              if(candEvent.associatedCandidates.indexOf(user.emailSettings[c]) !== -1){
                usersToReceive.push(user.email);
                break;
              }
            }
          }
          // console.log(usersToReceive);
          //Note: in the actual implementation, I would use the above "usersToReceive"
          //list of emails instead of devRecipient, sending to all users who are
          //subscribed. The code is all in place...
          var mailOptions = {
              from: '"Elect.io" <electio.notifications@gmail.com>', // sender address
              to: devRecipient, // list of receivers -- WOULD BE "usersToReceive"
              subject: subjectLine, // Subject line
              text: content// plaintext body
          };

          transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log("[" + new Date() + ']: Message sent: ' + info.response);
          });

          candEvent.emailSent = true;
          writeDocument('events', candEvent);
        }
      }



    }, 30000);
  });


  /**
   * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
   */
  function getUserIdFromToken(authorizationLine) {
    try {
      var token = authorizationLine.slice(7);
      var regularString = new Buffer(token, 'base64').toString('utf8');
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj['id'];
      // Check that id is a string.
       if (typeof id === 'string') {
         return id;
       } else {
         // Not a number. Return "", an invalid ID.
         return "";
       }
    } catch (e) {
      return -1;
    }
  }

  app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
      res.status(400).end();
    } else {
      next(err);
    }
  });




});
// The file ends here. Nothing should be after this.
