function createDeck(){
  const suits = ["Diamonds", "Spades", "Clubs", "Hearts"]
  const cardNumber = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
  
  // Use this to create a full deck
  const deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cardNumber.length; j++) {
      // displaying a single card's information

      // create value variable to keep track of card's value
      let value = 0;

      // if card is a face card, set value to 10
      if (cardNumber[j] === 'J' || cardNumber[j] === 'Q' || cardNumber[j] === 'K') {
        value = 10;
      } else if (cardNumber[j] === 'A') { // if card is an ace, set value to 11
        value = 11;
      } else { // else set value equal to the card number
        value = cardNumber[j];
      }
      
      // push card to deck
      let card = { card: cardNumber[j], suit: suits[i], value: value }
      deck.push(card)
    }
  }
  return deck;
}


function shuffleDeck(deck){
  // to shuffle the deck at the start of each new game
  const newDeck = deck;
  
  let numCards = deck.length;
  let L1 = 0; // this represents an element inside the deck array, which will be randomized
  let L2 = L1+1; // this represents the next element's location inside the deck array, which will be used to randomize the location of cards
  while (numCards) {
    // the formula below will find a random location inside the deck array to switch out with 
    L1 = Math.floor(Math.random() * newDeck.length);
    [newDeck[L1], newDeck[L2]] = [newDeck[L2], newDeck[L1]];
    numCards--
  }
  return newDeck;
}


// console.log(shuffledDeck);

// const playerHand = []
// const houseHand = []
//deals cards and removes dealt cards from newDeck
function dealCard(deck, hand) {
  hand.push(deck.pop());
}

// dealCard(shuffledDeck, playerHand)
// dealCard(shuffledDeck, playerHand)
// dealCard(shuffledDeck, playerHand)
// dealCard(shuffledDeck, houseHand)
// dealCard(shuffledDeck, houseHand)

// console.log('Player Hand:', playerHand);

// console.log('House Hand:', houseHand);

function determineValueOfHand(hand) {
  // check how many aces are in hand
  let aceCount = 0;
  
  // hand.forEach((el) => {
  //   if (el.card === 'A') aceCount++;
  // })

  for (let i = 0; i < hand.length; i++) {
    if (hand[i].card === 'A') aceCount++;
  }

  // calculate total points in hand
  let count = hand.reduce((acc, cur) => {
    return cur['value'] + acc;
    }, 0);
  
  // for each ace in hand, check if we need to take the lower value of each ace (1 point instead of 11 points)
  for (let i = 0 ; i < aceCount; i++) {
    if (count > 21) count -= 10;
  }

  return count;
}

//const testHand = [ { card: 'A', suit: 'Hearts', value: 11 },
// { card: 'A', suit: 'Hearts', value: 11 }, { card: 'K', suit: 'Spades', value: 10 } ];


// let playerCount = determineValueOfHand(playerHand);
// let houseCount = determineValueOfHand(houseHand);
//let testCount = determineValueOfHand(testHand);

// console.log('playerCount: ', playerCount)
// console.log('houseCount: ', houseCount)
//console.log('testCount: ', testCount)

function playerHandAndValueText(hand, value) {    
 	const text1 = 'Player Hand: '
  const text3 = ' Player Count: '
  const text4 = determineValueOfHand(hand) // get value of hand
  const text5 = '.'

  // pull out the card info for each card in hand
  // convert that to a string
  let cardText = ''
  // hand.forEach((card) => {
  //   cardText += `${card.card} of ${card.suit}, `;
  // });
  for (let i = 0; i < hand.length; i++) {
    cardText += `${hand[i].card} of ${hand[i].suit}, `;
  }

  // combine all these strings into one string
  return text1 + cardText + text3 + text4 + text5;
  
}

function houseHandAndValueText(hand, value) { // parameters 
  const text1 = 'House Hand: '
  // let text2 = hand.toString(" ");

  // pull out the card info for each card in hand
  // convert that to a string
  const cardText = `${hand[0].card} of ${hand[0].suit}, Hidden Card.`;

  // combine all these strings into one string
  return text1 + cardText;
  
}

function finalHouseHand(hand,value){
  const text1 = 'House Hand: '
  const text3 = ' House Count: '
  const text4 = determineValueOfHand(hand) // get value of hand
  const text5 = '.'

  // pull out the card info for each card in hand
  // convert that to a string
  let cardText = ''
  
  // hand.forEach((card) => {
  //   cardText += `${card.card} of ${card.suit}, `;
  // });

  for (let i = 0; i < hand.length; i++) {
    cardText += `${hand[i].card} of ${hand[i].suit}, `;
  }

  // combine all these strings into one string
  return text1 + cardText + text3 + text4 + text5;
}

function hitMe(deck, hand) {
  //Player decides to HIT
  // deal one card to player and then update the playerCount
  dealCard(deck, hand)  
	// count = determineValueOfHand(hand)
  // return count
}

function houseHandCheck(houseCount, playerCount, shuffledDeck, houseHand) {
    if (houseCount > 21 || playerCount > houseCount) {
      alert('YOU WIN!')
    } else if (houseCount === playerCount) { // even if both player and house get 21, it'd be a tie
      alert('You tie with the house');
  	} else { // all other cases means the house wins
      alert('House wins!')	
  	} 
}

/////////////////////////////
/////////////////////////////
///// ~*~*STARTGAME*~*~ /////
/////////////////////////////
/////////////////////////////

function startGame() {
  // create and shuffle deck
  const originalDeck = createDeck();
  const shuffledDeck = shuffleDeck(originalDeck);
  
  // create hands for player and dealer
  const playerHand = []
  const houseHand = []

  // deal out 2 cards to player and dealer
  dealCard(shuffledDeck, playerHand)
  dealCard(shuffledDeck, playerHand)
  dealCard(shuffledDeck, houseHand)
  dealCard(shuffledDeck, houseHand)
  let playerCount = determineValueOfHand(playerHand); 
  let houseCount = determineValueOfHand(houseHand);


  // these things will be displayed to user later
  let playerText = playerHandAndValueText(playerHand, playerCount);
  let houseText = houseHandAndValueText(houseHand, houseCount);
	
  // response is what the user will input when prompted later
  let response = 'hit';
  
  // this while loop runs during user's turn 
  while (response !== 'stay' && playerCount < 21) {
    let thingToShowUser = `${playerText}, ${houseText}, Do you want to hit or stay?`;

    // CHECK IF THIS WORKS IN REPL
    response = prompt(thingToShowUser);
  	
    // if user chooses to hit, then add card to hand and update count
 		if (response === 'hit') {
    	hitMe(shuffledDeck, playerHand);
      
      // updates playerCount
      playerCount = determineValueOfHand(playerHand);
      // shows the player what the updated hand is
      playerText = playerHandAndValueText(playerHand, playerCount);
      
  	}
    // checks if the player lost by seeing if the hand's count > 21
  }
  if (playerCount > 21) { // if player goes above 21, then game will stop to show loss
      //alert 'You Lose'
      alert('You lose');
  } else { // if player is under 21, then the dealer gets cards
  // while loop runs during dealer's turn while dealer's count < player's count or until dealer's count > 21
    while(determineValueOfHand(houseHand) < 17) {
      // changed the condition of the while loop to automatically calculate the houseCount. if the houseCount < 18, the while loop will run and deal a card to the house using the hitMe function. if the condition is false (the houseCount > 18), then we will exit the while loop, update the count for the house, update the hand for the house, and then run houseHandCheck to see who wins the game
      hitMe(shuffledDeck, houseHand);
	  }
    houseCount = determineValueOfHand(houseHand); 
    houseText = houseHandAndValueText(houseHand, houseCount);
    houseHandCheck(houseCount, playerCount, shuffledDeck, houseHand);
  
  }
  // after checking the conditions of the houseHandCheck, we will showcase the final hands for both player and house to the player
  houseText = finalHouseHand(houseHand);
  // display final hand
  alert(`Final outcome: ${playerText}, ${houseText}`);
  
}
startGame()