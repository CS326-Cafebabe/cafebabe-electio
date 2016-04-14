// import {readDocument, writeDocument, addDocument} from './database.js';

var numberOfCandidates = 9;
var numberOfChats = 6;
var numberOfWeeks = 5;
var numberOfUsers = 5;
var numberOfEvents = 7;

/**
* Emulates how a REST call is *asynchronous* -- it calls your function back
* some time in the future with data.
*/
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

//var token = 'eyJpZCI6MX0=';
//Once we move to the mongo database this is the new token to use:
var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9';


function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global ElectError */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      ElectError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    ElectError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    ElectError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function  getUserData(userId, cb) {
  sendXHR('GET', '/users/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function setUserData(userId, newData, cb) {
  sendXHR('PUT', '/users/' + userId, {
    _id: userId,
    email: newData.email,
    password: newData.password,
    fullName: newData.fullName,
    gender: newData.gender,
    race: newData.race,
    hispanic: newData.hispanic,
    registered: newData.registered,
    age: newData.age,
    politicalAffiliation: newData.politicalAffiliation,
    location: newData.location,
    vote: newData.vote,
    emailSettings: newData.emailSettings
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getCandidate(candIndex, cb) {

  sendXHR('GET', ('/candidates/id/' + candIndex), undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });

}

export function getSomeEvents(page, cb) {
  sendXHR('GET', '/events/' + page, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getAllEvents(cb) {
  sendXHR('GET', '/events', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getAllCandidates(cb) {

  sendXHR('GET', '/candidates', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });

}

export function getAllChat(cb){

  sendXHR('GET', '/chat', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
  // var chatBoxes = [];
  // for(var i = 1; i <= numberOfChats; i++){
  //   chatBoxes.push(readDocument('chatBox', i));
  // }
  // emulateServerReturn(chatBoxes, cb);
}


export function getAllCandidatesOfParty(partyId, cb) {
  // var candidates = [];
  // for (var i = 1; i<=numberOfCandidates; i++) {
  //   var candidate = readDocument('candidates', i);
  //   if(partyId === candidate.party){
  //     candidates.push(readDocument('candidates', i));
  //   }
  //   emulateServerReturn(candidates, cb);
  // }

  sendXHR('GET', '/candidates/party/' + partyId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//need new function because there are 2 party types for independents.
export function getIndCandidates(cb) {
  sendXHR('GET', '/candidates/independent', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getParty(partyId, cb) {
  sendXHR('GET', '/parties/' + partyId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postMessage(chatBoxId, authorID, message, cb){
  // var chatBox = readDocument('chatBox', chatBoxId);
  // chatBox.messages.push({
  //   "author": author,
  //   "contents": message
  // });
  // writeDocument('chatBox', chatBox);
  // emulateServerReturn(chatBox, cb);
  sendXHR('POST', '/chat/' + chatBoxId + '/messages', {
    author: authorID,
    contents: message
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getChat(chatId, cb) {
  // var chat = readDocument('chatBox', chatId);
  // emulateServerReturn(chat, cb)
  sendXHR('GET', '/chat/' + chatId, undefined, (xhr) =>{
    cb(JSON.parse(xhr.responseText));
  })
}

export function getUserName(userId, cb){
  sendXHR('GET', '/users/' + userId + '/fullName', undefined, (xhr) => {
    cb((xhr.responseText));
  })
}

export function getUserParty(userId, cb){
  sendXHR('GET', '/users/' + userId + '/party', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}

export function getEmailSettings(userId, cb) {
  // var user = readDocument('users', userId);
  // var email = user.emailSettings;
  // emulateServerReturn(email, cb)

  sendXHR('GET', '/users/' + userId + '/emailsettings', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}

export function subscribe(candId, userId, cb) {
  // var user = readDocument('users', userId);
  // // var email = user.emailSettings;
  // user.emailSettings.push(candId);
  // writeDocument('users', user);
  // //emulateServerReturn(user.emailSettings.map((id) => readDocument('candidates', id)), cb);
  // emulateServerReturn(user.emailSettings, cb);
  sendXHR('PUT', '/users/' + userId + '/emailsettings/' + candId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function unsubscribe(candId, userId, cb) {
  // var user = readDocument('users', userId);
  // //var email = user.emailSettings;
  // // (We didn't *resolve* the FeedItem object, so it is just an array of user IDs)
  // var candIndex = user.emailSettings.indexOf(candId);
  // // -1 means the user is *not* in the likeCounter, so we can simply avoid updating
  // // anything if that is the case: the user already doesn't like the item.
  // if (candIndex !== -1) {
  //   // 'splice' removes items from an array. This removes 1 element starting from userIndex.
  //   user.emailSettings.splice(candIndex, 1);
  //   writeDocument('users', user);
  // }
  // // Return a resolved version of the likeCounter
  // //emulateServerReturn(user.emailSettings.map((id) => readDocument('candidates', id)), cb);
  // emulateServerReturn(user.emailSettings, cb);
  sendXHR('DELETE', '/users/' + userId + '/emailsettings/' + candId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getAllUserRaceGender(cb){
  sendXHR('GET', '/users/race/gender', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}

export function postNewUser(userData, cb){
  sendXHR('POST', '/user/newUser', {userData}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}

export function getAllWeeks(cb){
  sendXHR('GET', '/weeks', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}
