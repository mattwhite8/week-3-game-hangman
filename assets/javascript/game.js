//game object
var hangman = {
	arrOfWords: ["space", "monolith", "earth", "odyssey", "ship", "computer"],
	tries: 10,
	wins: 0,
	losses: 0,
	placeHolder: function(string) {
		var arr = [];
		for(i = 0; i < string.length; i++){
			arr.push("_");
		}
		return arr;
	},
	replace: function(arr, string, key) {
		var pos = 0;
		while (string.indexOf(key, pos) !== -1) {
			arr[string.indexOf(key, pos)] = key;
			pos++;
			console.log("replace loop " + pos);
		}
		return arr;
	},
	usedKey: function(arr, key) {
		arr.join("");
		if (arr.indexOf(key) !== -1) {
			return false;
		} else {
			return true;
		}
	},
	clearOut: function() {
		this.tries = 10;
		guess = this.arrOfWords[Math.floor(Math.random() * this.arrOfWords.length)];
		array = [];
		array = this.placeHolder(guess);
		lettersTried = [];
		triesDiv.innerHTML = this.tries;
		messageDiv.innerHTML = "";
		answerDiv.innerHTML = this.placeHolder(guess).join(" ");
	},
	youLost: function() {
		messageDiv.innerHTML = "You lost! The word was " + guess;
		this.losses++;
		lossesDiv.innerHTML = "Losses: " + this.losses;
	},
	youWon: function() {
		messageDiv.innerHTML = "You won! The word was " + guess;
		this.wins++;
		winsDiv.innerHTML = "Wins: " + this.wins;
	},
	checkWinStatus: function(arr) {
		return arr.join("").indexOf("_");
	},
	lostAudio: function() {
		const lost = document.getElementById("loseAudio");
		lost.play();
	},
	wonAudio: function() {
		const won = document.getElementById("winAudio");
		won.play();
	},
	wrongKey: function() {
		const wrong = document.getElementById("wrongKey");
		wrong.currentTime = 0;
		wrong.play();
	},
	removeClass: function() {
		const keys = document.querySelectorAll(".box");
		keys.forEach(key => key.classList.remove("box-selected"));
	}
};

var lettersTried = [];

//Choose a random word from arrOfWords 
var guess = hangman.arrOfWords[Math.floor(Math.random() * hangman.arrOfWords.length)];
console.log("The var guess = " + guess);

//This is where our guesses will show up
var answerDiv = document.getElementById("answer");

//This is where our tries remaining will show up
var triesDiv = document.getElementById("guesses-left");

//This is where our used keys will show up
var messageDiv = document.getElementById("message");

//This is where our losses will show up
var lossesDiv = document.getElementById("losses");

//This is where our wins will show up
var winsDiv = document.getElementById("wins");

//Place the placeholder for the random word from the arrOfWords array
answerDiv.innerHTML = hangman.placeHolder(guess).join(" ");

//Place the default number of tries in the HTML
triesDiv.innerHTML = hangman.tries;

//Save our placeHolder array for later
var array = hangman.placeHolder(guess);
console.log("The var array = " + array);

//Below we're making the for loop and array used to create the key boxes
var letterOptions = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

for (var i = 0; i < letterOptions.length; i++) {

	var letterBox = document.createElement("div");

	letterBox.setAttribute("class", "box");

	letterBox.setAttribute("data-letter", letterOptions[i]);

	letterBox.innerHTML = ("<p>" + letterOptions[i] + "</p>");

	document.getElementById("keys").appendChild(letterBox);
}

// $(".box").on("click",function(){
// 	console.log(this.attr("data-letter"));
// });


window.addEventListener("keyup", function(event) {

	const key = document.querySelector(`div[data-letter="${event.key}"]`);
	key.classList.add("box-selected");

	if(event.keyCode <= 64 || event.keyCode >= 91) {
		hangman.wrongKey();
		return;
	}

	var keystroke = event.key;

	//toReplace is replaced with the modifed array from replace();
	if (guess.indexOf(keystroke) !== -1 && hangman.usedKey(lettersTried, keystroke)) {
		var toReplace = hangman.replace(array, guess, keystroke);
		answerDiv.innerHTML = toReplace.join(" ");
		lettersTried.push(keystroke);
		messageDiv.innerHTML = "Good guess!";
	} else if (hangman.usedKey(lettersTried, keystroke) === false) {
		messageDiv.innerHTML = "You've already used that key!";
	} else {
		hangman.tries--;
		messageDiv.innerHTML = "That's not the right key!";
		triesDiv.innerHTML = hangman.tries;
		lettersTried.push(keystroke);
	}

	if (hangman.tries === 0) {
		hangman.lostAudio();
		hangman.youLost();
		setTimeout(hangman.clearOut.bind(hangman), 3000);
		setTimeout(hangman.removeClass.bind(hangman), 3000);
	}

	if (hangman.checkWinStatus(array) === -1) {
		hangman.wonAudio();
		hangman.youWon();
		setTimeout(hangman.clearOut.bind(hangman), 3000);
		setTimeout(hangman.removeClass.bind(hangman), 3000);
	}


});





