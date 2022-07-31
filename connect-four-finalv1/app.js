// n.b. I apologize for an overabundance of comments but I am
// trying to leave myself breadcrumbs to return later to this
// as a personal project.

let cl = console.log;
let ct = console.table;
let cd = console.dir;

// DOM STUFF (body, audio, tables, divs, forms, inputs, etc.):

let body = document.querySelector("body");

let codeBtn = document.getElementById("code-link");
codeBtn.addEventListener("click", function () {
  window.location = "";
});

let redChipIcon = document.createElement("div");
redChipIcon.setAttribute("id", "red-chip");

let yellowChipIcon = document.createElement("div");
yellowChipIcon.setAttribute("id", "yellow-chip");

// AUDIO (including event listeners for the mute/unmute button):

let monkey = document.getElementById("monkey");
let plink1 = document.getElementById("plink1");
let plink2 = document.getElementById("plink2");
let buzzer = document.getElementById("buzzer");
let gameWinSound = document.getElementById("game-win-sound");
let tieSound = document.getElementById("tie-sound");

let muteBtn = document.getElementById("mute-btn");
let volumeBtn = document.getElementById("volume-btn");
muteBtn.style.display = "none";

muteBtn.addEventListener("click", function () {
  monkey.play();
  muteBtn.style.display = "none";
  muteBtn.replaceWith(volumeBtn);
  volumeBtn.style.display = "block";
});

volumeBtn.addEventListener("click", function () {
  monkey.pause();
  volumeBtn.style.display = "none";
  volumeBtn.replaceWith(muteBtn);
  muteBtn.style.display = "block";
});

// INPUT FORMS FOR THE PLAYERS' NAMES AND DOM RELATED TO
// THE PLAYERS' NAMES APPEARING:

let p1Name = document.getElementById("p1-name-label");
let p2Name = document.getElementById("p2-name-label");

let p1NameInput = document.getElementById("player-1-name");
p1NameInput.focus();
let p2NameInput = document.getElementById("player-2-name");

let p1SubmitBtn = document.getElementById("submit-p1-btn");
let p2SubmitBtn = document.getElementById("submit-p2-btn");

let newNameWrapper = document.getElementById("new-name-wrapper");
let p1Active = document.getElementById("p1-active");
let p2Active = document.getElementById("p2-active");

let playersHeader = document.getElementById("player-names-tag");

let infoWrapper = document.getElementById("info-name-wrapper");

// Conditional variables for the game to begin:
let p1Submission = false;
let p2Submission = false;
let npc = false;
let beginCondition = false;

//=====================================================/

// NAME SUBMISSION FUNCTIONS:
// Here is where we validate that the inputs aren't empty before
// the user attempts to submit a name. We also make this submission
// the name we reference for the rest of the game:
function p1NameSubmit() {
  if (p1NameInput.value === "") {
    Swal.fire({
      title: "You must enter a name before submitting :)",
      confirmButtonText: "OK",
      confirmButtonColor: "#1d63f3",
    });
    buzzer.play();
  } else {
    if ((p1Name.style.display = "none")) {
      p1Name.style.display = "contents";
    }
    p1NameInput.style.display = "none";
    p1SubmitBtn.style.display = "none";
    p1Name.textContent = p1NameInput.value + " ";
    p1Name.style.fontSize = "24px";
    p1Submission = true;
    plink1.play();
    deleteNpcBtn();
  }
}

p1SubmitBtn.addEventListener("click", function () {
  p1NameSubmit();
});

function p2NameSubmit() {
  if (p2NameInput.value === "") {
    Swal.fire({
      title: "You must enter a name before submitting :)",
      confirmButtonText: "OK",
      confirmButtonColor: "#1d63f3",
    });
    buzzer.play();
  } else {
    if ((p2Name.style.display = "none")) {
      p2Name.style.display = "contents";
    }
    p2NameInput.style.display = "none";
    p2SubmitBtn.style.display = "none";
    p2Name.textContent = p2NameInput.value + " ";
    p2Name.style.fontSize = "24px";
    p2Name.style.marginTop = "10px";
    p2Submission = true;
    plink2.play();
    deleteNpcBtn();
  }
}

p2SubmitBtn.addEventListener("click", function () {
  p2NameSubmit();
});

//----------------------------------------------------//

// NPC INITIALIZATION:
// Here we have the button which lets the game logic
// know that we are playing the game with the NPC:

let noP2Btn = document.getElementById("no-p2");

noP2Btn.addEventListener("click", npcBtnClick);

function npcBtnClick() {
  if ((p2Name.style.display = "none")) {
    p2Name.style.display = "contents";
  }
  p2NameInput.style.display = "none";
  p2SubmitBtn.style.display = "none";
  noP2Btn.style.display = "none";
  p2Name.textContent = "Dr. Lorem Ipsum ";
  p2Name.style.fontSize = "24px";
  p2Name.style.marginTop = "10px";
  plink2.play();
  npc = true;
}

// We want to get rid of the NPC button once it's been clicked:
function deleteNpcBtn() {
  if (p1Submission && p2Submission) {
    noP2Btn.style.display = "none";
  }
}

//----------------------------------------------------//

// The code below was a QA shortcut that is left in
// so that I can return to this project in the future:

let testBtn = document.getElementById("test-btn");
testBtn.style.display = "none";

//----------------------------------------------------//

// AI TESTING QA EASE OF ACCESS:
// this code was another QA shortcut for testing the
// AI, and will revisit at a later date:

let aiTestBtn = document.getElementById("ai-testing");
aiTestBtn.style.display = "none";

//----------------------------------------------------//

// Here is where the magic really begins; the boring
// UI/UX stuff is out of the way...

// Random number between 1-10 decides who moves first
// for fairness. 0-5 means player 1 moves first, 6-10
// means player 2 moves first:
let turnRng = Math.floor(Math.random() * 10 + 1);

// Grabbing some more DOM elements for manipulation shortly:
let gameBoard = document.getElementById("game-board");

let beginGameBtn = document.getElementById("begin-game");

let gameInfoP = document.getElementById("player-order-text");

// Track whose turn it is (RNG will determine which var becomes true):
let p1Turn = false;
let p2Turn = false;

// FUNCTION THAT FINALIZES SUBMISSION RELATED INPUT
// AND PUTS US INTO THE ACTUAL GAME LOGIC:

function beginGame() {
  // We check to see if we are playing with the NPC or not:
  if (!npc) {
    if (p1Submission && p2Submission) {
      beginCondition = true;
      noP2Btn.style.display = "none";
      gameInfoP.textContent =
        "The player order has been determined. Your chip color appears next to your name when it is your turn.";
    }
    // If the begin condition is met, RNG will determine who moves first:
    if (beginCondition) {
      if (turnRng <= 5) {
        p1Turn = true;
      } else if (turnRng >= 6) {
        p2Turn = true;
      }

      // We are starting the game so we get rid of these elements:
      beginGameBtn.style.display = "none";
      testBtn.style.display = "none";

      // Here we begin the local two player game:
      refreshBoard();
      tableClick();
    } else {
      // Some condition for beginning play has not been met:
      buzzer.play();
      Swal.fire({
        title: "You must enter your names before starting the game :)",
        confirmButtonText: "OK",
        confirmButtonColor: "#1d63f3",
      });
      cl("the conditions for beginning the game have not been met");
    }
  } else if (p1Submission && npc === true) {
    // We've checked for the player's name submission and NPC status
    // We define a function that validates it and shoots us into the game:
    function beginWithNpc() {
      npc = true;
      beginCondition = true;
      if (npc && beginCondition) {
        p1NameInput.value;
        p1NameSubmit();
        p2NameInput.value = "Dr. Lorem Ipsum ";
        p2NameSubmit();

        infoWrapper.style.display = "none";

        // We've given the NPC his name and will roll who goes first:
        if (turnRng <= 5) {
          p1Turn = true;
          cl("turn rng decides " + p1NameInput.value + " moves first");
        } else if (turnRng >= 6) {
          p2Turn = true;
          cl("turn rng decides " + p2NameInput.value + "(NPC) moves first");
        }

        // We call the function that contains all the logic
        // for player vs. NPC:
        playerVsNpc();
      }
    }
    // Calling the function that starts the NPC vs player game:
    beginWithNpc();
  } else if (!p1Submission && npc === true) {
    // The user has opted to play with the NPC but hasn't entered
    // and submitted their own name:
    buzzer.play();
    Swal.fire({
      title: "You must enter your name before starting the game :)",
      confirmButtonText: "OK",
      confirmButtonColor: "#1d63f3",
    });
    cl("the conditions for beginning the game have not been met");
  }
}

// Give the button an event listener that interprets all the
// game start conditions and begins the game:
beginGameBtn.addEventListener("click", beginGame);

//----------------------------------------------------//

/*  ||==========================================================||
    ||                                                          ||
    ||   EVERYTHING THAT DEALS WITH THE GAME LOGIC IS BELOW     ||
    ||                                                          ||
    ||==========================================================||
*/ //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// Below is the 2D array which will become representative of the
// status of the board as the game progresses:
let gameState = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

let container = document.getElementById("game-board");
let table = document.getElementById("game-table");

// This function basically displays the status of the
// board as it is interacted with and play progresses:
function refreshBoard() {
  let npcTurn = false;

  // Pause the intro theme when the game begins and
  //manipulate some elements as the game is now in play:
  if (beginGameBtn.style.display === "none") {
    gameBoard.style.display = "table";
    infoWrapper.style.display = "none";
    redChipIcon.style.display = "inline-block";
    yellowChipIcon.style.display = "inline-block";
    newNameWrapper.style.display = "block";
    p1Name.setAttribute("class", "new-name-p1");
    p2Name.setAttribute("class", "new-name-p2");
    p1Name.style.fontSize = "40px";
    p2Name.style.fontSize = "40px";
    p1Active.appendChild(p1Name);
    p2Active.append(p2Name);
  }

  // Update the div that represents whose turn it
  // is based on truthiness of their turn variable:
  if (p1Turn && npc === false) {
    p1Name.appendChild(redChipIcon);
    p2Name.textContent = p2Name.textContent;
  } else if (p2Turn && npc === false) {
    p2Name.appendChild(yellowChipIcon);
    p1Name.textContent = p1Name.textContent;
  }

  // Create/clear the game board:
  table.textContent = "";
  for (let i = 0; i < gameState.length; i++) {
    let rowElement = document.createElement("tr");
    rowElement.setAttribute("class", "row-element");
    table.appendChild(rowElement);

    for (let j = 0; j < gameState[0].length; j++) {
      table.style.cursor = "grabbing";
      let hole = document.createElement("td");
      hole.setAttribute("class", "hole");
      rowElement.appendChild(hole);

      // Here we define exactly what a red or yellow hole is:
      let occupiedHoleRed = gameState[i][j].includes("red");
      let occupiedHoleYellow = gameState[i][j].includes("yellow");

      // Here we have a hover animation over the holes as the
      // player decides where to place a chip. We also play
      // the chip drop sound here:
      if (!occupiedHoleRed && !occupiedHoleYellow) {
        if (p1Turn || npcTurn) {
          hole.addEventListener("mouseenter", (event) => {
            hole.style.backgroundColor = "#e75959";
            hole.addEventListener("mouseleave", (event) => {
              hole.style.backgroundColor = "#ffffff";
            });
          });
          if (beginGameBtn.style.display === "none") {
            plink1.play();
          }
        }
        if (p2Turn && npc === false) {
          hole.addEventListener("mouseenter", (event) => {
            hole.style.backgroundColor = "#ffff80";
            hole.addEventListener("mouseleave", (event) => {
              hole.style.backgroundColor = "#ffffff";
            });
          });
          if (beginGameBtn.style.display === "none") {
            plink2.play();
          }
        }
      }

      // Here is where the hole actually has its
      // color changed to red or yellow:
      if (occupiedHoleRed) {
        hole.style.backgroundColor = "#f02424";
      }

      if (occupiedHoleYellow) {
        hole.style.backgroundColor = "#ffff40";
      }

      hole.dataset.row = i;
      hole.dataset.column = j;
    }
  }
}

//----------------------------------------------------//

// Here is the function that is called upon clicking a hole
// on the table. It's logic decides where the chip will
// ultimately end up based on the users' clicks:
function tableClick() {
  table.addEventListener("click", function (event) {
    // Here we define the precise hole click as a target:
    let target = event.target;
    let column = event.target.dataset.column;
    let row = event.target.dataset.row;
    let targetRowCol = gameState[row][column];

    // Here we force the chip to the lowest available
    // row on the column selected by the user:
    for (let i = gameState.length - 1; i >= 0; i--) {
      // Here the chip is forced to land on the row not
      // occupied (or the lowest row on the table):
      if (!gameState[i][column]) {
        row = i;
        break;
      }
    }

    // Here we refuse the player to place a chip in a hole
    // that already has a chip in it (or not above the top row(0)):
    if (targetRowCol) {
      cl("user attempting to place chip in occupied hole");
      Swal.fire({
        title: "You can only place a chip in an empty hole.",
        allowOutsideClick: false,
        confirmButtonText: "Ok",
        cancelButtonText: "Another game",
        allowEscapeKey: false,
      });
      buzzer.play();
      return;
    }

    // Place chip (string representative of color that will be
    // applied in the refreshBoard() function) and swap turns:
    if (p1Turn) {
      gameState[row][column] = "red";
      // cl(gameState[row][column]);
      checkWinCon();
      swapTurns();
    } else if (p2Turn) {
      gameState[row][column] = "yellow";
      checkWinCon();
      swapTurns();
    } else {
      cl("not a valid move");
    }

    function swapTurns() {
      p1Turn = !p1Turn;
      p2Turn = !p2Turn;
    }

    // Here we check the status of the board and compare
    // it to various win conditions:
    function checkWinCon() {
      let win = false;

      // Win by row (we check the columns adjacent to the chip):
      function winByRow() {
        for (let i = 0; i < row + 1; i++) {
          for (let j = 0; j < column + 1; j++) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i][j + 1] &&
              gameState[i][j] === gameState[i][j + 2] &&
              gameState[i][j] === gameState[i][j + 3]
            ) {
              cl(gameState[i][j + 3] + " has won by row");
              win = true;
              winCon();
              return;
            }
          }
        }
      }

      // Win by column (we check the rows adjacent to the chip):
      function winByColumn() {
        for (let j = 0; j <= 6; j++) {
          for (let i = 0; i < 3; i++) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i + 1][j] &&
              gameState[i + 1][j] === gameState[i + 2][j] &&
              gameState[i + 2][j] === gameState[i + 3][j]
            ) {
              cl(gameState[i + 3][j] + " has won by column");
              win = true;
              winCon();
              return;
            }
          }
        }
      }

      // Win by diagonal (descending from left to right we check
      // in the shape of a staircase):
      function winByDiagonal1() {
        for (let j = 0; j <= 4; j++) {
          for (let i = 0; i <= 2; i++) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i + 1][j + 1] &&
              gameState[i + 1][j + 1] === gameState[i + 2][j + 2] &&
              gameState[i + 2][j + 2] === gameState[i + 3][j + 3]
            ) {
              cl(
                gameState[i + 3][j + 3] +
                  " has won by diagonal ONE (descending left to right \\)"
              );
              win = true;
              winCon();
              return;
            }
          }
        }
      }

      // Win by diagonal (ascending from left to right we check
      // in the shape of a staircase):
      function winByDiagonal2() {
        for (let j = 6; j >= 0; j--) {
          for (let i = 5; i >= 3; i--) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i - 1][j + 1] &&
              gameState[i - 1][j + 1] === gameState[i - 2][j + 2] &&
              gameState[i - 2][j + 2] === gameState[i - 3][j + 3]
            ) {
              cl(
                gameState[i - 3][j + 3] +
                  " has won by diagonal TWO (ascending left to right /)"
              );
              win = true;
              winCon();
              return;
            }
          }
        }
      }

      // Tie condition (here we check the entirety of the top row for
      // chips and confirm that there has not been a win condtion yet):
      if (
        gameState[0][0] !== "" &&
        gameState[0][1] !== "" &&
        gameState[0][2] !== "" &&
        gameState[0][3] !== "" &&
        gameState[0][4] !== "" &&
        gameState[0][5] !== "" &&
        gameState[0][6] !== "" &&
        win === false
      ) {
        p1Turn = false;
        p2Turn = false;
        cl("tie - no winner");
        tieSound.play();

        // This alert tells the player the tie condition and lets
        // them start a new game:
        setTimeout(function () {
          Swal.fire({
            text: "There is no winner :| Why not try again?",
            allowOutsideClick: false,
            confirmButtonText: "Play again?",
            confirmButtonColor: "#1d63f3",
            cancelButtonText: "Another game",
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              plink1.play();
              Swal.fire(location.reload());
            }
          });
        }, 100);
        return;
      }

      // Call the validation functions:
      winByRow();
      winByColumn();
      winByDiagonal1();
      winByDiagonal2();
    }

    // The winCon() function manipulates relevant DOM elements and
    // lets the players know who won, and lets them begin a new game
    // This is all based on what our validation functions give us:
    function winCon() {
      plink1.pause();
      plink2.pause();
      gameWinSound.play();

      newNameWrapper.textContent = "GAME OVER";
      newNameWrapper.style.fontSize = "70px";
      newNameWrapper.style.fontFamily = "'Press Start 2P', sans-serif";
      newNameWrapper.style.paddingTop = "25px";
      newNameWrapper.style.paddingBottom = "25px";

      // Check for red chip based on winning move:
      if (gameState[row][column] === "red") {
        setTimeout(function () {
          Swal.fire({
            title: p1Name.innerText + " has won!",
            text: "(that's gotta hurt for " + p2Name.innerText + ")...",
            allowOutsideClick: false,
            confirmButtonText: "Play again?",
            cancelButtonText: "Another game",
            allowEscapeKey: false,
            background: "#0451eb",
            color: "#fff",
            confirmButtonColor: "#e75959",
          }).then((result) => {
            if (result.isConfirmed) {
              monkey.pause();
              Swal.fire(location.reload());
            }
          });
        }, 100);

        cl("winCon(): Player 1 (red) has won!");
      }

      // Check for yellow chip based on winning move:
      if (gameState[row][column] === "yellow") {
        setTimeout(function () {
          Swal.fire({
            title: p2Name.innerText + " has won!",
            text: "(that's gotta hurt for " + p1Name.innerText + ")...",
            allowOutsideClick: false,
            confirmButtonText: "Play again?",
            cancelButtonText: "Another game",
            allowEscapeKey: false,
            background: "#0451eb",
            color: "#fff",
            confirmButtonColor: "#e75959",
          }).then((result) => {
            if (result.isConfirmed) {
              monkey.pause();
              Swal.fire(location.reload());
            }
          });
        }, 100);

        cl("winCon(): Player 2 (yellow) has won!");
      }
    }

    // Refresh the board:
    refreshBoard();
  });
}

/*  ||==========================================================||
    ||                                                          ||
    ||   EVERYTHING BELOW DEALS WITH NPC VS PLAYER LOGIC        ||
    ||                                                          ||
    ||==========================================================||
*/ //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

function playerVsNpc() {
  // Determine if it is the NPC's turn:
  let npcTurn;
  // When npcKill becomes true it prevents the NPC from
  // continuing to search for moves after the game is over:
  let npcKill = false;

  // Here we link p2Turn from the submissions to the NPC's turn:
  if (p2Turn === true) {
    npcTurn = true;
    cl("NPC moves first");
  } else {
    npcTurn = false;
    cl("player moves first");
  }

  // Here we begin counting turns:
  let turn = 0;
  cl("the current turn is: " + turn);

  // Here we display the game board and the chips,
  // which will be alternating display based on whose
  // turn it is:
  gameBoard.style.display = "table";
  redChipIcon.style.display = "inline-block";
  yellowChipIcon.style.display = "inline-block";

  // Here we manipulate the name display board and
  // connect the turn chips with the player's name:
  newNameWrapper.style.display = "block";
  newNameWrapper.style.justifyContent = "center";
  newNameWrapper.style.alignItems = "center";

  p1Name.setAttribute("class", "new-name-p1");
  p2Name.setAttribute("class", "new-name-p2");
  p1Name.style.fontSize = "40px";
  p2Name.style.fontSize = "40px";

  p1Active.appendChild(p1Name);
  p2Active.append(p2Name);

  p1Name.appendChild(redChipIcon);
  p2Name.appendChild(yellowChipIcon);
  redChipIcon.style.display = "none";
  yellowChipIcon.style.display = "none";

  // If player 1 is chosen to go first their chip will display first:
  if (turn === 0 && p1Turn) {
    redChipIcon.style.display = "inline-block";
    cl(redChipIcon.style.display);
  }

  // Create/clear the game board (very similar to local play above):
  table.textContent = "";
  for (let i = 0; i < gameState.length; i++) {
    let rowElement = document.createElement("tr");
    rowElement.setAttribute("class", "row-element");
    table.appendChild(rowElement);

    for (let j = 0; j < gameState[0].length; j++) {
      table.style.cursor = "grabbing";
      let hole = document.createElement("td");
      hole.setAttribute("class", "hole");
      rowElement.appendChild(hole);

      let occupiedHoleRed = gameState[i][j].includes("red");
      let occupiedHoleYellow = gameState[i][j].includes("yellow");

      if (!occupiedHoleRed && !occupiedHoleYellow) {
        if ((p1Turn || npcTurn) && npc === true) {
          hole.addEventListener("mouseenter", (event) => {
            hole.style.backgroundColor = "#e75959";
            hole.addEventListener("mouseleave", (event) => {
              hole.style.backgroundColor = "#ffffff";
            });
          });
        }
      }

      if (occupiedHoleRed) {
        hole.style.backgroundColor = "#f02424";
      }

      if (occupiedHoleYellow) {
        hole.style.backgroundColor = "#ffff40";
      }

      hole.dataset.row = i;
      hole.dataset.column = j;
    }
  }

  table.addEventListener("click", selectCell);

  // If the NPC is chosen to go first, they will
  // click the last column of the last row, but their
  // chip can end up on any column randomly based
  // on the AI logic:
  if (npcTurn && turn === 0) {
    let npcFirstClick = table.lastChild.lastChild;
    npcFirstClick.click();
  }

  // This defines a pop-up for a tie condition:
  function tiePopUp() {
    setTimeout(function () {
      Swal.fire({
        title: "Tie - there is no winner :|",
        allowOutsideClick: false,
        confirmButtonText: "Play again?",
        confirmButtonColor: "#1d63f3",
        cancelButtonText: "Another game",
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          plink1.play();
          Swal.fire(location.reload());
        }
      });
    }, 100);
    return;
  }

  // This function includes logic for both the player's turn
  // and the logic for the NPC's turn (many aspects of this
  // function are similar to local play):
  function selectCell(event) {
    let target = event.target;
    let column = event.target.dataset.column;
    let row = event.target.dataset.row;
    let targetRowCol = gameState[row][column];

    // Prevention from putting a chip in a hole that is already taken:
    if (targetRowCol) {
      cl("user attempting to place chip in occupied hole");
      Swal.fire({
        title: "You can only place a chip in an empty hole.",
        allowOutsideClick: false,
        confirmButtonText: "Ok",
        cancelButtonText: "Another game",
        allowEscapeKey: false,
      });
      buzzer.play();
      return;
    }

    // Function for NPC randomly placing chip:
    function npcMove() {
      // NPC RNG STUFF:
      let rngCol = Math.floor(Math.random() * 7);
      let chipPlaced = false;
      let col = rngCol;

      //-----------------------------------------------------------//
      //                  NPC LOGIC EXPLANATION:                   //
      // ----------------------------------------------------------//
      // The NPC turn basically chooses a column at random and     //
      // attempts to place the chip there. If the hole is invalid  //
      // it will search up the row until it finds an empty hole.   //
      // If it does not find an empty hole on it's random column,  //
      // it will re-roll another random column until it hits one   //
      // that has a valid hole. The console.logs pretty much log   //
      // the AI thought process as it searches for a valid hole:   //
      //-----------------------------------------------------------//

      while (chipPlaced === false) {
        for (let i = gameState.length - 1; i >= 0; i--) {
          row = i;

          if (gameState[row][col] === "") {
            cl(
              "npc attempting to place chip at row: " +
                row +
                " | column: " +
                col
            );

            // The AI has found an empty hole and is placing
            // its chip there:
            gameState[row][col] = "yellow";
            checkWinCon();

            if ((gameState[row][col] = "yellow")) {
              cl(
                "npc successfully placed chip at row: " +
                  row +
                  " | column: " +
                  col
              );
              cl("END OF NPC RANDOM MOVE");
              chipPlaced = true;
              turn++;
              break;
            }
          } else if (gameState[row][col] !== "" && row > 0) {
            cl(
              "ALERT!!! npc detects target of: row: " +
                row +
                " | column: " +
                col +
                " is occupied"
            );
            cl("searching above holes...");

            // Deincrement the row:
            row--;
          } else if (row === 0 && gameState[row][col] !== "") {
            cl(
              "ALERT!!! npc has detected the entire target column: " +
                col +
                " is full"
            );
            cl("npc is re-rolling a new column index...");

            // Re-roll a column number until it hits a column
            // with a valid hole:
            col = Math.floor(Math.random() * 7);
            cl("npc rolled a new column index of: " + col);
          }
          if (chipPlaced) {
            turn++;
            checkWinCon();
            swapTurns();
            break;
          }
        }
      }
    }
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ END OF NPC RANDOM ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    // Here, like in local play, we force the chip to the lowest
    // available row:
    if (p1Turn) {
      for (let i = gameState.length - 1; i >= 0; i--) {
        if (!gameState[i][column]) {
          row = i;
          gameState[row][column] = "red";
          cl("PLAYER placed chip at: row " + row + " | column " + column);
          break;
        }
      }

      plink1.play();
      checkWinCon();
      turn++;

      // We check that the game is still in play and proceed to
      // allow the NPC to make a move:
      if (!npcKill) {
        // Prevent clicks from player while NPC makes its move
        // and manipulate DOM elements to show it's the NPC's turn:
        table.style.pointerEvents = "none";
        gameBoard.style.cursor = "wait";
        yellowChipIcon.style.display = "inline-block";
        redChipIcon.style.display = "none";

        // Prevent AI from searching for an open slot
        // when there is only 1 left & player made the last turn:
        if (turn <= 41) {
          // The NPC thought timer is designed to choose a random
          // interval from .3s to .7s to appear as though it's
          // thinking, without it taking long enough to frustrate
          // the user:
          let npcThoughtTimer = Math.floor(
            Math.random() * (700 - 300 + 1) + 300
          );

          // Here we apply the "thought timer" and call the
          // NPC move logic functions:
          setTimeout(() => {
            plink2.play();
            npcMove();
            refreshBoard();
            checkWinCon();

            // Give back ability for player to click:
            table.style.pointerEvents = "auto";
            gameBoard.style.cursor = "grabing";
            yellowChipIcon.style.display = "none";
            redChipIcon.style.display = "inline-block";
          }, npcThoughtTimer);
        }
      }
    } else if (npcTurn && turn === 0) {
      redChipIcon.style.display = "none";
      // Here if NPC moves first we quickly set the yellow chip icon
      // next to NPC's name and then swap it to the player for
      // a realistic play effect:
      setTimeout(() => {
        yellowChipIcon.style.display = "inline-block";
        setTimeout(() => {
          yellowChipIcon.style.display = "none";
          redChipIcon.style.display = "inline-block";
        }, 150);
      }, 200);

      npcMove();
      swapTurns();
      turn++;
      plink2.play();
      npcTurn = false;
    } else {
      cl("not a valid move");
    }

    function swapTurns() {
      p1Turn = !p1Turn;
      npcTurn = !npcTurn;
    }

    // Our win condition validators work nearly identically to
    // the local play ones:
    function checkWinCon() {
      let redWin = false;
      let yellowWin = false;
      let byRow = false;
      let byCol = false;
      let byDiag1 = false;
      let byDiag2 = false;

      // Win by row:
      function winByRow() {
        for (let i = 0; i <= 5; i++) {
          for (let j = 0; j <= 6; j++) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i][j + 1] &&
              gameState[i][j] === gameState[i][j + 2] &&
              gameState[i][j] === gameState[i][j + 3]
            ) {
              cl(gameState[i][j + 3] + " has won by row");
              if (gameState[i][j + 3] === "red") {
                redWin = true;
              } else {
                yellowWin = true;
              }
              win = true;
              byRow = true;
              winCon();
              return;
            }
          }
        }
      }

      // Win by column:
      function winByColumn() {
        for (let j = 0; j <= 6; j++) {
          for (let i = 0; i < 3; i++) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i + 1][j] &&
              gameState[i + 1][j] === gameState[i + 2][j] &&
              gameState[i + 2][j] === gameState[i + 3][j]
            ) {
              cl(gameState[i + 3][j] + " has won by column");
              if (gameState[i + 3][j] === "red") {
                redWin = true;
              } else {
                yellowWin = true;
              }
              win = true;
              byCol = true;
              winCon();
              return;
            }
          }
        }
      }

      // Win by diagonal (descending from left to right):
      function winByDiagonal1() {
        for (let j = 0; j <= 4; j++) {
          for (let i = 0; i <= 2; i++) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i + 1][j + 1] &&
              gameState[i + 1][j + 1] === gameState[i + 2][j + 2] &&
              gameState[i + 2][j + 2] === gameState[i + 3][j + 3]
            ) {
              cl(
                gameState[i + 3][j + 3] +
                  " has won by diagonal ONE (descending left to right \\)"
              );
              if (gameState[i + 3][j + 3] === "red") {
                redWin = true;
              } else {
                yellowWin = true;
              }
              win = true;
              byDiag1 = true;
              winCon();
              return;
            }
          }
        }
      }

      // Win by diagonal (ascending from left to right):
      function winByDiagonal2() {
        for (let j = 6; j >= 0; j--) {
          for (let i = 5; i >= 3; i--) {
            if (
              gameState[i][j] !== "" &&
              gameState[i][j] &&
              gameState[i][j] === gameState[i - 1][j + 1] &&
              gameState[i - 1][j + 1] === gameState[i - 2][j + 2] &&
              gameState[i - 2][j + 2] === gameState[i - 3][j + 3]
            ) {
              cl(
                gameState[i - 3][j + 3] +
                  " has won by diagonal TWO (ascending left to right /)"
              );
              if (gameState[i - 3][j + 3] === "red") {
                redWin = true;
              } else {
                yellowWin = true;
              }
              win = true;
              byDiag2 = true;
              winCon();
              return;
            }
          }
        }
      }

      // Tie condition:
      if (
        gameState[0][0] !== "" &&
        gameState[0][1] !== "" &&
        gameState[0][2] !== "" &&
        gameState[0][3] !== "" &&
        gameState[0][4] !== "" &&
        gameState[0][5] !== "" &&
        gameState[0][6] !== "" &&
        win === false
      ) {
        cl("tie - no winner");
        tieSound.play();
        // If tie condition, we call the tie pop-up we made earlier:
        tiePopUp();
      }

      // Call the validation functions:
      winByRow();
      winByColumn();
      winByDiagonal1();
      winByDiagonal2();

      function winCon() {
        npcKill = true;
        plink1.pause();
        plink2.pause();
        gameWinSound.play();

        // Here we manipulate DOM elements to replace the names
        // with a game over message:
        newNameWrapper.textContent = "GAME OVER";
        newNameWrapper.style.fontSize = "70px";
        newNameWrapper.style.fontFamily = "'Press Start 2P', sans-serif";
        newNameWrapper.style.paddingTop = "25px";
        newNameWrapper.style.paddingBottom = "25px";

        // Check for red chip based on winning move:
        if (redWin) {
          setTimeout(function () {
            Swal.fire({
              title: p1Name.innerText + " has won!",
              text: "Luckily Dr. Lorem Ipsum doesn't have feelings, yet...",
              allowOutsideClick: false,
              confirmButtonText: "Play again?",
              cancelButtonText: "Another game",
              allowEscapeKey: false,
              background: "#0451eb",
              color: "#fff",
              confirmButtonColor: "#e75959",
            }).then((result) => {
              if (result.isConfirmed) {
                monkey.pause();
                Swal.fire(location.reload());
              }
            });
          }, 100);

          cl("winCon(): Player 1 (red) has won!");
        }

        //Check for the yellow chip based on winning move:
        if (yellowWin) {
          debugger;
          setTimeout(function () {
            Swal.fire({
              title: p2Name.innerText + " has won!",
              text:
                "I won't tell anyone " +
                p1Name.innerText +
                " lost to a computer...",
              allowOutsideClick: false,
              confirmButtonText: "Play again?",
              cancelButtonText: "Another game",
              allowEscapeKey: false,
              background: "#0451eb",
              color: "#fff",
              confirmButtonColor: "#e75959",
            }).then((result) => {
              if (result.isConfirmed) {
                monkey.pause();
                Swal.fire(location.reload());
              }
            });
          }, 100);

          cl("winCon(): Player 2 (yellow) has won!");
        }
      }
    }

    // Refresh the board:
    refreshBoard();
  }
}

//----------------------------------------------------//

// Congrats you reached the end of some over-engineered code.
// But it works!
