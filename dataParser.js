module.exports.parseData = function(scrapedData){
    var tweets = [];
    for(var i = 0; i < scrapedData.length; i++){ //push entire tweet to scraped data
        var rawTweetText = scrapedData[i]["text"];
        var strippedTweet = stripTweet(rawTweetText);
        tweets.push(strippedTweet);
        var splitTweet = strippedTweet.split(".");
        if(splitTweet.length > 1){ // Push period separated phrases
            for(var j = 0; j < splitTweet.length; j++){
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
    tweetBeingStripped.replace(/[0-9]\./gi, '');
    tweetBeingStripped.replace(/#[a-zA-Z0-9]+/gi, '');
    tweetBeingStripped.replace(/\\n/gi, '');
    console.log(rawTweetText+"\n\n "+tweetBeingStripped);
    return tweetBeingStripped;
}