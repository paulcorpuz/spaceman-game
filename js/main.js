/*----- constants -----*/
const secretWords = ['pikachu','eevee'];
const maxGuessCount = 5;


/*----- state variables -----*/
let activeWord;
let correctLetters;
let wrongGuessCount;
let clickCountDown;
let lettersRemaining;
let winner;


/*----- cached elements  -----*/
const messageBoxElement = document.querySelector('.playing');
const availableGuessElement = document.querySelector('.guess');
const keyboardButtonElements = document.querySelector('.keyboard');
const playAgainButton = document.getElementById('gameOver');
const topResetButton = document.getElementById('resetti');



/*----- event listeners -----*/
keyboardButtonElements.addEventListener('click', handleLetterClick);
playAgainButton.addEventListener('click', resetGame);
topResetButton.addEventListener('click', resetGame1);



/*----- functions -----*/

// Game initialization -- can change function name  
function init() {
    //select a random secret word from the array
    activeWord = getRandomWord(secretWords);

    let {answerArray} = createAnswerArray(activeWord);
    correctLetters = answerArray;
    wrongGuessCount = 0;
    clickCountDown = maxGuessCount;
    winner = null;
    render();
}


// Select a random secret word 
function getRandomWord(secretWords) {
    return secretWords[Math.floor(Math.random() * secretWords.length)];
}


// Create an array with underscores to represent the secret word length and keep track of letters remaining
function createAnswerArray(selectedSecret) {
    let answerArray = [];
    for (let i = 0; i < selectedSecret.length; i++) {
        answerArray[i] = "_";
    }
    lettersRemaining = selectedSecret.length;
    return { answerArray, lettersRemaining };
}


// Render the game state -- update the elements to show the following
function render() {
    messageBoxElement.textContent = correctLetters.join(" ");
    availableGuessElement.textContent = `Available Guesses: ${maxGuessCount - wrongGuessCount} out of ${maxGuessCount}`;
    checkWinner();
    renderGameOverMessage();
    renderPlayAgain();
}


// Handle keyboard / letter click 
// DOM matches method https://developer.mozilla.org/en-US/docs/Web/API/Element/matches

function handleLetterClick(buttonPress) {
    if (buttonPress.target.matches('button.alphabet')) {
        clickCountDown--; //decrease clickCountDown by 1 per button click
        const letter = buttonPress.target.textContent.toLowerCase();
        if (activeWord.includes(letter)) {
            for (let i = 0; i < activeWord.length; i++) {
                if (activeWord[i] === letter && correctLetters[i] === '_') {
                    correctLetters[i] = letter;
                    lettersRemaining--;
                }
            }
        } else {
            wrongGuessCount++; //increase wrongGuessCount by 1 per button click
        }
        console.log('Letters Remaining: ' + lettersRemaining) // check
        console.log('Click Count: ' + clickCountDown) // check
        console.log('Wrong Guess Count: ' + wrongGuessCount) // check
        render();
    }
}









// Check win conditions -- winner true or false
function checkWinner() {
    if (lettersRemaining === 0 && wrongGuessCount >= 0) { //not triggering winning statement 
        winner = true;

    } else {
        winner = false;
    }
}

// Render game over message
function renderGameOverMessage() {
    if (winner === true) {
        messageBoxElement.innerText = 'SHANTAY YOU STAY';
    } else if (wrongGuessCount >= maxGuessCount) {
        messageBoxElement.innerText = 'SASHAY AWAY';
    }
}

// Render play again button, ternary expression from connect 4 lesson
function renderPlayAgain() {
    playAgainButton.style.visibility = winner || wrongGuessCount >= maxGuessCount ? 'visible' : 'hidden';
}

// play again after win condition rendered -- reset Game
function resetGame() {
    init();
}

// top reset game button
function resetGame1() {
    init();
}



// Initialize the game
init();











/* Notes 

original pseudocode

While the secret word has not been guessed {
    Show the player their current progress
    event listener? Get a guess from the player

If the guessed letter  is in the word {
        Update the player's progress
        update secretWord display
        player continues 

limit the # of guesses 

 If the guessedletter is not in the secretWord {
    lower guess count by -1
    remove letter from available choices  --> eventlistener click?


Congratulate the player on guessing the secret word if complete
player lost if available guesses === 0 
    show correct word to the player if player loses

Play again if winner is declared or lost is declared
add left over availables guess to score


/* icebox idea(s) 
1. per the game list  = A good icebox feature (optional feature) is to allow the player to choose from categories of words.
2. maybe have a reset button at the top of the right corner
    If the player wants to reset game {
    treat like playAgainBtn





==========================
Game plan for functions

Initialize the game, 
Init()
select random secret word, initialize the correct letters with underscores, set initial guess count to remaining letters

Create random word selection 
getRandomWord()
Select a random word from the secretWords array

Create array creation, 
createAnswerArray()
create an array filled with underscores to represent the secret word
Keep track of remaining letters

Rendering - function
Render()
updates display to reflect the current state of the game:
	• secret word, 
	• remaining guess count, 
	• the keyboard

Rendering the keyboard: 
Renderkeyboard()
generates buttons for each letter of the alphabet


Handling letter/button clicks:
handleLetterClick()
	• This function handles clicks on the keyboard buttons. 
	• updates the correct letters array if the guessed letter is correct 
	• updates the remaining letters count accordingly. 
	• It also checks for a win condition after each guess.

-------- Win condition: Checking for a Win/loss
Render game over message
renderGameOverMessage()
Check if the player has guessed all the letters in the secret word
Display message if player has won or lost

Rendering the Play Again Button 
renderPlayAgain()
This function toggles the visibility of the play again button based on whether the game is over.


*/