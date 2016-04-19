var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "electio";
// Put the initial mock objects here.
var initialData = {
  "candidates" : {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "headImage": "/img/candidateHeads/clintonHead.jpg",
      "logoImage": "img/candidateLogos/clintonLogo.png",
      "fullName": "Hillary Clinton",
      "party": new ObjectID("000000000000000000000001"),
      "cssType": "democrat",
      "description": "Hillary Diane Rodham Clinton (born October 26, 1947) is an American politician. She was the 67th United States Secretary of State from 2009 to 2013. From 2001 to 2009, Clinton served as a United States Senator from New York. She is the wife of the 42nd President of the United States Bill Clinton, and was First Lady of the United States during his tenure from 1993 to 2001. Since 2015, she is a candidate for the Democratic nomination for President of the United States in the 2016 election. As Secretary of State in the Obama administration from January 2009 to February 2013, Clinton was at the forefront of the U.S. response to the Arab Spring and advocated the U.S. military intervention in Libya. She took responsibility for security lapses related to the 2012 Benghazi attack, which resulted in the deaths of American consulate personnel, but defended her personal actions in regard to the matter. Clinton viewed 'smart power' as the strategy for asserting U.S. leadership and values, by combining military power with diplomacy and American capabilities in economics, technology, and other areas. She used social media to communicate the U.S. message abroad. Leaving office at the end of Obama's first term, she authored her fifth book and undertook speaking engagements before announcing her second run for the Democratic nomination in the 2016 presidential election in April 2015.",
      "twitterHashtag": "HillaryClinton",
      "twitterID": "707644420208906240",
      "campaignWebsite": "https://www.hillaryclinton.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Hillary_Clinton",
      "age": "68",
      "quote": "\"Hillary for America.\""
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "headImage": "/img/candidateHeads/cruzHead.jpg",
      "logoImage": "img/candidateLogos/cruzLogo.png",
      "fullName": "Ted Cruz",
      "party": new ObjectID("000000000000000000000002"),
      "cssType": "republican",
      "description": "Rafael Edward 'Ted' Cruz (born December 22, 1970) is an American politician and the junior United States Senator from Texas. He is a candidate for the Republican nomination for President of the United States in the 2016 election. Cruz graduated from Princeton University in 1992, and from Harvard Law School in 1995. Between 1999 and 2003, Cruz was the director of the Office of Policy Planning at the Federal Trade Commission, an associate deputy attorney general at the United States Department of Justice, and domestic policy advisor to President George W. Bush on the 2000 George W. Bush presidential campaign. He served as Solicitor General of Texas from 2003 to 2008, appointed by Texas Attorney General Greg Abbott. He was the first Hispanic, and the longest-serving solicitor general, in Texas history. From 2004 to 2009, Cruz was also an adjunct professor of law at the University of Texas School of Law in Austin, where he taught U.S. Supreme Court litigation. Cruz began campaigning for the Republican presidential nomination in March 2015. During the primary campaign, his base of support has been mainly among social conservatives, though he has had crossover appeal to other factions within his party, including in particular libertarian conservatives. His victory in the February 1, 2016 Iowa caucuses marked the first time a Hispanic person won a presidential caucus.",
      "twitterHashtag": "TedCruz",
      "twitterID": "707644754406875136",
      "campaignWebsite": "https://www.tedcruz.org/",
      "wikipedia": "https://en.wikipedia.org/wiki/Ted_Cruz",
      "age": "45",
      "quote": "\"Reigniting the promise of America.\""
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "headImage": "/img/candidateHeads/delafuenteHead.jpg",
      "logoImage": "img/candidateLogos/delafuenteLogo.png",
      "fullName": "Roque De La Fuente",
      "party": new ObjectID("000000000000000000000001"),
      "cssType": "democrat",
      "description": "Roque 'Rocky' De La Fuente Guerra (born October 10, 1954)[1] is an American businessman, developer, and real estate tycoon from San Diego, California who is running to be the Democratic nominee for President of the United States in the 2016 elections. Rocky De La Fuente Guerra was born to Roque De La Fuente Alexander and Bertha Guerra Yzaguirre on October 10, 1954[2] at Mercy Hospital in San Diego, California. He was raised both in and out of the United States, spending time as a child and youth in Mexico City, Tijuana in Baja and Anaheim in California. He was raised by several different groups and organizations including the Legionaries of Christ, the Marist Brothers, The Carmelite Sisters of the Most Sacred Heart, Daughters of the Holy Spirit and Jesuit priests. As a youth, De La Fuente attended Saint Catherine's Military Academy in Anaheim, California and then earned a B.S in Physics and in Mathematics at Anahuac University which is located just outside Mexico City. The focus of his studies at Anahuac was Business Administration. Rocky De La Fuente filed his candidacy for President of the United States with the Federal Election Commission, filing as a Democrat.[6] He identifies as a conservative Democrat. He says he was inspired to run after becoming dissatisfied with the current crop of candidates, especially Donald Trump, whom he accuses of alienating large segments of the population. De La Fuente said he will primarily promote his campaign via social media.",
      "twitterHashtag": "RockyDeLaFuente",
      "twitterID": "707644976398737409",
      "campaignWebsite": "https://www.rocky2016.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Rocky_De_La_Fuente",
      "age": "61",
      "quote": "\"We the people need to take back our democracy.\""
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "headImage": "/img/candidateHeads/supremeHead.jpg",
      "logoImage": "img/candidateLogos/supremeLogo.jpg",
      "fullName": "Vermin Supreme",
      "party": new ObjectID("000000000000000000000004"),
      "cssType": "independent",
      "description": "Vermin Love Supreme (born c. 1961) is an American performance artist and activist who has run as a candidate in various local, state, and national elections in the United States. Supreme is known for wearing a boot as a hat and carrying a large toothbrush, and has said that if elected President of the United States, he will pass a law requiring people to brush their teeth. He also campaigned in 2012 on a platform of zombie apocalypse awareness and time travel research, and promised a free pony for every American. In 2011, he participated in the Occupy Boston protests. He is the subject of the 2014 documentary, Who Is Vermin Supreme? An Outsider Odyssey, which follows his 2012 campaign and explores his life as an activist and political prankster. Supreme is making another presidential run in 2016. He has embarked on a tour of 20 cities to build support for his campaign and is seeking to qualify for matching funds from the Federal Election Commission (FEC). He filed as a candidate in the New Hampshire Democratic presidential primary on November 21, 2015, and received 259 votes in the primary on February 9, 2016, coming in fourth after Martin O'Malley. He was, however, not invited to return to the Lesser-Known Democratic Candidates Presidential Forum, due in part to glitterbombing Randall Terry at the event in 2011. Shortly before the primary, he was observed questioning Republican candidates Chris Christie and Ted Cruz through a bullhorn. On 4 March 2016, he switched his affiliation to the Libertarian Party.",
      "twitterHashtag": "VerminSupreme",
      "twitterID": "722530777112645633",
      "campaignWebsite": "http://www.verminsupreme.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Vermin_Supreme",
      "age": "55",
      "quote": "\"You've done worse and you know it.\""
    },
    "5": {
      "_id": new ObjectID("000000000000000000000005"),
      "headImage": "img/candidateHeads/sandersHead.jpg",
      "logoImage": "img/candidateLogos/sandersLogo.png",
      "fullName": "Bernie Sanders",
      "party": new ObjectID("000000000000000000000001"),
      "cssType": "democrat",
      "description": "The 2016 presidential campaign of Bernie Sanders, the junior United States Senator and former Representative from Vermont, began with a formal announcement by Sanders on May 26, 2015, in Burlington, Vermont, which followed an informal announcement on April 30. Sanders had been considered a potential candidate for President of the United States since at least September 2014. Although Sanders is an independent, he caucuses with the Democratic Party in the Senate, as many of his views align with those of Democrats, and he is running for the Democratic nomination. Sanders's chief competitor for the nomination is Hillary Clinton; Martin O'Malley was in a distant third place until he suspended his campaign on February 1, 2016. Sanders draws large crowds to his speaking events and his populist and democratic socialist politics have won him support from working‑class voters, especially those under 40. He performs strongly with white voters but has consistently trailed Clinton by 30 or more percentage points among nonwhite voters. Sanders has stated that his campaign will focus on income and wealth inequality, which he argues is eroding the American middle class, and on campaign finance reform. Unlike most other major presidential candidates, Sanders has eschewed an unlimited super PAC, instead choosing to receive most of his funding from direct individual campaign donations. On September 30, 2015, The New York Times reported that Sanders had raised $26 million over the preceding three months, close behind Hillary Clinton's $28 million, and that the campaign had received one million individual donations, becoming the first in 2015 to reach that threshold.",
      "twitterHashtag": "BernieSanders",
      "twitterID": "707645687165538305",
      "campaignWebsite": "https://berniesanders.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Bernie_Sanders",
      "age": "74",
      "quote": "\"A political revolution is coming.\""
    },
    "6": {
      "_id": new ObjectID("000000000000000000000006"),
      "headImage": "img/candidateHeads/trumpHead.jpg",
      "logoImage": "img/candidateLogos/trumpLogo.png",
      "fullName": "Donald Trump",
      "party": new ObjectID("000000000000000000000002"),
      "cssType": "republican",
      "description": "Donald John Trump (born June 14, 1946) is an American businessman, politician, television personality, and a candidate for the Republican nomination for President of the United States in the 2016 election. He is the chairman and president of The Trump Organization and the founder of Trump Entertainment Resorts, a gaming and hotel enterprise. His business activities, television work, outspoken manner, and personal life have made him an international celebrity. Trump is a native of New York City and a son of Fred Trump, who inspired him to enter real estate development. While still attending college he worked for his father's firm, Elizabeth Trump & Son. Upon graduating from college in 1968 he joined the company, and in 1971 was given control, renaming the company 'The Trump Organization.' Since then he has built casinos, golf courses, hotels, and other properties, many of which bear his name. He has received prominent media exposure, and the NBC reality show The Apprentice bolstered his fame. His three marriages were extensively covered in tabloids. He first ran for the U.S. presidency in 2000, winning two Reform Party primaries. On June 16, 2015, Trump again announced his candidacy for president, this time as a Republican. He won the New Hampshire primary with 35% of the vote, the South Carolina primary with 33%, and the Nevada caucuses with 46%. On Super Tuesday in March 2016, Trump won Alabama, Arkansas, Georgia, Massachusetts, Tennessee, Vermont, and Virginia, solidifying his status as the Republican frontrunner.",
      "twitterHashtag": "DonaldTrump",
      "twitterID": "707641186698305537",
      "campaignWebsite": "https://www.donaldjtrump.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Donald_Trump",
      "age": "69",
      "quote": "\"Make America great again.\""
    },
    "7": {
      "_id": new ObjectID("000000000000000000000007"),
      "headImage": "img/candidateHeads/kasichHead.jpg",
      "logoImage": "img/candidateLogos/kasichLogo.png",
      "fullName": "John Kasich",
      "party": new ObjectID("000000000000000000000002"),
      "cssType": "republican",
      "description": "John Richard Kasich (born May 13, 1952) is the Governor of Ohio, first elected in 2010 and re-elected in 2014. On July 21, 2015, he announced his candidacy for the 2016 Republican nomination for President of the United States. Kasich served nine terms as a member of the United States House of Representatives, representing Ohio's 12th congressional district from 1983 to 2001. His tenure in the House included 18 years on the House Armed Services Committee and six years as chairman of the House Budget Committee. He was a key figure in the passage of both welfare reform and the Balanced Budget Act of 1997. He was a commentator on Fox News Channel, hosting Heartland with John Kasich from 2001 to 2007. He also worked as an investment banker, a managing director of Lehman Brothers' Columbus, Ohio, office. In the 2010 Ohio gubernatorial election, Kasich defeated Democratic incumbent Ted Strickland. He was re-elected in 2014, defeating Democrat Ed FitzGerald by 30 percentage points.",
      "twitterHashtag": "JohnKasich",
      "twitterID": "707645940237205505",
      "campaignWebsite": "https://johnkasich.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/John_Kasich",
      "age": "63",
      "quote": "\"K for US.\""
    },
    "8": {
      "_id": new ObjectID("000000000000000000000008"),
      "headImage": "img/candidateHeads/johnsonHead.jpg",
      "logoImage": "img/candidateLogos/johnsonLogo.jpg",
      "fullName": "Gary Johnson",
      "party": new ObjectID("000000000000000000000004"),
      "cssType": "independent",
      "description": "Gary Earl Johnson (born January 1, 1953) is an American businessman and politician. He served as the 29th Governor of New Mexico from 1995 to 2003, as a member of the Republican Party, and was the Libertarian Party nominee for President of the United States in the 2012 election. He is a candidate for the Libertarian Party presidential nomination in the 2016 election. Johnson announced his candidacy for president on April 21, 2011, as a Republican, on a libertarian platform emphasizing the United States public debt and a balanced budget through a 43% reduction of all federal government spending, protection of civil liberties, an immediate end to the War in Afghanistan and his advocacy of the FairTax. On December 28, 2011, after being excluded from the majority of the Republican Party's presidential debates and failing to gain traction while campaigning for the New Hampshire primary, he withdrew his candidacy for the Republican nomination and announced that he would continue his presidential campaign as a candidate for the nomination of the Libertarian Party. He won the Libertarian Party nomination on May 5, 2012. His chosen running mate Judge James P. Gray of California won the vice-presidential nomination. The Johnson/Gray ticket received 0.99% of the popular vote, amounting to 1.27 million votes, more than all other minor candidates combined. This was the most successful result for a third party presidential candidacy since 2000. It was the best showing in the Libertarian Party's history by vote count. On January 6, 2016, Johnson announced his candidacy for the Libertarian nomination once again in 2016.",
      "twitterHashtag": "GaryJohnson",
      "twitterID": "707646196886724608",
      "campaignWebsite": "https://www.garyjohnson2016.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Gary_Johnson",
      "age": "63",
      "quote": "\"Live free.\""
    },
    "9": {
      "_id": new ObjectID("000000000000000000000009"),
      "headImage": "img/candidateHeads/steinHead.jpg",
      "logoImage": "img/candidateLogos/steinLogo.png",
      "fullName": "Jill Stein",
      "party": new ObjectID("000000000000000000000003"),
      "cssType": "independent",
      "description": "Jill Ellen Stein (born May 14, 1950) is an American physician and activist who was the nominee of the Green Party for President of the United States in the 2012 election. Stein was a candidate for Governor of Massachusetts in 2002 and 2010. Stein is a resident of Lexington, Massachusetts. She is a graduate of Harvard College (1973) and Harvard Medical School (1979). After receiving 456,169 votes in the 2012 election -- more than any other female general election candidate -- Stein announced the formation of an exploratory committee in February 2015 to seek the Green Party's 2016 presidential nomination. On June 22, 2015, during an appearance on Democracy Now!, Stein formally announced she would seek the Green Party's 2016 presidential nomination.",
      "twitterHashtag": "JillStein",
      "twitterID": "707646529834762240",
      "campaignWebsite": "http://www.jill2016.com/",
      "wikipedia": "https://en.wikipedia.org/wiki/Jill_Stein",
      "age": "65",
      "quote": "\"It's in our hands.\""
    }
  },

  "parties": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "name": "Democratic Party",
      "color": "#6194BC",
      "logo": "img/partyLogos/democraticParty.png"
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Republican Party",
      "color": "#FF4E4D",
      "logo": "img/partyLogos/republicanParty.png"
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "name": "Green Party",
      "color": "#805889",
      "logo": "img/partyLogos/gp.png"
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "name": "Libertarian Party",
      "color": "#805889",
      "logo": "img/partyLogos/lib.png"
    }
  },

  "events": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "date": "27. February 2016",
      "name": "South Carolina Primary",
      "location": "South Carolina",
      "summary": "Hillary Clinton won over Bernie Sanders with 73.5% of the votes.",
      "party": "Democrat",
      "associatedCandidates": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000005")],
      "emailSent": false,
      "unixTime": 1456531200
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "date": "20. February 2016",
      "name": "South Carolina Primary",
      "location": "South Carolina",
      "summary": "Trump won over the other candidates with 32.5% of the votes.",
      "party": "Republican",
      "associatedCandidates": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007")],
      "emailSent": false,
      "unixTime": 1455926400
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "date": "13. February 2016",
      "name": "Ninth Republican Debate",
      "location": "South Carolina",
      "summary": "Aenean tempor faucibus mauris, nec porttitor nulla tincidunt at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas at libero quis libero accumsan interdum. Quisque nec ultrices eros, sed consequat nisl. Mauris efficitur velit id iaculis elementum. Integer condimentum, erat id rhoncus rutrum, erat quam pretium est, eu gravida urna dolor et erat. Pellentesque vulputate tortor quis magna faucibus, interdum hendrerit odio lobortis. Ut lacus nibh, auctor ac nulla a, auctor maximus tortor. Vivamus laoreet congue accumsan. Vivamus nec congue leo. Quisque id sollicitudin justo. Curabitur fringilla risus eget erat dignissim semper. Sed ipsum purus, sagittis vitae sapien non, lacinia pulvinar turpis. Ut aliquet dui libero, aliquam dignissim dolor dignissim at.",
      "party": "Republican",
      "associatedCandidates": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007")],
      "emailSent": false,
      "unixTime": 1455321600
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "date": "6. February 2016",
      "name": "Eighth Republican Debate",
      "location": "New Hampshire",
      "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu commodo arcu, id volutpat diam. Suspendisse accumsan et ligula sed hendrerit. In volutpat ligula ut laoreet vulputate. Mauris a magna nec nisi scelerisque porta. Cras tellus lectus, bibendum eget enim id, consequat venenatis elit. Sed rutrum fermentum porttitor.",
      "party": "Republican",
      "associatedCandidates": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007")],
      "emailSent": false,
      "unixTime": 1454716800
    },
    "5": {
      "_id": new ObjectID("000000000000000000000005"),
      "date": "4. February 2016",
      "name": "Fifth Democratic Debate",
      "location": "New Hampshire",
      "summary": "Sed eu ligula eu enim rhoncus hendrerit eget nec dolor. Nunc imperdiet interdum dolor eu fringilla. Quisque luctus fermentum velit bibendum aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fusce et dolor id tellus porttitor pretium ac non dolor. Fusce porta feugiat tellus, ut convallis ante varius a.",
      "party": "Democrat",
      "associatedCandidates": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000005")],
      "emailSent": false,
      "unixTime": 1454544000
    },
    "6": {
      "_id": new ObjectID("000000000000000000000006"),
      "date": "1. February 2016",
      "name": "Iowa Caucus",
      "location": "Iowa",
      "summary": " Iowa Democratic Caucus is won by Hillary Clinton. Iowa Republican Caucus is won by Ted Cruz. Martin O'Malley drops out of the Democratic race. Mike Huckabee drops out of the Republican race.",
      "party": "",
      "associatedCandidates": [],
      "emailSent": false,
      "unixTime": 1454284800
    },
    "7": {
      "_id": new ObjectID("000000000000000000000007"),
      "date": "19. April 2016",
      "name": "New York Primary",
      "location": "New York",
      "summary": "",
      "party": "",
      "associatedCandidates": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007")],
      "emailSent": false,
      "unixTime": 1461024000

    },
    "8": {
      "_id": new ObjectID("000000000000000000000008"),
      "date": "3. May 2016",
      "name": "Indiana Primary",
      "location": "Indiana",
      "summary": "",
      "party": "",
      "associatedCandidates": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006"),new ObjectID("000000000000000000000007")],
      "emailSent": false,
      "unixTime": 1462248000

    }
  },

  "users":{
    "1":{
      "_id":new ObjectID("000000000000000000000001"),
      "email":"richards@umass.edu",
      "password":"Timmy1234",
      "fullName":"Tim Richards",
      "gender":"male",
      "race":"White",
      "hispanic": false,
      "registered": false,
      "age":"25-34",
      "politicalAffiliation":new ObjectID("000000000000000000000002"),
      "location":"Amherst, MA",
      "vote": new ObjectID("000000000000000000000001"),

      "emailSettings": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000006")]
    },
    "2":{
      "_id":new ObjectID("000000000000000000000002"),
      "email":"generic2@email.com",
      "password":"genericPass",
      "fullName":"Generic Name",
      "gender":"male",
      "race":"African American/Black",
      "hispanic": true,
      "registered": true,
      "age":"65+",
      "politicalAffiliation":new ObjectID("000000000000000000000001"),
      "location":"Amherst, MA",
      "vote":new ObjectID("000000000000000000000006"),

      "emailSettings": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000006")]
    },
    "3":{
      "_id":new ObjectID("000000000000000000000003"),
      "email":"generic3@email.com",
      "password":"genericPass",
      "fullName":"Generic Name",
      "gender":"female",
      "race":"Asian American",
      "hispanic": false,
      "registered": false,
      "age":"45-54",
      "politicalAffiliation":new ObjectID("000000000000000000000002"),
      "location":"Amherst, MA",
      "vote":new ObjectID("000000000000000000000004"),

      "emailSettings": [new ObjectID("000000000000000000000008"),new ObjectID("000000000000000000000009")]
    },
    "4":{
      "_id":new ObjectID("000000000000000000000004"),
      "email":"generic4@email.com",
      "password":"genericPass",
      "fullName":"Generic Name",
      "gender":"other",
      "race":"Pacific Islander",
      "hispanic": false,
      "registered": true,
      "age":"18-24",
      "politicalAffiliation":new ObjectID("000000000000000000000001"),
      "location":"Amherst, MA",
      "vote":new ObjectID("000000000000000000000003"),

      "emailSettings": [new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000002")]
    },
    "5":{
      "_id":new ObjectID("000000000000000000000005"),
      "email":"generic5@email.com",
      "password":"genericPass",
      "fullName":"Generic Name",
      "gender":"male",
      "race":"Native American/Alaskan",
      "hispanic": true,
      "registered": true,
      "age":"Under 18",
      "politicalAffiliation":new ObjectID("000000000000000000000001"),
      "location":"Amherst, MA",
      "vote":new ObjectID("000000000000000000000001"),

      "emailSettings": [new ObjectID("000000000000000000000001")]
    }
  },

  "weeklyState": {
    "1":{
      "_id": new ObjectID("000000000000000000000001"),
      "startDate": "March 13, 2016",
      "ballotBox": [
        {
          "user": new ObjectID("000000000000000000000004"),
          "candidate": new ObjectID("000000000000000000000001")
        },
        {
          "user": new ObjectID("000000000000000000000005"),
          "candidate": new ObjectID("000000000000000000000002")
        },
        {
          "user": new ObjectID("000000000000000000000001"),
          "candidate": new ObjectID("000000000000000000000003")
        }
      ]

    },
    "2":{
      "_id": new ObjectID("000000000000000000000002"),
      "startDate": "March 6, 2016",
      "ballotBox": [
        {
          "user": new ObjectID("000000000000000000000004"),
          "candidate": new ObjectID("000000000000000000000001")
        },
        {
          "user": new ObjectID("000000000000000000000005"),
          "candidate": new ObjectID("000000000000000000000004")
        },
        {
          "user": new ObjectID("000000000000000000000001"),
          "candidate": new ObjectID("000000000000000000000003")
        }
      ]

    },
    "3":{
      "_id": new ObjectID("000000000000000000000003"),
      "startDate": "February 28, 2016",
      "ballotBox": [
        {
          "user": new ObjectID("000000000000000000000004"),
          "candidate": new ObjectID("000000000000000000000003")
        },
        {
          "user": new ObjectID("000000000000000000000005"),
          "candidate": new ObjectID("000000000000000000000009")
        },
        {
          "user": new ObjectID("000000000000000000000001"),
          "candidate": new ObjectID("000000000000000000000008")
        }
      ]

    },
    "4":{
      "_id": new ObjectID("000000000000000000000004"),
      "startDate": "February 21, 2016",
      "ballotBox": [
        {
          "user": new ObjectID("000000000000000000000004"),
          "candidate": new ObjectID("000000000000000000000007")
        },
        {
          "user": new ObjectID("000000000000000000000005"),
          "candidate": new ObjectID("000000000000000000000001")
        },
        {
          "user": new ObjectID("000000000000000000000001"),
          "candidate": new ObjectID("000000000000000000000005")
        }
      ]

    }
  },

  "chatBox":{
    "1":{
      "active": true,
      "_id":new ObjectID("000000000000000000000001"),
      "fullName":"Clinton Debate",
      "messages": [
        {
          "author": new ObjectID("000000000000000000000001"),
          "contents": "Debate Hillary Here"
        },
        {
          "author": new ObjectID("000000000000000000000001"),
          "contents": "Test second message"
        }
      ],
      "time": 1453668480000
    },

    "2":{
      "active": true,
      "_id":new ObjectID("000000000000000000000002"),
      "fullName":"Sanders Debate",
      "messages": [
        {
          "author": new ObjectID("000000000000000000000001"),
          "contents": "Debate Bernie Here"
        },
        {
          "author": new ObjectID("000000000000000000000001"),
          "contents": "Test second message"
        }
      ],
      "time": 1453408480000
    },

    "3":{
      "active": true,
      "_id":new ObjectID("000000000000000000000003"),
      "fullName":"Trump Debate",
      "messages": [
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Debate Trump Here"
        },
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Test second message"
        }
      ],
      "time": 1453408480000
    },

    "4":{
      "active": true,
      "_id":new ObjectID("000000000000000000000004"),
      "fullName":"Kasich Debate",
      "messages": [
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Debate Kasich Here"
        },
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Test second message"
        }
      ],
      "time": 1453408480000
    },

    "5":{
      "active": true,
      "_id":new ObjectID("000000000000000000000005"),
      "fullName":"Rubio Debate",
      "messages": [
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Debate Rubio Here"
        },
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Test second message"
        }
      ],
      "time": 1453408480000
    },

    "6":{
      "active": true,
      "_id":new ObjectID("000000000000000000000006"),
      "fullName":"Stein Debate",
      "messages": [
        {
          "author": new ObjectID("000000000000000000000003"),
          "contents": "Debate Stein Here"
        },
        {
          "author": new ObjectID("000000000000000000000003"),
          "contents": "Test second message"
        }
      ],
      "time": 1453408480000
    }

  }

};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
