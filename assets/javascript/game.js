var arrOfWords = ["cat", "horse", "rabbit"];


function placeHolder(string) {
	var arr = [];
	for(i = 0; i < string.length; i++){
		arr.push("_");
	}
	return arr
}

function replace(arr, string, key) {
	if (string.indexOf(key) !== -1) {
		arr[string.indexOf(key)] = key;
		console.log(arr);
	}
}


//This is where our guesses will show up
var answerDiv = document.getElementById("answer");

//Place the placeholder for a random word from the arrOfWords array
answerDiv.innerHTML = placeHolder(arrOfWords[Math.floor(Math.random() * arrOfWords.length)]).join(" ");


document.onkeyup = function(event) {

	keystroke = event.key;


};