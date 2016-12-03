var arrOfWords = ["cat", "duck", "horse"];


function placeHolder(string) {
	var arr = [];
	for(i = 0; i < string.length; i++){
		arr.push("_");
	}
	return arr
}

//Remember, arr is modified and Stays that way
function replace(arr, string, key) {
	if (string.indexOf(key) !== -1) {
		arr[string.indexOf(key)] = key;
		return arr
	}
}

//Choose a random word from arrOfWords 
var guess = arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
console.log("The var guess = " + guess);

//This is where our guesses will show up
var answerDiv = document.getElementById("answer");

//Place the placeholder for the random word from the arrOfWords array
answerDiv.innerHTML = placeHolder(guess).join(" ");

//Save our placeHolder array for later
var array = placeHolder(guess);
console.log("The var array = " + array);


document.onkeyup = function(event) {

	keystroke = event.key;

	//toReplace is replaced with the modifed array from replace();
	if (guess.indexOf(keystroke) !== -1) {
		var toReplace = replace(array, guess, keystroke);
		answerDiv.innerHTML = toReplace.join(" ");
	} else {
		alert("That's not the right letter!");
	}

};





