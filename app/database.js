import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "CAFEBABE";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "candidates" : {
    "1": {
      "headImage": "/img/candidateHeads/clintonHead.jpg",
      "logoImage": "img/candidateLogos/clintonLogo.png",
      "fullName": "Hillary Clinton",
      "party": 1,
      "thumbType": "democrat-thumb",
      "description": "Hillary Diane Rodham Clinton (born October 26, 1947) is an American politician. She was the 67th United States Secretary of State from 2009 to 2013. From 2001 to 2009, Clinton served as a United States Senator from New York. She is the wife of the 42nd President of the United States Bill Clinton, and was First Lady of the United States during his tenure from 1993 to 2001. Since 2015, she is a candidate for the Democratic nomination for President of the United States in the 2016 election. As Secretary of State in the Obama administration from January 2009 to February 2013, Clinton was at the forefront of the U.S. response to the Arab Spring and advocated the U.S. military intervention in Libya. She took responsibility for security lapses related to the 2012 Benghazi attack, which resulted in the deaths of American consulate personnel, but defended her personal actions in regard to the matter. Clinton viewed 'smart power' as the strategy for asserting U.S. leadership and values, by combining military power with diplomacy and American capabilities in economics, technology, and other areas. She used social media to communicate the U.S. message abroad. Leaving office at the end of Obama's first term, she authored her fifth book and undertook speaking engagements before announcing her second run for the Democratic nomination in the 2016 presidential election in April 2015.",
      "twitterFeed": "",
      "campaignWebsite": "https://www.hillaryclinton.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Hillary_Clinton",
      "age": "68",
      "quote": "'Hillary for America.'"
    },
    "2": {
      "headImage": "/img/candidateHeads/cruzHead.jpg",
      "logoImage": "img/candidateLogos/cruzLogo.png",
      "fullName": "Ted Cruz",
      "party": 2,
      "thumbType": "republican-thumb",
      "description": "Rafael Edward 'Ted' Cruz (born December 22, 1970) is an American politician and the junior United States Senator from Texas. He is a candidate for the Republican nomination for President of the United States in the 2016 election. Cruz graduated from Princeton University in 1992, and from Harvard Law School in 1995. Between 1999 and 2003, Cruz was the director of the Office of Policy Planning at the Federal Trade Commission, an associate deputy attorney general at the United States Department of Justice, and domestic policy advisor to President George W. Bush on the 2000 George W. Bush presidential campaign. He served as Solicitor General of Texas from 2003 to 2008, appointed by Texas Attorney General Greg Abbott. He was the first Hispanic, and the longest-serving solicitor general, in Texas history. From 2004 to 2009, Cruz was also an adjunct professor of law at the University of Texas School of Law in Austin, where he taught U.S. Supreme Court litigation. Cruz began campaigning for the Republican presidential nomination in March 2015. During the primary campaign, his base of support has been mainly among social conservatives, though he has had crossover appeal to other factions within his party, including in particular libertarian conservatives. His victory in the February 1, 2016 Iowa caucuses marked the first time a Hispanic person won a presidential caucus.",
      "twitterFeed": "",
      "campaignWebsite": "https://www.tedcruz.org/",
      "wikipedia": "https://en.wikipedia.org/wiki/Ted_Cruz",
      "age": "45",
      "quote": "'Reigniting the promise of America.'"
    },
    "3": {
      "headImage": "/img/candidateHeads/delafuenteHead.jpg",
      "logoImage": "img/candidateLogos/delafuenteLogo.png",
      "fullName": "Roque De La Fuente",
      "party": 1,
      "thumbType": "democrat-thumb",
      "description": "Roque 'Rocky' De La Fuente Guerra (born October 10, 1954)[1] is an American businessman, developer, and real estate tycoon from San Diego, California who is running to be the Democratic nominee for President of the United States in the 2016 elections. Rocky De La Fuente Guerra was born to Roque De La Fuente Alexander and Bertha Guerra Yzaguirre on October 10, 1954[2] at Mercy Hospital in San Diego, California. He was raised both in and out of the United States, spending time as a child and youth in Mexico City, Tijuana in Baja and Anaheim in California. He was raised by several different groups and organizations including the Legionaries of Christ, the Marist Brothers, The Carmelite Sisters of the Most Sacred Heart, Daughters of the Holy Spirit and Jesuit priests. As a youth, De La Fuente attended Saint Catherine's Military Academy in Anaheim, California and then earned a B.S in Physics and in Mathematics at Anahuac University which is located just outside Mexico City. The focus of his studies at Anahuac was Business Administration. Rocky De La Fuente filed his candidacy for President of the United States with the Federal Election Commission, filing as a Democrat.[6] He identifies as a conservative Democrat. He says he was inspired to run after becoming dissatisfied with the current crop of candidates, especially Donald Trump, whom he accuses of alienating large segments of the population. De La Fuente said he will primarily promote his campaign via social media.",
      "twitterFeed": "",
      "campaignWebsite": "https://www.rocky2016.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Rocky_De_La_Fuente",
      "age": "61",
      "quote": "'We the people need to take back our democracy.'"
    },
    "4": {
      "headImage": "/img/candidateHeads/rubioHead.jpg",
      "logoImage": "img/candidateLogos/rubioLogo.png",
      "fullName": "Marco Rubio",
      "party": 2,
      "thumbType": "republican-thumb",
      "description": "Marco Antonio Rubio (born May 28, 1971) is an American attorney, politician and junior United States Senator from Florida. Rubio previously served as Speaker of the Florida House of Representatives. He is a candidate for the Republican nomination for President of the United States, in the 2016 election. Rubio is a Cuban American from Miami, with degrees from the University of Florida and the University of Miami School of Law. In the late 1990s, he served as a City Commissioner for West Miami and was elected to the Florida House of Representatives in 2000, representing the 111th House district. Rubio successfully ran for United States Senate in 2010. In the U.S. Senate, he chairs the Commerce Subcommittee on Oceans, Atmosphere, Fisheries, and Coast Guard, as well as the Foreign Relations Subcommittee on Western Hemisphere, Transnational Crime, Civilian Security, Democracy, Human Rights and Global Women's Issues. He is one of three Latino Americans serving in the Senate. On April 13, 2015, Rubio announced that he would forgo seeking reelection to the Senate to run for President.",
      "twitterFeed": "",
      "campaignWebsite": "https://marcorubio.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Marco_Rubio",
      "age": "44",
      "quote": "'A new American century.'"
    },
    "5": {
      "headImage": "img/candidateHeads/sandersHead.jpg",
      "logoImage": "img/candidateLogos/sandersLogo.png",
      "fullName": "Bernie Sanders",
      "party": 1,
      "thumbType": "democrat-thumb",
      "description": "The 2016 presidential campaign of Bernie Sanders, the junior United States Senator and former Representative from Vermont, began with a formal announcement by Sanders on May 26, 2015, in Burlington, Vermont, which followed an informal announcement on April 30. Sanders had been considered a potential candidate for President of the United States since at least September 2014. Although Sanders is an independent, he caucuses with the Democratic Party in the Senate, as many of his views align with those of Democrats, and he is running for the Democratic nomination. Sanders's chief competitor for the nomination is Hillary Clinton; Martin O'Malley was in a distant third place until he suspended his campaign on February 1, 2016. Sanders draws large crowds to his speaking events and his populist and democratic socialist politics have won him support from working‑class voters, especially those under 40. He performs strongly with white voters but has consistently trailed Clinton by 30 or more percentage points among nonwhite voters. Sanders has stated that his campaign will focus on income and wealth inequality, which he argues is eroding the American middle class, and on campaign finance reform. Unlike most other major presidential candidates, Sanders has eschewed an unlimited super PAC, instead choosing to receive most of his funding from direct individual campaign donations. On September 30, 2015, The New York Times reported that Sanders had raised $26 million over the preceding three months, close behind Hillary Clinton's $28 million, and that the campaign had received one million individual donations, becoming the first in 2015 to reach that threshold.",
      "twitterFeed": "",
      "campaignWebsite": "https://berniesanders.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Bernie_Sanders",
      "age": "74",
      "quote": "'A political revolution is coming.'"
    },
    "6": {
      "headImage": "img/candidateHeads/trumpHead.jpg",
      "logoImage": "img/candidateLogos/trumpLogo.png",
      "fullName": "Donald Trump",
      "party": 2,
      "thumbType": "republican-thumb",
      "description": "Donald John Trump (born June 14, 1946) is an American businessman, politician, television personality, and a candidate for the Republican nomination for President of the United States in the 2016 election. He is the chairman and president of The Trump Organization and the founder of Trump Entertainment Resorts, a gaming and hotel enterprise. His business activities, television work, outspoken manner, and personal life have made him an international celebrity. Trump is a native of New York City and a son of Fred Trump, who inspired him to enter real estate development. While still attending college he worked for his father's firm, Elizabeth Trump & Son. Upon graduating from college in 1968 he joined the company, and in 1971 was given control, renaming the company 'The Trump Organization.' Since then he has built casinos, golf courses, hotels, and other properties, many of which bear his name. He has received prominent media exposure, and the NBC reality show The Apprentice bolstered his fame. His three marriages were extensively covered in tabloids. He first ran for the U.S. presidency in 2000, winning two Reform Party primaries. On June 16, 2015, Trump again announced his candidacy for president, this time as a Republican. He won the New Hampshire primary with 35% of the vote, the South Carolina primary with 33%, and the Nevada caucuses with 46%. On Super Tuesday in March 2016, Trump won Alabama, Arkansas, Georgia, Massachusetts, Tennessee, Vermont, and Virginia, solidifying his status as the Republican frontrunner.",
      "twitterFeed": "",
      "campaignWebsite": "https://www.donaldjtrump.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Donald_Trump",
      "age": "69",
      "quote": "'Make America great again.'"
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
      "logo": "img/partyLogos/gp.png"
    },
    "4": {
      "name": "Libertarian Party",
      "color": "#805889",
      "logo": "img/partyLogos/lib.png"
    }
  },

  "events": {
    "1": {
      "date": "7. February 2016",
      "name": "Eighth Republican Debate",
      "location": "New Hampshire",
      "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu commodo arcu, id volutpat diam. Suspendisse accumsan et ligula sed hendrerit. In volutpat ligula ut laoreet vulputate. Mauris a magna nec nisi scelerisque porta. Cras tellus lectus, bibendum eget enim id, consequat venenatis elit. Sed rutrum fermentum porttitor.",
      "party": "Republican",
      //2D Array: First cell is user_id and second is candidate_id
      "ballotBox": [
        {
          "user": 4,
          "candidate": 4
        },
        {
          "user": 5,
          "candidate": 5
        },
        {
          "user": 2,
          "candidate": 0
        }
      ]
    },
    "2": {
      "date": "4. February 2016",
      "name": "Fifth Democratic Debate",
      "location": "New Hampshire",
      "summary": "Sed eu ligula eu enim rhoncus hendrerit eget nec dolor. Nunc imperdiet interdum dolor eu fringilla. Quisque luctus fermentum velit bibendum aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fusce et dolor id tellus porttitor pretium ac non dolor. Fusce porta feugiat tellus, ut convallis ante varius a.",
      "party": "Democrat",
      "ballotBox": [
        {
          "user": 1,
          "candidate": 1
        },
        {
          "user": 2,
          "candidate": 2
        },
        {
          "user": 3,
          "candidate": 3
        }
      ]
    },
    "3": {
      "date": "1. February 2016",
      "name": "Iowa Caucus",
      "location": "Iowa",
      "summary": " Iowa Democratic Caucus is won by Hillary Clinton. Iowa Republican Caucus is won by Ted Cruz. Martin O'Malley drops out of the Democratic race. Mike Huckabee drops out of the Republican race.",
      "party": "",
      "ballotBox": [
        {
          "user": 4,
          "candidate": 1
        },
        {
          "user": 5,
          "candidate": 2
        },
        {
          "user": 1,
          "candidate": 3
        }
      ]
    }
  },

  "users":{
    "1":{
      "_id":1,
      "Email":"richards@umass.edu",
      "Password":"Timmy1234",
      "fullName":"Tim Richards",
      "Gender":"Male",
      "Race/Ethnic":"SomeRace",
      "Age":21,
      "PoliticalAffiliation":2,
      "Location":"Amherst, MA"
    },
    "2":{
      "_id":2,
      "Email":"generic@email.com",
      "Password":"genericPass",
      "fullName":"Generic Name",
      "Gender":"Gender",
      "Race/Ethnic":"SomeRace",
      "Age":21,
      "PoliticalAffiliation":1,
      "Location":"Amherst, MA"
    },
    "3":{
      "_id":3,
      "Email":"generic@email.com",
      "Password":"genericPass",
      "fullName":"Generic Name",
      "Gender":"Gender",
      "Race/Ethnic":"SomeRace",
      "Age":21,
      "PoliticalAffiliation":2,
      "Location":"Amherst, MA"
    },
    "4":{
      "_id":4,
      "Email":"generic@email.com",
      "Password":"genericPass",
      "fullName":"Generic Name",
      "Gender":"Gender",
      "Race/Ethnic":"SomeRace",
      "Age":21,
      "PoliticalAffiliation":1,
      "Location":"Amherst, MA"
    },
    "5":{
      "_id":5,
      "Email":"generic@email.com",
      "Password":"genericPass",
      "fullName":"Generic Name",
      "Gender":"Gender",
      "Race/Ethnic":"SomeRace",
      "Age":21,
      "PoliticalAffiliation":1,
      "Location":"Amherst, MA"
    }
  },

  "chatBox":{
    "1":{
      "_id":1,
      "fullName":"Clinton Debate",
      "messages": [
        {
          "author": 1,
          "contents": "Debate Hillary Here"
        },
        {
          "author": 1,
          "contents": "Test second message"
        }
      ],
      "active": 1453668480000
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
