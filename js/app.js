/* Initial Variables */
let cardList = document.querySelectorAll(".card");
let movesElement = document.querySelector(".moves");
let starsElement = document.querySelector(".stars");
let winningPanel = document.querySelector(".winning-panel");
let restartBtn = document.querySelector(".restart");
let timer = document.querySelector(".timer");
let icons = [];
let openedCards = [];
let numOfMoves = 0;
let numOfStars = 3;
let seconds = 0;
let minutes = 0;
let timerhandler;

// Initial function (Collect cards icons, Flip cards down, Shuffle cards, Reset timer and score). Run in the begining of the game.
function init() {
  // Reset icons to empty array
  icons = [];

  // Display 3 stars
  starsElement.innerHTML =
    '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

  // Change Moves Panel value to 0
  numOfMoves = 0;
  movesElement.textContent = numOfMoves;

  // Reset timer
  seconds = 0;
  minutes = 0;
  timer.textContent = "00:00";

  // Change restart button color to white
  restartBtn.style.color = "white";

  // Hide winning Panel
  winningPanel.style.display = "none";

  // Display cards on the page
  cardList.forEach((card) => {
    // Face down all cards
    card.classList.remove("open");
    card.classList.remove("match");

    // Collect available icons names
    icons.push(card.children[0].className);

    // If card clicked
    card.addEventListener("click", cardClicked);
  });

  // Shuffle cards
  shuffleCards();
}

// Shuffle icons and assign them to each card
function shuffleCards() {
  // Shuffle the icons
  icons = icons.sort(() => Math.random() - 0.5);

  // Assign them to each card
  let i = 0;
  cardList.forEach((card) => {
    card.children[0].className = icons[i];
    i++;
  });
}

// Do some logic when a card is being clicked
function cardClicked() {
  // Start the timer
  startTimer();

  // Push the clicked card into the openedCards array if:
  if (openedCards.length < 2 && !this.classList.contains("show")) {
    this.classList.add("open");

    // Push the opened card into the openedCards array
    openedCards.push(this);

    // if openedCard length == 2:
    if (openedCards.length == 2) {
      // run checkMatch function after 0.7 seconds to let the user see the second clicked card icon clearly before it flip down
      // setTimeout(checkMatch, 700);
    }
  }
}

// checkMatch(): Check if the two opened cards are matched or not
// updateScore(): update the score, the stars rating

// Timer ON functionality
function startTimer() {
  if (!timerhandler) {
    timerhandler = setInterval(() => {
      seconds += 1;
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
      }

      seconds < 10
        ? (timer.innerHTML = `0${minutes}:0${seconds}`)
        : (timer.innerHTML = `0${minutes}:${seconds}`);
    }, 1000);
  }
}

// Timer OFF functionality
function stopTimer() {
  clearInterval(timerhandler);
}

// openWinPanel(): Display the winning panel
// Logic to restart the game after winning or from the panel (Using Restart button)

// Run init function in the begining of the game
window.addEventListener("load", init);
