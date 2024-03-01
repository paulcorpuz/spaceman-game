/*----- constants -----*/
// grid row 2 amd 3
const secretWords = [
    'accountable',
    'actionable',
    'agility',
    'alignment',
    'benchmark',
    'core',
    'corporate',
    'culture',
    'engagement',
    'growth',
    'innovation',
    'integration',
    'leverage',
    'metrics',
    'offline',
    'online',
    'onboarding',
    'optimize',
    'pivot',
    'scalable',
    'streamline',
    'sustainable',
    'synergy',
    'value',
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
// fnc game initialization
function init() {
    activeWord = getRandomWord(secretWords);     //select a random secret word from the array  -- secret word is activeWord
    let {answerArray} = createAnswerArray(activeWord);  //create the array with underscores
    correctLetters = answerArray;
    wrongGuessCount = 0; // starting wrong guesses - icebox adding difficulty?
    clickCountDown = maxGuessCount;
    winner = false;
    spaceImage.src = "img/spaceMan1.png",
    revertMessageBoxElement();
    render();
    console.log(activeWord); //debug check on activeWord
}

// fnc select a random secret word from the secretWords array
function getRandomWord(secretWords) {
    return secretWords[Math.floor(Math.random() * secretWords.length)];
}

// fnc create an array with underscores to represent the secret word length and keep track of letters remaining. spaces are made in render fnc
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
function handleLetterClick(buttonPress) {
    if (buttonPress.target.matches('button.alphabet')) {
        clickCountDown--; //decrease clickCountDown by 1 per button click
        const letter = buttonPress.target.textContent.toLowerCase(); // change to lowercase to match array  
        buttonPress.target.style.backgroundColor = '#3cb0a5'; // change color for visual queue that the button as been pressed
        if (activeWord.includes(letter)) {
            for (let i = 0; i < activeWord.length; i++) {
                if (activeWord[i] === letter && correctLetters[i] === '_') {
                    correctLetters[i] = letter;
                    lettersRemaining--; // decrease letters remaining of activeWord
                }
            }
        } else {
            wrongGuessCount++; // increase wrongGuessCount by 1 per button click
            if (wrongGuessCount === 1) { //change image per wrongGuessCount
                spaceImage.src = "img/spaceMan2.png";
            } else if (wrongGuessCount === 2) {
                spaceImage.src = "img/spaceMan3.png";
            } else if (wrongGuessCount === 3) {
                spaceImage.src = "img/spaceMan4.png";
            } else if (wrongGuessCount === 4) {
                spaceImage.src = "img/spaceMan5.png";
                lastGuessWarning(titleElement)
                setTimeout(revertTitle, 4000); // Set timeout to clear the message after 3 seconds --- check stoplight lesson
            } else if (wrongGuessCount === 5) {
                spaceImage.src = "img/spaceMan6.png";
            }
        }
        console.log('Letters Remaining: ' + lettersRemaining); //debug check 1
        console.log('Click Countdown: ' + clickCountDown); // debug check 2
        console.log('Wrong Guess Count: ' + wrongGuessCount); // debug check 3
        buttonPress.target.disabled = true; // disable the keyboard from being used again.
        render();        
    }
}


// fnc to change color + text of titleElements at one guess remaining -- "red alert"
function lastGuessWarning(titleElement) {
    titleElement.style.fontSize = '55px';
    titleElement.style.color = '#fd4f56'; // style.color red
    titleElement.textContent = 'Hey, are you still online?';
}


// fnc to change titleElement back to OG style/content
function revertTitle() {
    titleElement.style.fontSize= '55px';
    titleElement.style.color = '#000000';
    titleElement.textContent = 'Spaced Out Man'; // Clear the message after 2 seconds
}


// fnc Render the game state -- update the displayed elements on the site to show the following
function render() {    
    // messageBoxElement.textContent = correctLetters.join(" ");
    messageBoxElement.textContent = correctLetters.join(" "); //rendering the space between the letters with .join()
    availableGuessElement.textContent = `Low Hanging Fruit: ${maxGuessCount - wrongGuessCount} out of ${maxGuessCount}`;
        checkWinner();
        renderGameOverMessage();
        renderPlayAgain();
    }
     

// fnc RENDER game over message
function renderGameOverMessage() {
    if (winner === true) {
        messageBoxElement.style.fontSize= '35px';
        messageBoxElement.style.color = '#fd4f56';
        messageBoxElement.innerHTML = `Meeting Canceled! Enjoy your nap!<br>Proprietary Info: ${activeWord}`;
    } else if (wrongGuessCount >= maxGuessCount) {
        messageBoxElement.style.fontSize= '35px';
        messageBoxElement.style.color = '#fd4f56';
        messageBoxElement.innerHTML = `Can we hop on a call?<br>Proprietary Info: ${activeWord}`;
    }
}

// fnc to change messageBoxElement back to OG style/content
function revertMessageBoxElement() {
    messageBoxElement.style.fontSize= '55px';
    messageBoxElement.style.color = '#000000';
}

// fnc RENDER play again button, ternary expression
function renderPlayAgain() {
    playAgainButton.style.visibility = winner || wrongGuessCount >= maxGuessCount ? 'visible' : 'hidden';
}


/*----- functions for ending the game -----*/ 
// fnc check win conditions -- winner true or false,
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
        highScore.innerText ='Metrics: '+ score;
    }
}


// play again after win condition rendered -- reset Game
function resetGame() {
    init();
    changeKeyboardColorBack();
    reenableKeyboard();
}


// fnc change keyboard style back to OG style
function changeKeyboardColorBack() {
    const keyboardButtons = document.querySelectorAll('.alphabet');
        keyboardButtons.forEach(function(button) {
            button.style.backgroundColor = '#f8f5e0';
        });
}


// fnc re-enable the keyboard button after game over -- button disable false
function reenableKeyboard() {
    const keyboardButtons = document.querySelectorAll('.alphabet');
        keyboardButtons.forEach(function(button) {
            button.disabled = false;
        });
}


// Initialize the game -- racers, start your engines!!!!!~
init();

