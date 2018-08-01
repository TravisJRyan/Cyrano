const request = require("request");

function main(){
    const phrases = ["hello i am a sentence. There are many words in this sentence.", "seven syllables right here", "this is a phrase", "cat", "hello hello hello", "five syllables here", "seven syllables here dawg", "five more syllables"];
    shuffleArray(phrases);
    var fiveSyllablePhrases = [];
    var sevenSyllablePhrases = [];
    var phrasesRemaining = phrases.length;
    for(var i = 0; i < phrases.length; i++){
        getTotalSyllablesForArrayOfWords(phrases[i], function(phrase, totalSyllables){
            phrasesRemaining--;
            if(totalSyllables==5)
                fiveSyllablePhrases.push(phrase);
            else if(totalSyllables==7)
                sevenSyllablePhrases.push(phrase);
            if(phrasesRemaining<=0){
                printHaiku(fiveSyllablePhrases, sevenSyllablePhrases);
            }
        });
    }
}

main();

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function printHaiku(fiveSyllablePhrases, sevenSyllablePhrases){
    console.log("\n\n\n");
    console.log(fiveSyllablePhrases[0]);
    console.log(sevenSyllablePhrases[0]);
    console.log(fiveSyllablePhrases[1]);
    console.log("\n\n\n");
}

// turns a string into a space-delimeted string array with only alphabetic characters
function splitText(phrases){
    for(var i = 0; i < phrases.length; i++){
        phrases[i].replace(/[^a-zA-Z]/gi, '')
        phrases[i] = phrases[i].split(" ");
    }
    return phrases;
}

function getTotalSyllablesForArrayOfWords(phrase, callback) {
    var words = phrase.split(" ");
    for (var i = 0; i < words.length; i++) {
        var totalSyllables = 0;
        var requestsRemaining = words.length;
        request('https://api.datamuse.com/words?sp=' + words[i].toLowerCase() + '&md=s', function (error, response, body) {
            if (error)
                console.log('Error:', error);
            else {
                totalSyllables+=JSON.parse(body)[0]["numSyllables"];
                --requestsRemaining;
                if (requestsRemaining <= 0) {
                    callback(phrase, totalSyllables);
                }
            }
        });
    }
}