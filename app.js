const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
]

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const playsDisplay = document.querySelector('#plays');

if(localStorage.getItem('highScore')){
    document.querySelector('#highScore').textContent = `High Score: ${localStorage.getItem('highScore')}`
}

let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function createBoard(){
    for(let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card);
    }
}

createBoard()

function clearArray(){
    cardsChosen.splice(0, 2)
    cardsChosenIds.splice(0, 2);
}

function clearAll(){
    cardsWon = [];
    playsDisplay.innerHTML = '0'
    clearArray();
    gridDisplay.querySelectorAll('img').forEach(img => {
        img.setAttribute('src', 'images/blank.png')
        img.addEventListener('click', flipCard)
    })
}

function isFinish(){
    if(cardsWon.length === (cardArray.length/2)){
        highScore();
        alert('Congratulations you found them all!!!! :)')
        clearAll();
        return;
    }

    alert('You found a match!');
    
}

function highScore(){
    const highScore = localStorage.getItem('highScore');
    if(highScore){
        Number(playsDisplay.innerHTML) < Number(highScore) ? localStorage.setItem('highScore', String(playsDisplay.innerHTML)) : ""
        document.querySelector('#highScore').innerHTML = `High Score: ${localStorage.getItem('highScore')}`;
        return
    }
    localStorage.setItem('highScore', String(playsDisplay.innerHTML));
    document.querySelector('#highScore').textContent = `High Score: ${localStorage.getItem('highScore')}`;
}


function checkMatch(){
    
   
    const cards = gridDisplay.querySelectorAll('img');
    if(cardsChosenIds[0] === cardsChosenIds[1]) {
        alert('You have clicked the same image!')
        cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
        clearArray()
        return;
    }

    if(cardsChosen[0] === cardsChosen[1] && cardsChosen.length > 0){
        cards[cardsChosenIds[0]].removeEventListener('click', flipCard);
        cards[cardsChosenIds[1]].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        isFinish();
        clearArray()
        return;
    }

    playsDisplay.innerHTML = Number(playsDisplay.innerHTML) + 1;
    alert('You not found a match!');
    cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
    cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.png')
    clearArray()
}

function flipCard() {
   
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId);

    this.setAttribute('src', cardArray[cardId].img);
  
    if(cardsChosen.length === 2){
        setTimeout(checkMatch, 100)
    }
}

