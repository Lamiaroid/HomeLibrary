let columns;
let rows;

let timeGameBegan = Date.now();
let timePassed;
let timerStateChanger = 0;

const playersTOP = 10;

let cardArray = new Array();	
let cardCounter = 0;
let cardNext = -1;
let cardCurrent = -1;
let overallCardsNumber = 0;

let cardBackPicture = "Cards/CardBack1.jpg";
let animationType;
let cardView;

let userData = new Array();

let data = window.location.search.substring(1).split('&');
while (part = data.shift()) {
   	part = part.split('=');
   	userData.push(decodeURIComponent(part[1]));
}

let difficultyType = userData[3];
let playerEmail = userData[2].toLowerCase();
let playerNick = userData[0] + '#' + userData[1];

let timerValue = document.createElement("p");
timerValue.id = "timer-state1";
timerValue.innerHTML = "0с";
document.body.appendChild(timerValue);

let container = document.createElement("div");
container.id = "flex-container";

switch (difficultyType) {
	case 'Easy':
		columns = 5;
		rows = 2;
		animationType = 'action';
		cardView = 'card-design';
		howToPlaceCards = 'flex-item';
		break;
	case 'Medium':
		columns = 6;
		rows = 3;
		animationType = 'action-mini';
		cardView = 'card-design-mini';
		howToPlaceCards = 'flex-item-mini';
		break;
	case 'Hard':
		columns = 8;
		rows = 3;
		animationType = 'action-mini-mini';
		cardView = 'card-design-mini-mini';
		howToPlaceCards = 'flex-item-mini-mini';
		break;
}

let cardsLeftToSetValue = 0;
let cardsToSetArr = new Array();
while (cardsLeftToSetValue < columns * rows) {
	cardsToSetArr.push(cardsLeftToSetValue);
	cardsLeftToSetValue++;
}
cardsLeftToSetValue--;

let rowsCounter = 0;
while (rowsCounter < rows) {
	let counterColumns = 0; 
	while (counterColumns < columns) {
		let containerElement = document.createElement("div");
		containerElement.id = howToPlaceCards;

		let picture = document.createElement("img");
		picture.src = cardBackPicture;
		picture.id = cardView;
		picture.num = cardCounter;

		let cardToSetValue = randomInteger(0, cardsLeftToSetValue);
		let cardValue = cardsToSetArr[cardToSetValue];

		cardsToSetArr.splice(cardToSetValue, 1);
		cardsLeftToSetValue--;

		switch (cardValue) {
			case 0:
			case 1:
				picture.cardPicture = "Cards/Card1.png";
				break;
			case 2:
			case 3:
				picture.cardPicture = "Cards/Card2.jpg";
				break;
			case 4:
			case 5:
				picture.cardPicture = "Cards/Card3.jpg";
				break;
			case 6:
			case 7:
				picture.cardPicture = "Cards/Card4.jpg";
				break;
			case 8:
			case 9:
				picture.cardPicture = "Cards/Card5.png";
				break;
			case 10:
			case 11:
				picture.cardPicture = "Cards/Card6.jpg";
				break;
			case 12:
			case 13:
				picture.cardPicture = "Cards/Card7.jpg";
				break;
			case 14:
			case 15:
				picture.cardPicture = "Cards/Card8.png";
				break;
			case 16:
			case 17:
				picture.cardPicture = "Cards/Card9.jpg";
				break;
			case 18:
			case 19:
				picture.cardPicture = "Cards/Card10.jpg";
				break;
			case 20:
			case 21:
				picture.cardPicture = "Cards/Card11.jpg";
				break;
			case 22:
			case 23:
				picture.cardPicture = "Cards/Card12.jpg";
				break;
		}

		picture.onclick = function() {
    		if (cardCurrent == -1) {
    			cardCurrent = this.num;
    			this.id = animationType;
    			setTimeout(firstCardPick, 1000);
    		} else if (cardNext == -1 && this.num != cardCurrent) {
    				cardNext = this.num;
    				this.id = animationType;
    				setTimeout(secondCardPick, 1000);
    				setTimeout(twoCardsWereChosen, 2500);
    			}   				
		}

		containerElement.appendChild(picture);
		container.appendChild(containerElement);
		document.body.appendChild(container);

		cardArray.push({picture: picture});

		counterColumns++;
		cardCounter++;
	}

	overallCardsNumber = cardCounter;
	rowsCounter++;
}

var heartBeatEffectID = setInterval(heartBeatEffect, 500);
var timerID = setInterval(gameTimer, 20);

function firstCardPick() {
    cardArray[cardCurrent].picture.src = cardArray[cardCurrent].picture.cardPicture;
	cardArray[cardCurrent].picture.id = cardView;
}

function secondCardPick() {
    cardArray[cardNext].picture.src = cardArray[cardNext].picture.cardPicture;
	cardArray[cardNext].picture.id = cardView;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}

function twoCardsWereChosen() {
  	if (cardArray[cardNext].picture.cardPicture == cardArray[cardCurrent].picture.cardPicture) {					
    	cardArray[cardNext].picture.id = cardArray[cardCurrent].picture.id = "equal-cards";
    	cardCurrent = cardNext = -1;
    	cardCounter -= 2;

    	if (cardCounter == 0) {
    		clearInterval(timerID);
    		clearInterval(heartBeatEffectID);

    		let victoryTime = timePassed / 1000;
    		
    		setTimeout(function () {youWin(victoryTime)}, 600);
    	}
    } else {
    	cardArray[cardNext].picture.id = cardArray[cardCurrent].picture.id = animationType;

    	function cardsNotEqual() {
    		cardArray[cardNext].picture.src = cardArray[cardCurrent].picture.src = cardBackPicture;
    		cardArray[cardNext].picture.id = cardArray[cardCurrent].picture.id = cardView;
    		cardCurrent = cardNext = -1;
    	}

    	setTimeout(cardsNotEqual, 1000);						
    }
}

function youWin(recordTime) {	
	container.id = 'dissolve';
	let winContainer = document.createElement("div");
	let winContainerElement = document.createElement("div");
	winContainer.id = "content-container-win";
	winContainerElement.id = "content-win";
	winContainerElement.innerHTML = `<h2>Победа!</h2><h2>Ваш рекорд: ${recordTime} с</h2>
									 <h2>Прекрасная работа!</h2>
									 <form action="/game/records" method="post" enctype="multipart/form-data">
									 <button class='content-container button' style='margin-left: 10%' name='reco' value='${playerNick}+${playerEmail}+${recordTime}+${difficultyType}'>Ура!</button>
									 </form>`;
	winContainer.appendChild(winContainerElement);
	document.body.appendChild(winContainer);
}

function gameTimer() {
  	timePassed = Date.now() - timeGameBegan;
  	timerValue.innerHTML = String(Math.round(timePassed / 1000)) + 'с'; 	
}

function heartBeatEffect() {
	if (timerStateChanger == 1) {
		timerValue.id = "timer-state1";
		timerStateChanger--;
	} else {
		timerValue.id = "timer-state2";
		timerStateChanger++;
	}
}

function randomInteger(min, max) {
    let randNumber = min - 0.5 + Math.random() * (max - min + 1)
    randNumber = Math.round(randNumber);
    return randNumber;
}

function cardBackChanger(type) {
	let cardID = 0;
	while (cardID < overallCardsNumber) {
		if (cardID != cardCurrent && cardID != cardNext) {
			switch (type) {
				case 'CardBack1':
					cardArray[cardID].picture.src = "Cards/CardBack1.jpg";
					cardBackPicture = "Cards/CardBack1.jpg";
					break;
				case 'CardBack2':
					cardArray[cardID].picture.src = "Cards/CardBack2.jpg";
					cardBackPicture = "Cards/CardBack2.jpg";
					break;
				case 'CardBack3':
					cardArray[cardID].picture.src = "Cards/CardBack3.jpg";
					cardBackPicture = "Cards/CardBack3.jpg";
					break;
				case 'CardBack4':
					cardArray[cardID].picture.src = "Cards/CardBack4.jpg";
					cardBackPicture = "Cards/CardBack4.jpg";
					break;
				case 'CardBack5':
					cardArray[cardID].picture.src = "Cards/CardBack5.jpg";
					cardBackPicture = "Cards/CardBack5.jpg";
					break;
				case 'CardBack6':
					cardArray[cardID].picture.src = "Cards/CardBack6.jpg";
					cardBackPicture = "Cards/CardBack6.jpg";
					break;
			}
		}
		cardID++;
	}
}