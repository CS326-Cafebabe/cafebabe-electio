import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "CAFEBABE";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "candidates" : {
    "1": {
      "headImage": "/img/candidateHeads/clintonHead.jpg",
      "logoImage": "img/candidateLogos/",
      "fullName": "Hilary Rodham Clinton",
      "partyName": "Democratic Party",
      "thumbType": "democrat",
      "description": "",
      "twitterFeed": "",
      "links": ""
    },
    "2": {
      "headImage": "/img/candidateHeads/cruzHead.jpg",
      "logoImage": "img/candidateLogos/",
      "fullName": "Ted Cruz",
      "partyName": "Republican Party",
      "thumbType": "republican",
      "description": "",
      "twitterFeed": "",
      "links": ""
    },
    "3": {
      "headImage": "/img/candidateHeads/delafuenteHead.jpg",
      "logoImage": "img/candidateLogos/",
      "fullName": "Roque De La Fuente",
      "partyName": "Democratic Party",
      "thumbType": "democrat",
      "description": "",
      "twitterFeed": "",
      "links": ""
    },
    "4": {
      "headImage": "/img/candidateHeads/rubioHead.jpg",
      "logoImage": "img/candidateLogos/",
      "fullName": "Marco Rubio",
      "partyName": "Republican Party",
      "thumbType": "republican",
      "description": "",
      "twitterFeed": "",
      "links": ""
    },
    "5": {
      "headImage": "img/candidateHeads/sandersHead.jpg",
      "logoImage": "img/candidateLogos/sandersLogo.png",
      "fullName": "Bernie Sanders",
      "partyName": "Democratic Party",
      "thumbType": "democrat",
      "description": "",
      "twitterFeed": "",
      "links": ""
    },
    "6": {
      "headImage": "img/candidateHeads/trumpHead.jpg",
      "logoImage": "img/candidateLogos/",
      "fullName": "Donald Trump",
      "partyName": "Republican Party",
      "thumbType": "republican",
      "description": "",
      "twitterFeed": "",
      "links": ""
    }
  },

  "events": {
    "1": {
      "date": "",
      "name": "New Hampshire Primary",
      "location": "",
      "summary": "",
      "party": ""
    },
    "2": {
      "date": "",
      "name": "Massachusetts Primary",
      "location": "",
      "summary": "",
      "party": ""
    },
    "3": {
      "date": "",
      "name": "Kansas Primary",
      "location": "",
      "summary": "",
      "party": ""
    }
  },

  "parties": {
    "1": {
      "name": "Democratic Party",
      "color": "#6194BC",
      "logo": "img/partyLogos/democraticParty.png"
    },

    "2": {
      "name": "Republican Party",
      "color": "#FF4E4D",
      "logo": "img/partyLogos/republicanParty.png"
    },

    "3": {
      "name": "Green Party",
      "color": "#805889",
      "logo": "img/partyLogos/republicanParty.png"
    },

    "4": {
      "name": "Libertarian Party",
      "color": "#805889",
      "logo": "img/partyLogos/republicanParty.png"
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
