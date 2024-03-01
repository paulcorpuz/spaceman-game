NOTES
==========================


HTML
==========================

CSS

/* reference to page layout https://www.digitalocean.com/community/tutorials/css-css-grid-layout-fr-unit */

/* --- Hex color palette
menus: #f8f5e0
buttons: #3cb0a5
red accent: #fd4f56
black accent: #000000
*/


JS
==========================
// DOM matches() method https://developer.mozilla.org/en-US/docs/Web/API/Element/matches












Original Pseudocode
==========================

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


Game plan for functions
==========================


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

Win condition: Checking for a Win/loss
Render game over message
renderGameOverMessage()
Check if the player has guessed all the letters in the secret word
Display message if player has won or lost

Rendering the Play Again Button 
renderPlayAgain()
This function toggles the visibility of the play again button based on whether the game is over.
