'use strict';

// selection d'élements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const scorePlayer1 = document.getElementById('current--0')
const scorePlayer2 = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

//start conditions
let scores, currentScore, activePlayer, playing

const init = function(){
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    score0El.textContent = 0
    score1El.textContent = 0
    scorePlayer1.textContent = 0
    scorePlayer2.textContent = 0
    
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

init()

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active') 
}



//lancer de dé
btnRoll.addEventListener('click', function(){

    if(playing){

        //generer un nbr aléatoire
        const dice = Math.trunc(Math.random() * 6) + 1

        //afficher le dé
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`

        //check si c'est 1: si c'est vrai, next player
        if(dice !=1){
            //ajouter le dice au score
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore

        }else{
            //next player
            switchPlayer()
        }
    }
    

})

btnHold.addEventListener('click', function(){
    if(playing){
        //save score to active player score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        
        //check score is === 100
        if(scores[activePlayer] >= 100){
            //finish the game
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

        }else{
            //switch to next player
            switchPlayer()
        }
    }
})

btnNew.addEventListener('click', init)







