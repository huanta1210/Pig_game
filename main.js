'use strict';
// Select elements
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');

const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Toggle chuyển đổi giữa 2 trạng thái
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

let diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHole = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = () => {
    score0El.textContent = 0;
    score1El.textContent = 0;
    
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
};

init();

// Rolling dice
btnRoll.onclick = () => {
   if(playing) {
        // Random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Remove dice
        diceEl.classList.remove('hidden');
        // Src is the source attribute
        diceEl.src = `img/dice-${dice}.png`;

        // Check for rolled 1: if true, switch to next player
        if(dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
   }
};

btnHole.onclick = () => {
    if(playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
    
};


btnNew.onclick = () => { init()};  