var express = require('express');

var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;

var MessageSchema = require('./schemas/message.json');
var database = require('./database');
var addDocument = database.addDocument;
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var getCollection = database.getCollection;

var app = express();
app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('Listening on port 3000!');
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

//get User Settings page with Settings
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
})

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
