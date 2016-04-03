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

var numberOfCandidates = 9;

var app = express();
app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

//Trends getAllWeeks
app.get('/weeks', function(req, res) {
  var weeks = [];
  for(var i=1; i < 5; i++){
    weeks.push(readDocument('weeklyState', i));
  }
  res.status(200);
  res.send(weeks);
});

//Trends getAllUserRaceGender
app.get('/users/race/gender', function(req, res) {
  var userData = [];
  for(var i = 1; i <= 5; i++){
    var data = {race : readDocument('users', i).race, gender: readDocument('users', i).gender};
    userData.push(data);
  }
  res.status(200);
  res.send(userData);
});

// get all events
app.get('/events', function(req, res) {
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
  var pageNum = parseInt(req.params.page, 10);
  var start = 0;
  if (pageNum === 2) start = 3;

  var events = [];
  for (var i = start + 1; i <= start + 3; i++) {    // only need 3 events
    events.push(readDocument('events', i));
  }
  res.send(events);
});

// get all candidates
app.get('/candidates', function(req, res) {

  var candidates = [];
  for (var i = 1; i<=numberOfCandidates; i++) {
    candidates.push(readDocument('candidates', i));
  }
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

  res.send(sortedCandidates);

});

app.get('/candidates/id/:candidateid', function(req, res) {

  var candidate = readDocument('candidates', req.params.candidateid, 10);
  res.send(candidate)

});

// get independent candidates
app.get('/candidates/independent', function(req, res) {
  var allCandidates = getCollection('candidates');
  var numCandidates = Object.keys(allCandidates).length;

  var candidates = [];
  for (var i = 1; i <= numCandidates; i++) {
    var candidate = readDocument('candidates', i);
    if (candidate.party === 3 || candidate.party === 4) {
      candidates.push(candidate);
    }
  }
  res.send(candidates);
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  database.resetDatabase();
  res.send();
});

//get user data
app.get('/users/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  if(fromUser === userId){
    var user = readDocument('users', userId);
    res.send(user);
  }
  else{
    res.status(401).end();
  }
});

//set user data
app.put('/users/:userid', validate({ body: UserSchema }), function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
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

//get user Name
app.get('/users/:userid/fullName', function(req, res) {
  var userId = parseInt(req.params.userid, 10);
  var name = readDocument('users', userId).fullName.toString();
  res.status(200);
  res.send(name);
})

//get user party
app.get('/users/:userid/party', function(req, res) {
  var userId = parseInt(req.params.userid, 10);
  var userParty = readDocument('users', userId).politicalAffiliation.toString();
  res.status(200);
  res.send(userParty);
})

//Get All Chats
app.get('/chat', function(req, res) {
  var chatBoxes = [];
  for(var i = 1; i <= 6; i++){
    chatBoxes.push(readDocument('chatBox', i));
  }
  res.send(chatBoxes);
})

//Get Single Chat
app.get('/chat/:chatId', function(req, res){
  var chatId = parseInt(req.params.chatId, 10);
  res.send(readDocument('chatBox', chatId));
})

function postMessage(chatBoxId, authorId, message){
  var chatBox = readDocument('chatBox', chatBoxId);
  chatBox.messages.push({
    "author": authorId,
    "contents": message
  });
  writeDocument('chatBox', chatBox);
  return chatBox;
}

//postMessage
app.post('/chat/:chatId/messages/', validate({body: MessageSchema }), function(req, res) {
  var author = getUserIdFromToken(req.get('Authorization'));
  var body = req.body;
  var chatBoxId = parseInt(req.params.chatId, 10);
  if(author === body.author) {
    var chatBox = postMessage(chatBoxId, author, body.contents);
    res.status(201);
    res.set('Location', '/chat/' + chatBoxId + '/messages/')
    res.send(chatBox);
  }
  else res.status(401).end();
})

//get party
app.get('/parties/:partyid', function(req, res) {
  var partyId = parseInt(req.params.partyid, 10);
  var party = readDocument('parties', partyId);
  res.send(party);
});

//get all candidates of a given party
app.get('/candidates/party/:partyid', function(req, res) {
  var allCandidates = getCollection('candidates');
  var numberOfCandidates = Object.keys(allCandidates).length;
  var partyId = parseInt(req.params.partyid, 10);

  var candidates = [];
  for (var i = 1; i <= numberOfCandidates; i++) {
    var candidate = readDocument('candidates', i);
    if (partyId === candidate.party) {
      candidates.push(candidate);
    }
  }
  res.send(candidates);
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
    if (typeof id === 'number') {
      return id;
    } else {
      return -1;
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
