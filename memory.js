var symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
var shuffledSymbols = [];
var flippedCards = [];
var matchedCards = [];
var gameBoard = document.getElementById("gameBoard");

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(symbol) {
  var card = document.createElement("div");
  card.className = "card";
  
  var symbolElement = document.createElement("div");
  symbolElement.className = "symbol";
  symbolElement.textContent = symbol;
  
  card.appendChild(symbolElement);
  
  card.addEventListener("click", function() {
    if (!flippedCards.includes(this) && !matchedCards.includes(this)) {
      this.classList.add("flip");
      flippedCards.push(this);
      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  });
  return card;
}

function startGame() {
  shuffledSymbols = shuffle(symbols);
  flippedCards = [];
  matchedCards = [];
  gameBoard.innerHTML = "";
  shuffledSymbols.forEach(function(symbol) {
    var card = createCard(symbol);
    gameBoard.appendChild(card);
  });
}

function checkMatch() {
  if (flippedCards[0].querySelector(".symbol").textContent === flippedCards[1].querySelector(".symbol").textContent) {
    flippedCards.forEach(function(card) {
      card.classList.remove("flip");
      card.classList.add("matched");
      matchedCards.push(card);
      // Remove click event listener from matched cards
      card.removeEventListener("click", cardClickHandler);
    });
    flippedCards = [];
    if (matchedCards.length === symbols.length) {
      alert("Congratulations! You've won the game!");
    }
  } else {
    flippedCards.forEach(function(card) {
      card.classList.remove("flip");
    });
    flippedCards = [];
  }
}

function cardClickHandler() {
  if (!flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.classList.add("flip");
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// Add click event listener to all cards
function addClickEventToCards() {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.addEventListener("click", cardClickHandler);
  });
}

// Start the game
startGame();
// Add click event listener to all cards
addClickEventToCards();
