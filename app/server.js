import {readDocument, writeDocument, addDocument} from './database.js';

var numberOfCandidates = 9;
var numberOfEvents = 3;

/**
* Emulates how a REST call is *asynchronous* -- it calls your function back
* some time in the future with data.
*/
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function  getUserData(userId, cb) {
  var userData = readDocument('users', userId);
  return emulateServerReturn(userData, cb);
}

export function getUserPoliticalAffiliation(userId){
  var userPolAff = readDocument('users', userId).PoliticalAffiliation;
  return userPolAff;
}

export function getUserName(userId, cb) {
  var userData = readDocument('users', userId);
  return emulateServerReturn(userData.fullName, cb);
}

export function getCandidate(candIndex, cb) {
  var candidate = readDocument('candidates', candIndex);
  emulateServerReturn(candidate, cb);
}

export function getAllEvents(cb) {
  var events = [];
  for (var i = 1; i <= 6; i++) {
    events.push(readDocument('events', i));
  }
  emulateServerReturn(events, cb);
}

export function getSomeEvents(page, cb) {
  var events = [];
  var start = 0;
  if (page === "2") {
    start = 3;
  }
  for (var i = start + 1; i <= start + numberOfEvents; i++) {
    events.push(readDocument('events', i));
  }
  emulateServerReturn(events, cb);
}

export function getAllCandidates(cb) {
  var candidates = [];
  for (var i = 1; i<=numberOfCandidates; i++) {
    candidates.push(readDocument('candidates', i));
  }

  //Sort the candidates

  //Get surName connected to id
  //Get surNames
  var surNameIdDict = {};
  var surNameArray = [];
  for (var i = 0; i<candidates.length; i++) {
    var split = candidates[i].fullName.split(" ");
    var surName = (split)[split.length-1];

    surNameIdDict[surName] = i;
    surNameArray.push(surName);

  }

  //sort surNames
  surNameArray.sort();

  //push the candidate of the correct id into the right position
  var sortedCandidates = [];
  for (var i = 0; i<surNameArray.length; i++){
    var oldId = surNameIdDict[surNameArray[i]];
    sortedCandidates.push(candidates[oldId]);
  }

  //return
  emulateServerReturn(sortedCandidates, cb);

}

// export function getAllChat(){
//
// }


export function getAllCandidatesOfParty(partyId, cb) {
  var candidates = [];
  for (var i = 1; i<=numberOfCandidates; i++) {
    var candidate = readDocument('candidates', i);
    if(partyId === candidate.party){
      candidates.push(readDocument('candidates', i));
    }
    emulateServerReturn(candidates, cb);
  }
}

//need new function because there are 2 party types for independents.
export function getIndCandidates(cb) {
  var candidates = [];
  for (var i = 1; i<=numberOfCandidates; i++) {
    var candidate = readDocument('candidates', i);
    if(candidate.party === 3 || candidate.party === 4){
      candidates.push(readDocument('candidates', i));
    }
    emulateServerReturn(candidates, cb);
  }
}


export function getParty(partyId, cb) {
  var party = readDocument('parties', partyId);
  emulateServerReturn(party, cb)
}

export function postMessage(chatBoxId, author, message, cb){
  var chatBox = readDocument('chatBox', chatBoxId);
  chatBox.messages.push({
    "author": author,
    "contents": message
  });
  writeDocument('chatBox', chatBox);
  emulateServerReturn(chatBox, cb);
}

export function getChat(chatId, cb) {
  var chat = readDocument('chatBox', chatId);
  emulateServerReturn(chat, cb)
}

export function getEmailSettings(userId, cb) {
  var user = readDocument('users', userId);
  var email = user.emailsettings;
  emulateServerReturn(email, cb)
}

export function subscribe(candId, userId, cb) {
  var user = readDocument('users', userId);
  // var email = user.emailsettings;

  user.emailsettings.push(candId);
  writeDocument('users', user);
  //emulateServerReturn(user.emailsettings.map((id) => readDocument('candidates', id)), cb);
  emulateServerReturn(user.emailsettings, cb);
}

export function unsubscribe(candId, userId, cb) {
  var user = readDocument('users', userId);
  //var email = user.emailsettings;

  // (We didn't *resolve* the FeedItem object, so it is just an array of user IDs)
  var candIndex = user.emailsettings.indexOf(candId);
  // -1 means the user is *not* in the likeCounter, so we can simply avoid updating
  // anything if that is the case: the user already doesn't like the item.
  if (candIndex !== -1) {
    // 'splice' removes items from an array. This removes 1 element starting from userIndex.
    user.emailsettings.splice(candIndex, 1);
    writeDocument('users', user);
  }
  // Return a resolved version of the likeCounter
  //emulateServerReturn(user.emailsettings.map((id) => readDocument('candidates', id)), cb);
  emulateServerReturn(user.emailsettings, cb);

}
