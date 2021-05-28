'use strict';
// ELEMENTS
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

// START CONDITIONS
let scores, currentScore, activePlayer, playing;

class Pig {
  scores;
  currentScore;
  activePlayer;
  playing;

  constructor() {}
}

// Functions

const resetGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = currentScore;
  current1EL.textContent = currentScore;

  diceEL.classList.add('hidden');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
};
resetGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// ROLLING DICE
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    const diceNum = Number(Math.trunc(Math.random() * 6) + 1);

    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD RESULT
btnHold.addEventListener('click', function () {
  if (playing === true) {
    if (currentScore !== 0) {
      scores[activePlayer] += currentScore;

      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      currentScore = 0;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      diceEL.classList.add('hidden');

      if (scores[activePlayer] >= 100) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        playing = false;
      } else {
        switchPlayer();
      }
    }
  }
});

// NEW GAME
btnNew.addEventListener('click', resetGame);
