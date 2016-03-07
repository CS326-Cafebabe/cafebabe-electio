import {readDocument, writeDocument, addDocument} from './database.js';

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


export function getUserName(userId, cb) {
  var userData = readDocument('users', userId);

  return emulateServerReturn(userData.fullName, cb);
}
