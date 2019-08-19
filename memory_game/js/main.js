let cards = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png'
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png'
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png'
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png'
  }
];
let cardsInPlay = [];

document.querySelector('button').addEventListener('click', function(){
  let board = document.querySelector('#game-board');
  while (board.firstChild) {
      board.removeChild(board.firstChild);
  }

  cardsInPlay = [];
  createBoard();
});

createBoard();

let modal = document.querySelector('.modal-container');
let close = document.querySelector('.close');

close.addEventListener('click', function() {
  modal.classList.add('hide');
});

document.body.onkeyup = function(e){
  if(e.key === ' ' || e.key === 'Escape'){
    modal.classList.add('hide');
  }
}




function checkForMatch() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    increaseScore();
    notify('You found a match!');
  }
  else {
    let images = document.querySelectorAll('img');
    for (let img of images) {
      img.setAttribute('src', 'images/back.png')
      img.addEventListener('click', flipCard);
    }
    cardsInPlay = [];
    notify('Sorry, try again.');
  }
}

function flipCard() {
  let cardId = this.getAttribute('data-id');
  let card = cards[cardId];
  cardsInPlay.push(card.rank);
  console.log("User flipped " + card.rank);
  console.log(card.cardImage);
  console.log(card.suit);

  this.setAttribute('src', card.cardImage)
  this.removeEventListener('click', flipCard);

  if (cardsInPlay.length === 2) {
    checkForMatch();
  }
}

function createBoard() {
  let orderedCards = [];

  for (let i = 0; i < cards.length; i++) {
    let cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);
    orderedCards.push(cardElement);
  }

  let randomisedCards = shuffleArray(orderedCards);
  for (let card of randomisedCards) {
    document.querySelector('#game-board').appendChild(card);
  }
}

function shuffleArray(array) {
  let currentIndex = array.length;

  while (currentIndex) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    let tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array
};

function increaseScore() {
  let score = document.getElementById('score');
  score.textContent = Number(score.textContent) + 1
};

function notify(text) {
  document.querySelector('#modal-text').textContent = text
  modal.classList.remove('hide');
};
