'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//selecting score element of player 0
const score0El = document.querySelector('#score--0');
//selecting score element of player 1
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');

const current1El = document.getElementById('current--1');

//selecting dice element
const diceEl = document.querySelector('.dice');
//button new element
const btnNew = document.querySelector('.btn--new');
//button roll element
const btnRoll = document.querySelector('.btn--roll');
//button hold element
const btnHold = document.querySelector('.btn--hold');
//starting conditions

let scores, currentScore, activePlayer, playing;

//starting function
 const init = function()
 {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0; 
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
 };

init();

//switch player function
const switchplayer = function()
{
    document.getElementById(`current--${activePlayer}`).textContent =0;
    activePlayer = activePlayer === 0 ? 1:0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//rolling the dice
btnRoll.addEventListener('click', function(){

    if(playing) //playing the game
    {
        //random dice roll
        const dice = Math.trunc(Math.random() * 6) +1;
        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //if dice = 1 then switch player
        if(dice!==1)
        {
            //add dice to current score
            currentScore +=  dice;
            document.getElementById(`current--${activePlayer}`).textContent =currentScore;
        }
        else
        {
            //switch to next player
            switchplayer();
        }
    }

});

btnHold.addEventListener('click', function(){

    if(playing)
    {
        // current score of active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
        //check score is>=100 finish the game
        if(scores[activePlayer] >= 100)
        {
            //finish
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else
        {
            //switch to next player
            switchplayer(); 
        }
    }        
});

btnNew.addEventListener('click', init);