'use strict';

// step1 select elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// 3.3.5--change the background color-->select the two class
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

// step2 hide the dice picture
// -->add a hidden class in css file,
// -->then select the dice class
const diceEl = document.querySelector('.dice');
// starting conditions
//**   score0El.textContent = 0;
//**   score1El.textContent = 0;
//**   diceEl.classList.add('hidden');

// step3 react to clicking the roll button
// -->select the button element
// -->add event listener to the button
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// 3.3.1--define the currentSore variable
//**   let currentScore = 0;
// 3.3.2--create a variable to hold 0/1
//**   let activePlayer = 0;
// -->we store the scores of both players in an array
// -->the score of play1 is in position0 of the array, the score of play2 is in position1 of the array
//**   const scores = [0, 0];

// 4.2.2--finish/stop the game, it no longer works when press the rolling button
// -->define a boolean value
//**   let playing = true;

// 5.3.1--to declare these variables outside of any functions without any value
let currentScore, activePlayer, playing, scores;

// 5.2--create a function for the aboving code
// -->in two situation, we want this function to be executed: reload the webpage; click the new button
const init = function () {
  // 5.2.1--put the starting conditions in init function

  // 5.3.2--reassign the values of the variables
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// 5.3--execute the init function, then when reload the webpage, the game back to initial situation
// -->show a problem: when click the roll button, the game doesn't start.('playing' is not defined)
// -->it's a problem related to scoping.
// --->'playing', 'currentScore', 'activePlayer', 'scores' only available inside of the init function, which means they are scoped to the init function
// 5.3.1--solution: to declare these variables outside of any functions without any value
init();

// 3.3 & 4.2.3 create a function to reuse it
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 4.2.2.1--to set the playing situation in btnRoll function
  if (playing) {
    // 3.1--generate a random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNum);
    // 3.2--display dice
    diceEl.classList.remove('hidden');
    // 3.2.1--display the dice number same as the dice picture
    // -->manipulate the src attribute in img element
    diceEl.src = `./imgs/dice-${diceNum}.png`;

    // 3.3--checke for roll number 1, if true, switch to next player
    // -->add the dice number to current element when the number !== 1
    // -->we can not define the currentSore variable in the function, as when we click the button, the current score would be reset
    if (diceNum !== 1) {
      //const currentScore0El = document.querySelector('#current--0');
      //const currentScore1El = document.querySelector('#current--1');
      currentScore += diceNum;
      // -->in the future, we need to display the current score at current player

      // 3.3.3--instead of manipulating the element of player0, we select the element dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //currentScore0El.textContent = currentScore; // change later
    } else {
      //switch to next player

      // -->make score addition work both for player0 and player1
      // --->track which player is the current player, which means, to track which player is the active play in a moment that the dice is rolled, which means, we need to know which player is now playing whenever the button is clicked
      // 3.3.2--create a variable to hold 0 if the current player is player0, hold 1 if the current player is player1
      // 3.3.3--select the element dynamically
      // 3.3.4--change activePlayer = 0; from 0 to 1, or 1 to 0;
      //**   document.getElementById(`current--${activePlayer}`).textContent = 0;
      // -->reassign the activePlayer, check whether right now it is play1
      //**   activePlayer = activePlayer === 0 ? 1 : 0; // tunery operator
      // 3.3.5--change the current score back to 0
      //**   currentScore = 0;
      // 3.3.6--change the background color
      // -->remove class 'player--active' from the first player to the other player
      // -->select the two class
      // 3.3.6.1--change the class in '.player--0/1' element
      // -->use toggle method to check if the element has 'player--active' class, if so, then remove it, if not, then add it
      //**   player0El.classList.toggle('player--active');
      //**   player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

// step4 hole the current score
// -->we want something to happen when we click the hold button
// -->add event listener to hold button
btnHold.addEventListener('click', function () {
  // 4.2.2.2--to set the playing situation in btnHold function
  if (playing) {
    // 4.1 add current score to active player's score
    // -->we use a scores variable to store the score( in step3.3.1&2 ), which is an array. index0 holds score for player0, index1 holds score for player1
    // -->use activePlayer variable to get the correct score of the current player
    scores[activePlayer] += currentScore;
    //** scores[1] = score[1] + currentScore;
    // 4.1.1--display the total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 4.2--check score is already >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // 4.2.1--if so, finish the game
      // -->assign a player winner class in css file '.player--winner'
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // -->remove the '.player--active' class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // 4.2.2--finish/stop the game, it no longer works when press the rolling button
      // 4.2.2.1--define a boolean value
      // 4.2.2.2--to set the playing situation in btnRoll function
      // 4.2.2.3--to set the playing situation in btnHold function
      // 4.2.2.4--hide the dice picture
      diceEl.classList.add('hidden');
    } else {
      // 4.2.3--if not, switch to the next player
      // -->use again 'switch player' as in the step3.3, so create function to avoide repeated code or to reuse it
      // 4.2.3.1--create a function 'switchPlaye()'
      // 4.2.3.2--execute the function
      switchPlayer();
    }
  }
});

// step5 reset the game
// -->we want to remove winner class when we click the new button, and set all the player and current scores to 0
// -->add event listener to hold button
btnNew.addEventListener('click', init);
// 5.1 reset all the scores like below
//** score0El.textContent = '0';
//**   score0El.textContent = '0';
//**   currentScore0El.textContent = '0';
//**   currentScore1El.textContent = '0';
//**   diceEl.classList.remove('hidden');
//**   document
//**     .querySelector(`.player--${activePlayer}`)
//**     .classList.remove('player--winner');
//**   document
//**     .querySelector(`.player--${activePlayer}`)
//**     .classList.remove('player--active');
// 5.2 create a function for the aboving code
// 5.2.1--put the starting conditions in init function
// 5.3--execute the init function, then when reload the webpage, the game back to initial situation
// 5.3.1--solution: to declare these variables outside of any functions without any value
// 5.3.2--reassign the values of the variables
// 5.3.2--pass the init function as a parameter to 'btnNew.addEventListener('click', init);' to execute it when click the new button
// -->function加括号和不加括号
