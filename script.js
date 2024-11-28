const player1Track = document.getElementById("player1-track");
const player2Track = document.getElementById("player2-track");
const player1Icon = document.getElementById("player1-icon");
const player2Icon = document.getElementById("player2-icon");
const player1Label = document.getElementById("player1-label");
const player2Label = document.getElementById("player2-label");
const rollDiceBtn = document.getElementById("roll-dice");
const diceResult = document.getElementById("dice-result");
const winnerMessage = document.getElementById("winner-message");
const startGameBtn = document.getElementById("start-game");

let player1Position = 0;
let player2Position = 0;
const trackLength = 500; // Adjust based on your track width

// Start Game Setup
startGameBtn.addEventListener("click", () => {
  const player1Name = document.getElementById("player1-name").value || "Sakk";
  const player2Name = document.getElementById("player2-name").value || "Sal";

  const player1Image = document.getElementById("player1-image").files[0];
  const player2Image = document.getElementById("player2-image").files[0];

  player1Label.textContent = player1Name;
  player2Label.textContent = player2Name;

  if (player1Image) {
    const reader = new FileReader();
    reader.onload = (e) => (player1Icon.src = e.target.result);
    reader.readAsDataURL(player1Image);
  }

  if (player2Image) {
    const reader = new FileReader();
    reader.onload = (e) => (player2Icon.src = e.target.result);
    reader.readAsDataURL(player2Image);
  }

  resetGame();
});

// Roll Dice Functionality
rollDiceBtn.addEventListener("click", () => {
  const diceRoll = Math.ceil(Math.random() * 6); // Random dice roll (1-6)
  diceResult.textContent = `Dice: 🎲 ${diceRoll}`;

  // Alternate turns between players
  if (player1Position < trackLength && player2Position < trackLength) {
    if (player1Position <= player2Position) {
      player1Position += diceRoll * 10; // Move Player 1
      player1Icon.style.left = `${Math.min(player1Position, trackLength)}px`;
      checkWinner(player1Label.textContent, player1Position);
    } else {
      player2Position += diceRoll * 10; // Move Player 2
      player2Icon.style.left = `${Math.min(player2Position, trackLength)}px`;
      checkWinner(player2Label.textContent, player2Position);
    }
  }
});

// Check for Winner
// Check for Winner
function checkWinner(player, position) {
    if (position >= trackLength) {
      // Determine the winner and the loser
      let winner, loser, winnerMessageText;
  
      if (player === player1Label.textContent) {
        winner = player1Label.textContent;
        loser = player2Label.textContent;
  
        // Custom winner message for Player 1
        winnerMessageText = `${winner} Pel na ban Dosleng Vichea tv ???`;
      } else {
        winner = player2Label.textContent;
        loser = player1Label.textContent;
  
        // Custom winner message for Player 2
        winnerMessageText = `${winner} joub Vin hz jos pel na Sakk joub Vichea Dae?`;
      }
  
      // Display the winner message
      winnerMessage.textContent = winnerMessageText;
  
      // Disable the dice roll button once the game is over
      rollDiceBtn.disabled = true;
    }
  }
  
  


// Reset Game
function resetGame() {
  player1Position = 0;
  player2Position = 0;
  player1Icon.style.left = "0px";
  player2Icon.style.left = "0px";
  winnerMessage.textContent = "";
  rollDiceBtn.disabled = false;
}
