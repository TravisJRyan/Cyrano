const request = require("request");
const syllable = require("syllable");

module.exports.findHaiku = function (phrases) {
    shuffleArray(phrases);
    var fiveSyllablePhrases = [];
    var sevenSyllablePhrases = [];
    for(var i = 0; i < phrases.length; i++){
        currentPhraseSyllable = syllable(phrases[i]);
        if(currentPhraseSyllable==5)
            fiveSyllablePhrases.push(phrases[i])
        if(currentPhraseSyllable==7)
            sevenSyllablePhrases.push(phrases[i])
    }
    printHaiku(fiveSyllablePhrases, sevenSyllablePhrases);
}

module.exports.findAllHaikus = function(phrases) {
    shuffleArray(phrases);
    var fiveSyllablePhrases = [];
    var sevenSyllablePhrases = [];
    for(var i = 0; i < phrases.length; i++){
        currentPhraseSyllable = syllable(phrases[i]);
        if(currentPhraseSyllable==5)
            fiveSyllablePhrases.push(phrases[i])
        if(currentPhraseSyllable==7)
            sevenSyllablePhrases.push(phrases[i])
    }
    completeHaikus = [];
    var fiveSyllablePhraseIndex = 0;
    for(var i = 0; i < sevenSyllablePhrases.length; i++){
        if(fiveSyllablePhrases[fiveSyllablePhraseIndex] != undefined 
            && fiveSyllablePhrases[fiveSyllablePhraseIndex+1] != undefined){
                var haikuToPush =
                    fiveSyllablePhrases[fiveSyllablePhraseIndex]+"\n"+
                    sevenSyllablePhrases[i]+"\n"+
                    fiveSyllablePhrases[fiveSyllablePhraseIndex+1];
                completeHaikus.push(haikuToPush);
            }
        fiveSyllablePhraseIndex+=2;
    }
    return completeHaikus;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function printHaiku(fiveSyllablePhrases, sevenSyllablePhrases) {
    console.log("\n\n\n");
    console.log(fiveSyllablePhrases[0]);
    console.log(sevenSyllablePhrases[0]);
    console.log(fiveSyllablePhrases[1]);
    console.log("\n\n\n");
}

// turns a string into a space-delimeted string array with only alphabetic characters
function splitText(phrases) {
    for (var i = 0; i < phrases.length; i++) {
        phrases[i].replace(/[^a-zA-Z]/gi, '')
        phrases[i] = phrases[i].split(" ");
    }
    return phrases;
}