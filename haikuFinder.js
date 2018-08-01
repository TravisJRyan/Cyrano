const rp = require("request-promise");
const request = require("request");
const q = require("q");

var phrases = ["hello i am a phrase", "this is a phrase", "cat", "hello hello hello"];
var words = ["cat", "balloon", "gubernatorial", "hello", "yes", "syllables", "dictatorship"];

function main(){
    var originalPhrases = phrases;
    var splitSentences = splitText(phrases);
    console.log(splitSentences);
    for(var i = 0; i < originalPhrases.length; i++){
        console.log("SENTENCE: "+originalPhrases[i]);
    }
}

main();

function splitText(phrases){
    for(var i = 0; i < phrases.length; i++){
        phrases[i].replace(/[^a-zA-Z]/gi, '')
        phrases[i] = phrases[i].split(" ");
    }
    return phrases;
}

function performRequests(words) {
    for (var i = 0; i < words.length; i++) {
        var returnedData = [];
        var requestsRemaining = words.length;
        request('https://api.datamuse.com/words?sp=' + words[i] + '&md=s', function (error, response, body) {
            if (error)
                console.log('Error:', error);
            else {
                returnedData.push(body);
                --requestsRemaining;
                if (requestsRemaining <= 0) {
                    var simpleResults = simplifyResults(returnedData);
                    printSyllables(simpleResults);
                }
            }
        });
    }
}

function simplifyResults(data) {
    var simpleResults = [];
    for (var i = 0; i < data.length; i++) {
        simpleResults.push({ "word": JSON.parse(data[i])[0]["word"], "numSyllables": JSON.parse(data[i])[0]["numSyllables"] });
    }
    simpleResults.sort(function (a, b) {
        return a.numSyllables > b.numSyllables;
    });
    return simpleResults;
}

function printSyllables(data) {
    for (i = 0; i < data.length; i++) {
        console.log(data[i]["word"] + ", " + data[i]["numSyllables"]);
    }
}