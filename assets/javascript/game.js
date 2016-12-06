var arrOfWords = ["cat", "duck", "horse", "tiger", "lion", "rabbit"];
var tries = 10;
var wins = 0;
var losses = 0;
var lettersTried = [];


function placeHolder(string) {
	var arr = [];
	for(i = 0; i < string.length; i++){
		arr.push("_");
	}
	return arr
}

//Remember, arr is modified and Stays that way
function replace(arr, string, key) {
	var pos = 0;

	 while (string.indexOf(key, pos) !== -1) {
	 	arr[string.indexOf(key, pos)] = key;
	 	pos++;
	 }
	//Below is the old code that couldn't account for duplicate letters
	//if (string.indexOf(key) !== -1) {
		//arr[string.indexOf(key)] = key;
		//return arr
	//}
	return arr
}

//Let's check to see if we've already used a key
function usedKey(lettersTried, key) {
	lettersTried.join("");
	if (lettersTried.indexOf(key) !== -1) {
		return false
	} else {
		return true
	}
}

function youLost() {
	alert("You lost");
	losses++;
	tries = 10;
	guess = arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
	array = [];
	array = placeHolder(guess);
	lettersTried = [];
	triesDiv.innerHTML = tries;
	keysDiv.innerHTML = "";
	answerDiv.innerHTML = placeHolder(guess).join(" ");
	lossesDiv.innerHTML = "Losses: " + losses;
}

function youWon() {
	alert("You won! The word was " + guess);
	wins++;
	tries = 10;
	guess = arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
	array = [];
	array = placeHolder(guess);
	lettersTried = [];
	triesDiv.innerHTML = tries;
	keysDiv.innerHTML = "";
	answerDiv.innerHTML = placeHolder(guess).join(" ");
	winsDiv.innerHTML = "Wins: " + wins;
}

function checkWinStatus(arr) {
	return arr.join("").indexOf("_");
}


//Choose a random word from arrOfWords 
var guess = arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
console.log("The var guess = " + guess);

//This is where our guesses will show up
var answerDiv = document.getElementById("answer");

//This is where our tries remaining will show up
var triesDiv = document.getElementById("guesses-left");

//This is where our used keys will show up
var keysDiv = document.getElementById("keys-used");

//This is where our losses will show up
var lossesDiv = document.getElementById("losses");

//This is where our wins will show up
var winsDiv = document.getElementById("wins");

//Place the placeholder for the random word from the arrOfWords array
answerDiv.innerHTML = placeHolder(guess).join(" ");

//Place the default number of tries in the HTML
triesDiv.innerHTML = tries;

//Save our placeHolder array for later
var array = placeHolder(guess);
console.log("The var array = " + array);


document.onkeyup = function(event) {

	keystroke = event.key.toLowerCase();

	//toReplace is replaced with the modifed array from replace();
	if (guess.indexOf(keystroke) !== -1 && usedKey(lettersTried, keystroke)) {
		var toReplace = replace(array, guess, keystroke);
		answerDiv.innerHTML = toReplace.join(" ");
		lettersTried.push(keystroke);
		keysDiv.innerHTML = lettersTried.join(" ");
	} else if (usedKey(lettersTried, keystroke) === false) {
		alert("You've already used that key!");
	} else {
		alert("That's not the right letter!");
		tries--;
		triesDiv.innerHTML = tries;
		lettersTried.push(keystroke);
		keysDiv.innerHTML = lettersTried.join(" ");
	}

	if (tries === 0) {
		youLost();
	}

	if (checkWinStatus(array) === -1) {
		youWon();
	}


};





