// var userChoice = " ";
// var buttons = document.getElementsByClassName("choice-button");
// var computerArray = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
// var userThrow = document.getElementById("user-choice");
// var computerThrow = document.getElementById("computer-choice");
// var winner = document.getElementById("winner");
// var totalWins = document.getElementById("total-wins");
// var wins = localStorage.getItem("wins") || 1;

// for (var i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", function () {
//     userChoice = this.textContent;
//     var computerRandom = Math.floor(Math.random() * 5);
//     var computerChoice = computerArray[computerRandom];

//     function determineWinner() {
//       if (userChoice === computerChoice) {
//         return "It's a tie";
//       } else if (
//         (userChoice === "Rock" &&
//           (computerChoice === "Scissors" || computerChoice === "Lizard")) ||
//         (userChoice === "Paper" &&
//           (computerChoice === "Spock" || computerChoice === "Rock")) ||
//         (userChoice === "Scissors" &&
//           (computerChoice === "Lizard" || computerChoice === "Paper")) ||
//         (userChoice === "Lizard" &&
//           (computerChoice === "Paper" || computerChoice === "Spock")) ||
//         (userChoice === "Spock" &&
//           (computerChoice === "Scissors" || computerChoice === "Rock"))
//       ) {
//         return "You Win!";
//       } else {
//         return "You lose!";
//       }

//       // Additional logic to determine the winner
//     }

//     var result = determineWinner();

//     userThrow.textContent = "You threw: " + userChoice;
//     computerThrow.textContent = "Computer threw: " + computerChoice;

//     if (result === "You Win!") {
//       winner.textContent = "You win!";
//       localStorage.setItem("wins", wins);
//       totalWins.textContent =
//         "Your current streak: " + localStorage.getItem("wins", wins);
//       wins++;
//     } else if (result === "You lose!") {
//       winner.textContent = "You lose!";
//     } else {
//       winner.textContent = "It's a tie!";
//     }
//   });
// }
