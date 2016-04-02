var express = require('express');

var bodyParser = require('body-parser');
//var validate = require('express-jsonschema').validate;

var database = require('./database');
var addDocument = database.addDocument;
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;

var app = express();
app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  database.resetDatabase();
  res.send();
});

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 *
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

 * Translate JSON Schema Validation failures into error 400s.
 *
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    res.status(400).end();
  } else {
    next(err);
  }
});
 */
