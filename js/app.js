const singleCards = ['fa-diamond',
                    'fa-paper-plane-o',
                    'fa-anchor',
                    'fa-bolt',
                    'fa-cube',
                    'fa-leaf',
                    'fa-bicycle',
                    'fa-bomb',
                    ]; 

const cards = singleCards.concat(singleCards);

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function winTheGame() {
    let winnerLi = document.createElement("LI");
    let winnerText = document.createTextNode(`Congratulation, you won! Your score is ${moves} Moves! You made it in ${document.querySelector(".seconds").innerHTML} and you got ${starsValue.length} out of 3 stars!`);
    winnerLi.appendChild(winnerText);
    winnerLi.classList.add('winner');
    document.querySelector('.deck').appendChild(winnerLi);
    timer();
    wantToPlayAgain();
};

function wantToPlayAgain() {
    let text = document.createElement("p");
    let again = document.createTextNode('Play again?');
    text.appendChild(again);
    text.classList.add('play__again');
    document.querySelector('.winner').appendChild(text);
    
    text.addEventListener('click', function() {
        location.reload();
    });
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function initGame() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;
    deck.innerHTML = cardHTML.join('');
    
}

let moves = 0;
let moveCounter = document.querySelector('.moves');

initGame();

const cardsAll = document.querySelectorAll('.card',);
let openCards = [];
let matchedCards = [];
let timerCard = [];
let stars = document.querySelector('.stars');
let starsValue = stars.getElementsByClassName('fa fa-star');
let changeDeck = document.querySelector('.deck');
let checkWinner = document.querySelector('.check');
const deck = document.querySelector('.deck');
let time = 0;
let runningTime = 0;

function timer() {
    if(runningTime == 0) {
        runningTime = 1;
        increment();
    }
    else{
        runningTime = 0;
    }
}

function increment() {
    if(runningTime == 1) {
        setTimeout(function(){
            time++;
            var mins = Math.floor(time/10/60);
            var secs = Math.floor(time/10);
            var tenths = time % 10;
            
            if(mins < 10){
                mins = "0" + mins;
            }
            
            if(secs < 10){
                secs = "0" + secs;
            }
            document.querySelector(".seconds").innerHTML = mins + ":" + secs + ":0" + tenths;
            increment();
        }, 100);
    }
}

function game() {
    cardsAll.forEach(function(card) {
        card.addEventListener('click',function(event) {
        
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
                openCards.push(card);
                timerCard.push(card);
                
                if (timerCard.length == 1) {
                    timer();
                }
                
                if (timerCard.length == 40) {
                    stars.firstElementChild.remove('li');
                }
                
                if (timerCard.length == 80) {
                    stars.firstElementChild.remove('li');
                }
                
                card.classList.add('open', 'show');
                         
                if (openCards.length == 2) {
                
                    // do the cards match?
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        matchedCards.push(openCards[0], openCards[1]);
                        openCards = [];
                        
                        // Game is won
                        if (matchedCards.length == 16) {
                                matchedCards.forEach(function(card) {
                                    card.classList.add('end');
                                    changeDeck.classList.add('won');
                                });
                            checkWinner.classList.add('winner-check');
                            return winTheGame();
                            }
                    }

                        // remove cards, when they don´t match
                    else {    
                        setTimeout(function(){
                            openCards.forEach(function(card) {
                                card.classList.remove('open', 'show');
                            });

                            openCards = [];
                        }, 1000);
                    }
                    moves += 1;
                    moveCounter.innerText = moves;
                }
            }

        });
    });
}

game();


 // restart the Game

const reload = document.querySelector('.restart');

reload.addEventListener('click', function() {
    location.reload();
});
