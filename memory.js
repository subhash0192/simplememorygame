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
  card.textContent = symbol;
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
  if (flippedCards[0].textContent === flippedCards[1].textContent) {
    flippedCards.forEach(function(card) {
      card.classList.remove("flip");
      card.classList.add("matched");
      matchedCards.push(card);
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
