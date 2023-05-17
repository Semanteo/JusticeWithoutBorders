// DOM elements
var $cell = $(".cell");
var $playerX = $("#player-x");
var $playerO = $("#player-o");
var $infoBox = $("#info-box");
var $winBox = $("#win-box");
var $failBox = $("#fail-box");
var $drawBox = $("#draw-box");
var $resetButton = $(".reset-button");
var $resetButtonMain = $("#reset-button-main");

// game variables
var player;
var cellPositions;
var winner;
var chosenPlayer;

// resets everything to initial state
function reset() {
  hidePopup($winBox);
  hidePopup($failBox);
  hidePopup($drawBox);
  showPopup($infoBox);
  $resetButtonMain.fadeOut("fast");

  cellPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  winner = null;
  $cell.html("");
  chosenPlayer = null;
}

// choose player on info popup
function choosePlayer(e) {
  e.preventDefault();
  if (this.id === "player-x") {
    player = "X";
    chosenPlayer = "X";
  } else {
    player = "O";
    chosenPlayer = "O";
  }
  hidePopup($infoBox);
  $resetButtonMain.fadeIn("fast");
}

// places X or O on cell based on player
function placeHTML(cell) {
  if (player === "X") {
    $(cell).html('<p class="player-x">X</p>');
  } else {
    $(cell).html('<p class="player-o">O</p>');
  }
}

// show specific popup
function showPopup(popupBox) {
  popupBox.fadeIn("fast");
  popupBox.removeClass("hidden");
  $resetButtonMain.fadeOut("fast");
}

// hide specific popup
function hidePopup(popupBox) {
  popupBox.fadeOut("fast");
  popupBox.addClass("hidden");
}

// click handlers
$playerX.on("click", choosePlayer);
$playerO.on("click", choosePlayer);
$resetButton.on("click", reset);

//run through game process on click on cell
$cell.on("click", function() {
  cellNumber = $(this).data("cell");

  // disable cells if player has not been chosen yet
  if (!chosenPlayer) {
    return;
  }

  // check if cell is empty and there is no winner yet
  if (cellPositions[cellNumber] == "0" && !winner) {
    cellPositions[cellNumber] = player;
    placeHTML(this);
  } else {
    return;
  }

  // check for winner
  checkWinCondition();
  if (winner) {
    return;
  }

  // check if all cells are full for draw state
  if (checkCompletion()) {
    console.log("Damn, it's a draw. Try again");
    showPopup($drawBox);
    return;
  }

  // switch player, fill out a random cell after delay, and switch player again
  switchPlayer();
  setTimeout(function() {
    randomPlacement();
    switchPlayer();
  }, 1000);
});

// switch to oppositve player
function switchPlayer() {
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
}

// check if all cells are filled
function checkCompletion() {
  if (!cellPositions.includes(0)) {
    return true;
  } else {
    return false;
  }
}

// randomly place marker
function randomPlacement() {
  // doublecheck if not completed or no winner yet
  if (!checkCompletion() && !winner) {
    // do this while it's not complete yet
    while (!checkCompletion()) {
      var randomNum = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
      console.log(randomNum);
      // check if random cell is empty
      if (cellPositions[randomNum] == 0) {
        cellPositions[randomNum] = player;
        placeHTML($cell.eq(randomNum));
        checkWinCondition();
        return;
      }
    }
  } else {
    // return function because it's either full or there is a winner
    return;
  }
}

// check if 3 positions align
function checkWinCondition() {
  // vertical lines
  if (
    (cellPositions[0] === player &&
      cellPositions[3] === player &&
      cellPositions[6] === player) ||
    (cellPositions[1] === player &&
      cellPositions[4] === player &&
      cellPositions[7] === player) ||
    (cellPositions[2] === player &&
      cellPositions[5] === player &&
      cellPositions[8] === player) ||
    // // horizontal lines
    (cellPositions[0] === player &&
      cellPositions[1] === player &&
      cellPositions[2] === player) ||
    (cellPositions[3] === player &&
      cellPositions[4] === player &&
      cellPositions[5] === player) ||
    (cellPositions[6] === player &&
      cellPositions[7] === player &&
      cellPositions[8] === player) ||
    // // diagonal lines
    (cellPositions[0] === player &&
      cellPositions[4] === player &&
      cellPositions[8] === player) ||
    (cellPositions[2] === player &&
      cellPositions[4] === player &&
      cellPositions[6] === player)
  ) {
    winner = player;
    // scheck if winning position is chosen player or NPC and show win/fail popup
    if (winner === chosenPlayer) {
      showPopup($winBox);
    } else {
      showPopup($failBox);
    }
    return;
  }
}

// init
reset();
