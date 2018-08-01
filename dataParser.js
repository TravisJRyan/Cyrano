module.exports.parseData = function(scrapedData){
    var tweets = [];
    for(var i = 0; i < scrapedData.length; i++){ //push entire tweet to scraped data
        var rawTweetText = scrapedData[i]["text"];
        var strippedTweet = stripTweet(rawTweetText);
        tweets.push(strippedTweet);
        var splitTweet = strippedTweet.split(".");
        if(splitTweet.length > 1){ // Push period separated phrases
            for(var j = 0; j < splitTweet.length; j++){
                if(splitTweet[j].substr(0,1)==" ")
                    tweets.push(splitTweet[j].substr(1));
                else
                    tweets.push(splitTweet[j]);
            }
        }
    }
    for(var i = 0; i < tweets.length; i++){
        tweets[i].replace(/\\n/gi, '');
    }
    return tweets;
}

function stripTweet(rawTweetText){
    var tweetBeingStripped = rawTweetText;
    tweetBeingStripped = tweetBeingStripped.replace(/[0-9]\./gi, '');
    tweetBeingStripped = tweetBeingStripped.replace(/#[a-zA-Z0-9]+/gi, '');
    tweetBeingStripped = tweetBeingStripped.replace(/\\n/gi, '');
    tweetBeingStripped = tweetBeingStripped.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, '');
    return tweetBeingStripped;
}