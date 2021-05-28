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

class Pig {
  scores;
  currentScore;
  activePlayer;
  playing;

  constructor() {
    this.resetGame();

    // Event handlers
    btnRoll.addEventListener('click', this.rollDice.bind(this));
    btnHold.addEventListener('click', this.holdResult.bind(this));

    // New game
    btnNew.addEventListener('click', this.resetGame.bind(this));
  }

  resetGame() {
    this.scores = [0, 0];
    this.currentScore = 0;
    this.activePlayer = 0;
    this.playing = true;
    score0EL.textContent = 0;
    score1EL.textContent = 0;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = this.currentScore;
    current1EL.textContent = this.currentScore;

    diceEL.classList.add('hidden');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
  }

  switchPlayer() {
    document.getElementById(`current--${this.activePlayer}`).textContent = 0;
    this.currentScore = 0;
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
  }

  rollDice() {
    if (this.playing === true) {
      const diceNum = Number(Math.trunc(Math.random() * 6) + 1);

      diceEL.classList.remove('hidden');
      diceEL.src = `dice-${diceNum}.png`;

      if (diceNum !== 1) {
        this.currentScore += diceNum;
        document.getElementById(`current--${this.activePlayer}`).textContent =
          this.currentScore;
      } else {
        this.switchPlayer();
      }
    }
  }

  holdResult() {
    if (this.playing === true) {
      if (this.currentScore !== 0) {
        this.scores[this.activePlayer] += this.currentScore;

        document.getElementById(`score--${this.activePlayer}`).textContent =
          this.scores[this.activePlayer];

        this.currentScore = 0;

        document.getElementById(`current--${this.activePlayer}`).textContent =
          this.currentScore;

        diceEL.classList.add('hidden');

        if (this.scores[this.activePlayer] >= 100) {
          document
            .querySelector(`.player--${this.activePlayer}`)
            .classList.add('player--winner');
          document
            .querySelector(`.player--${this.activePlayer}`)
            .classList.remove('player--active');
          this.playing = false;
        } else {
          this.switchPlayer();
        }
      }
    }
  }
}

const pigGame = new Pig();
