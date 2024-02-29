/*----- constants -----*/
// grid row 1
// grid row 2 amd 3
const secretWords = [
    'pikachu',
    'eevee',
    'togepi',

];
// grid row 4
const maxGuessCount = 5;


/*----- state variables -----*/
// grid row 1
let score = 0;
// grid row 2 and 3
let activeWord;
let correctLetters;
let lettersRemaining;
//grid row 4
let wrongGuessCount;
let clickCountDown;
let winner;


/*----- cached elements  -----*/
// grid row 1
const titleElement = document.querySelector('.title');
const topResetButton = document.getElementById('resetti');
const highScore = document.getElementById('score');
// grid row 2 and 3
const spaceImage = document.getElementById('image1');
const messageBoxElement = document.querySelector('.playing');
const keyboardButtonElements = document.querySelector('.keyboard');
// grid row 4
const availableGuessElement = document.querySelector('.guess');
const footerElement = document.querySelector('.footer');
const playAgainButton = document.getElementById('gameOver');


/*----- event listeners -----*/
// grid row 1
topResetButton.addEventListener('click', resetGame);
// grid row 2 and 3
keyboardButtonElements.addEventListener('click', handleLetterClick);
// grid row 4
playAgainButton.addEventListener('click', resetGame);


/*----- functions -----*/ 
// fnc Game initialization
function init() {
    activeWord = getRandomWord(secretWords);     //select a random secret word from the array
    let {answerArray} = createAnswerArray(activeWord);  //create the array with underscores
    correctLetters = answerArray;
    wrongGuessCount = 0; // starting wrong guesses - icebox adding difficulty?
    clickCountDown = maxGuessCount;
    winner = false;
    spaceImage.src = "img/spaceMan1.png",
    render();
}


// fnc Select a random secret word from the secretWords array
function getRandomWord(secretWords) {
    return secretWords[Math.floor(Math.random() * secretWords.length)];
}


// fnc Create an array with underscores to represent the secret word length and keep track of letters remaining. spaces are made in rendor
function createAnswerArray(selectedSecret) {
    let answerArray = [];
    for (let i = 0; i < selectedSecret.length; i++) {
        answerArray[i] = "_";
    }
    lettersRemaining = selectedSecret.length;
    return { answerArray, lettersRemaining };
}


// fnc with parameter (buttonPress) -- m o t h e r
    // Handle keyboard / letter click 
    // DOM matches() method https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
function handleLetterClick(buttonPress) {
    if (buttonPress.target.matches('button.alphabet')) {
        clickCountDown--; //decrease clickCountDown by 1 per button click
        const letter = buttonPress.target.textContent.toLowerCase(); // change to lowercase to match array  
        buttonPress.target.style.backgroundColor = '#36b98e'; // change color fov visual queue that the button as been pressed
        if (activeWord.includes(letter)) {
            for (let i = 0; i < activeWord.length; i++) {
                if (activeWord[i] === letter && correctLetters[i] === '_') {
                    correctLetters[i] = letter;
                    lettersRemaining--; // decrease letters remaining
                }
            }
        } else {
            wrongGuessCount++; // increase wrongGuessCount by 1 per button click
            if (wrongGuessCount === 1) {
                spaceImage.src = "img/spaceMan2.png";
            } else if (wrongGuessCount === 2) {
                spaceImage.src = "img/spaceMan3.png";
            } else if (wrongGuessCount === 3) {
                spaceImage.src = "img/spaceMan4.png";
            } else if (wrongGuessCount === 4) {
                spaceImage.src = "img/spaceMan5.png";
                meltDown(titleElement)
                setTimeout(revertTitle, 4000); // Set timeout to clear the message after 2 seconds --- stop light lesson
            } else if (wrongGuessCount === 5) {
                spaceImage.src = "img/spaceMan6.png";
            }
        }
        console.log('Letters Remaining: ' + lettersRemaining); //debug check 1
        console.log('Click Countdown: ' + clickCountDown); // debug check 2
        console.log('Wrong Guess Count: ' + wrongGuessCount); // debug check 3
        buttonPress.target.disabled = true;
        render();        
    }
}


function meltDown(titleElement) {
    titleElement.style.fontSize = '25px';
    titleElement.style.color = 'red';
    titleElement.textContent = 'The time has come for you to lip-sync... FOR YOUR LIFE!';
}



// fnc to change back title element
function revertTitle() {
    titleElement.style.fontSize= '55px';
    titleElement.style.color = 'black';
    titleElement.textContent = 'SPACE MAN'; // Clear the message after 2 seconds
}












// fnc Render the game state -- update the displayed elements on the site to show the following
function render() {    
    // messageBoxElement.textContent = correctLetters.join(" ");
    messageBoxElement.textContent = correctLetters.join(" "); //rendering the space between the letters with .join()
    availableGuessElement.textContent = `Available Guesses: ${maxGuessCount - wrongGuessCount} out of ${maxGuessCount}`;
        checkWinner();
        renderGameOverMessage();
        renderPlayAgain();
    }
     

// fnc RENDER game over message
function renderGameOverMessage() {
    if (winner === true) {
        messageBoxElement.innerText = 'SHANTAY YOU STAY';
    } else if (wrongGuessCount >= maxGuessCount) {
        messageBoxElement.innerText = 'SASHAY AWAY';
    }
}


// fnc RENDER play again button, ternary expression from connect 4 lesson
function renderPlayAgain() {
    playAgainButton.style.visibility = winner || wrongGuessCount >= maxGuessCount ? 'visible' : 'hidden';
}


/* ending the game */
// fnc Check win conditions -- winner true or false,
function checkWinner() {
    if (lettersRemaining === 0 && wrongGuessCount >= 0) {
        winner = true;
        getScore();
    } else {
        winner = false;
    }
}


// fnc add player score, points are calculated by # of available guesses left += score 
function getScore() {
    if (winner = true) {
        score += (maxGuessCount - wrongGuessCount);
        highScore.innerText ='Score: '+ score;
    }
}


// play again after win condition rendered -- reset Game
function resetGame() {
    init();
    changeKeyboardColorBack();
    reenableKeyboard();
}


// fnc change keyboard background color back to OG color
function changeKeyboardColorBack() {
    const keyboardButtons = document.querySelectorAll('.alphabet');
        keyboardButtons.forEach(function(button) {
            button.style.backgroundColor = '#cecab6';
        });
}


// fnc reenable the keyboard button after game is over
function reenableKeyboard() {
    const keyboardButtons = document.querySelectorAll('.alphabet');
        keyboardButtons.forEach(function(button) {
            button.disabled = false;
        });
}


// Initialize the game -- start your engines~
init();

























/*----- NOTES

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
    • spaces between underscores,
	• remaining guess count, 
	• the keyboard

Rendering the keyboard: 
Renderkeyboard()
generates buttons for each letter of the alphabet
^ cancel, could not figure out, just sashay all the way, the DOM won this fight, but I will be back or not, idk


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

-----*/