const haikuFinder = require("./haikuFinder.js");
const twitterData = require("./tweets.json");
const dataParser = require("./dataParser.js");

var tweetArray = dataParser.parseData(twitterData);
haikuFinder.findHaiku(tweetArray);
