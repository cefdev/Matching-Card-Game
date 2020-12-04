/* Initial Variables */
let cardList = document.querySelectorAll(".card");
let movesElement = document.querySelector(".moves");
let starsElement = document.querySelector(".stars");
let winningPanel = document.querySelector(".winning-panel");
let restartBtn = document.querySelector(".restart");
let winPanelRestart = document.querySelector(".btn-play-again");
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
  if (openedCards.length < 2 && !this.classList.contains("open")) {
    this.classList.add("open");

    // Push the opened card into the openedCards array
    openedCards.push(this);

    // if openedCard length == 2:
    if (openedCards.length == 2) {
      // run checkMatch function after 0.7 seconds to let the user see the second clicked card icon clearly before it flip down
      setTimeout(checkMatch, 700);
    }
  }
}

// Check if the two opened cards are matched or not
function checkMatch() {
  // Distructure the openedCards array and assign each card in a variable
  let [firstCard, secondCard] = openedCards;

  // If the opened cards are matched, Apply "match" class to them
  if (firstCard.children[0].className == secondCard.children[0].className) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
  } else {
    // if opened cards are NOT matched, remove "open" class
    firstCard.classList.remove("open");
    secondCard.classList.remove("open");
  }

  // Collect remaining facedown cards
  let closedCards = document.querySelectorAll(".card:not(.match)");

  // Update the score panel
  updateScore();

  // If player Win
  if (closedCards.length == 0) {
    // Open winning panel
    openWinPanel();
    // Stop timer
    stopTimer();
  }
}

// Update the score and stars rating
function updateScore() {
  // Increase num of moves after flipping two cards up and display it in the UI
  numOfMoves += 1;
  movesElement.textContent = numOfMoves;

  // clear the openedCards array
  openedCards = [];

  // Check stars rating
  if (numOfMoves <= 14) {
    numOfStars = 3;
  } else if (numOfMoves > 14 && numOfMoves <= 20) {
    numOfStars = 2;
  } else if (numOfMoves > 20) {
    numOfStars = 1;
  }

  // Update stars rating UI
  if (numOfStars == 2) {
    starsElement.children[2].style.display = "none";
  } else if (numOfStars == 1) {
    starsElement.children[1].style.display = "none";
  }
}

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

// Display the winning panel
function openWinPanel() {
  let popupTime = document.querySelector(".winning-panel_timer");
  let popupStars = document.querySelector(".winning-panel_stars");

  // display the popup
  winningPanel.style.display = "block";

  // Display the score
  popupTime.textContent = `${minutes}:${seconds}`;

  if (numOfStars == 3) {
    popupStars.innerHTML =
      '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
  } else if (numOfStars == 2) {
    popupStars.innerHTML =
      '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
  } else if (numOfStars == 1) {
    popupStars.innerHTML = '<i class="fa fa-star"></i>';
  }

  // Change restart button color to green
  restartBtn.style.color = "green";

  // Play winning sound effect
  playSound();
}

// Logic to restart the game after winning or from the panel (Using Restart button)
restartBtn.addEventListener("click", init);
winPanelRestart.addEventListener("click", init);

// Run init function in the begining of the game
window.addEventListener("load", init);

// Winning sound effect functionality
function playSound() {
  const audio = document.querySelector(".audio");
  // Play the audio
  audio.play();
}
