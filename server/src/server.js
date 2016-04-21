var express = require('express');

var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var nodemailer = require('nodemailer');
var fs = require('fs');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/electio';
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');

var database = require('./database');
var ResetDatabase = require('./resetdatabase');
var UserSchema = require('./schemas/user_data.json');
var NewUserSchema = require('./schemas/newUser_data.json')
var MessageSchema = require('./schemas/message.json');

function serverLog(message){
  console.log("[" + new Date() + "]: " + message);
}

MongoClient.connect(url, function(err, db) {
  var app = express();
  app.use(express.static('../client/build'));
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use('/mongo_express', mongo_express(mongo_express_config));

  app.listen(3000, function() {
    serverLog("Started listening on port 3000!")
  });

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
    for (var i in body){
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
            // Otherwise add the new user
            db.collection('users').insertOne(newUser, function(err, result) {
              if (err) {
                res.status(500).end();
              } else {
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

    if (userid === fromUser){
      //if that checks out, delete from db
      db.collection("users").deleteOne({"_id": new ObjectID(userid)}, function (err, results){
        if (err){
          res.status(500).end();
        }

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

    db.collection('events').find().toArray(function(err, events) {
      if (err) {
        res.status(500);
        res.send("Error: " + err);
      } else {
        res.status(200);
        res.send(events);
      }
    });
  });

  // get some events
  app.get('/events/:page', function(req, res) {
    serverLog("GET /events/" + pageNum);

    var pageNum = parseInt(req.params.page, 10);
    var start = 0;
    if (pageNum === 2) start = 3;

    db.collection('events').find(
      { $or: [
        { "_id": new ObjectID("00000000000000000000000" + (start + 1)) },
        { "_id": new ObjectID("00000000000000000000000" + (start + 2)) },
        { "_id": new ObjectID("00000000000000000000000" + (start + 3)) }
      ] }).toArray(function(err, events) {
        if (err) {
          res.status(500);
          res.send("Error: " + err);
        } else {
          res.status(200);
          res.send(events);
        }
      })
  });

  function getCandidates(callback){
    db.collection('candidates').find().toArray(function(err, candidates) {
      if (err){
        return callback(err, null)
      }
      //check response is non zero
      if (candidates != null) {
        callback(null, candidates)
      } else {
        return callback(null, null);
      }
    });
  }

  function sortCandidates(candidates){
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

    var sortedCandidates = [];
    for (var k = 0; k < surNameArray.length; k++){
      var oldId = surNameIdDict[surNameArray[k]];
      sortedCandidates.push(candidates[oldId]);
    }
    return sortedCandidates;
  }

  // get all candidates
  app.get('/candidates', function(req, res) {
    serverLog("GET /candidates");

    getCandidates( function (err, candidates){
      if (err) {
        res.status(500).send();
      } else if (candidates === null) {
        res.status(400).send();
      } else {
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
          res.status(500).send("Database error: " + err);
        } else if (candidate === null) {
          res.status(400).send();
        }
        res.send(candidate);
      });
    });

  // get independent candidates
  app.get('/candidates/independent', function(req, res) {
    serverLog("GET /candidates/independent");

    var query = {
      $or: [
        { "party": new ObjectID("000000000000000000000003") },
        { "party": new ObjectID("000000000000000000000004") }
      ]
    };
    db.collection('candidates').find(query).toArray(function(err, candidates) {
      if (err){
        res.status(500).send();
      } else if (candidates === null) {
        res.status(400).send();
      } else {
        res.send(candidates);
      }
    });
  });

  // Reset database.
  app.post('/resetdb', function(req, res) {
    serverLog("POST /resetdb");
    database.resetDatabase();
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
    } else {
        res.status(401).end();
    }
  });

  /*
  // get user data
  app.get('/users/:userid', function(req, res) {
    serverLog("GET /users/"+ req.params.userid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    if(fromUser === userId){
      var user = readDocument('users', userId);
      res.send(user);
    } else {
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
    if (fromUser === req.params.userid) {
      var objectIDemail = body.emailSettings.map((id) => {return new ObjectID(id)});
      console.log(objectIDemail);
      var update = { $set: {
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
        "vote": new ObjectID(body.vote),
        "emailSettings": objectIDemail

      } }

      db.collection('users').updateOne({_id: userId}, update, function(err) {
        if(err) {
          res.status(500).send("Database error: " + err);
        } 
        db.collection('users').findOne({_id: userId},
          function(err, user) {
            if (err) {
              res.status(500).send("Database error: " + err);
            } else if (user === null) {
              res.status(400).send();
            }
            res.send(user);
          });
        });
      } else {
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

    db.collection('users').findOne({ _id: userID },
      function(err, user) {
        if (err) {
          // An error occurred.
          res.status(500).send("Database error: " + err);
        } else if (user === null) {
          // Candidate not found
          res.status(400).send();
        }
        res.send(user.fullName);
      }
    );
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
      "contents": message.contents
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
  else {
    res.status(401).send();
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
    if (fromUser === req.params.userid){
      //look up the user with proper id
      db.collection('users').findOne({_id: userId}, function(err, user){
        if(err){
          res.status(500).send();
        } else if (user === null) {
          // Didn't find any users
          res.status(400).send();
        } else {
          //send back that user's email settings array
          res.send(user.emailSettings);
        }
      });
    } else{
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
        } else if (user === null) {
          res.status(400).send();
        } else {
          //look up the candidate object so as to send the email
          db.collection('candidates').findOne({_id: candId}, function(err, candidate){
            if (err) {
              res.status(500).send();
            } else{
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
                  if (error){
                    return console.log(error);
                  }
                  console.log("[" + new Date() + ']: Message sent: ' + info.response);
                });
              });

              //find the user to send the array back
              db.collection('users').findOne({_id: userId}, function(err, user){
                if(err){
                  res.status(500).send();
                } else if (user === null) {
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
    } else{
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
    // console.log('1');
    setInterval(function(){
      //var events = getCollection('events');
      //var numEvents = Object.keys(events).length;

      //for(var i = 1; i <= numEvents; i++){
      var currentTime = (new Date).getTime()/1000;
      var twoWeeksAway = (new Date).getTime()/1000 + 1209600;
      var query = {
        $and: [
          {"emailSent": false},
          {"unixTime": {$gt: currentTime}},
          {"unixTime": {$lt: twoWeeksAway}}
        ]
      }

      db.collection('events').find(query).toArray(function(err, events) {
        if (err){
          console.log(err);
        }
        else {
          // console.log(events);

          //iterate over events
          for(var i = 0; i < events.length; i++){

            var candEvent = events[i];
            // console.log(candEvent);
            var subjectLine = 'Upcoming: ' + candEvent.name;
            var content = "This is a notification that " + candEvent.name + " is upcoming because you subscribed to a candidate affiliated with this event. \n \n The event will take place on the " + candEvent.date + "."

            var userQuery = {"emailSettings": {$in: candEvent.associatedCandidates}};
            //get users who want an email for that event
            db.collection('users').find(userQuery).toArray(function(err){
              if(err){
                console.log(err);
              }
              else{
                // console.log(users);

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

                //update the current candEvent to no longer send an email
                db.collection('events').updateOne({"_id": candEvent._id}, {"emailSent": true}, function(err){
                  if (err){
                    console.log(err);
                  }
                });
              }
            });
          }
        }
      });
    }, 30000);
  });

  //this setInterval will be to create new weeklyStates. In the real site,
  //this should create one every week, but for dev purposes (and grading purposes)
  //I set the interval to 20 secs instead of 1 week.
  setInterval(function(){

    var newWeeklyState = {
      "startDate": new Date().toLocaleString(),
      "unixTime": new Date().getTime()/1000,
      "ballotBox": []
    }
    db.collection('weeklyState').insertOne(newWeeklyState, function(err, result){
      if(err){
        console.log(err);
      }
      else{
        //update the ballotBox of the recently inserted weeklyState
        //find all votes that are nonzero (user has voted)
        var notVoted = new ObjectID("000000000000000000000000");
        db.collection('users').find({'vote': {$ne: notVoted}}).toArray(function(err, users){
          if(err){
            console.log(err);
          }
          else{
            var newBallotBox = [];
            for(var i = 0; i < users.length; i++){
              newBallotBox.push({
                "user": users[i]._id,
                "candidate": new ObjectID(users[i].vote)
              });
            }

            //update the new weeklyState with the newBallotBox
            db.collection('weeklyState').updateOne({"_id": result.insertedId}, {$set: {"ballotBox": newBallotBox}}, function(err){
              if(err){
                console.log(err);
              }
              else{
                console.log("You Have a New Weekly State!");
              }
            });
          }
        });
        // console.log(result);
      }
    });
  }, 20000);

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
