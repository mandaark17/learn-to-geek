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
var fetchButton = document.querySelector('.search-button');
var searchEL = document.querySelector('.search-input')
var youtubeResult = document.querySelector('.video-placeholder')

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var textInput = searchEL.value
  console.log(textInput)
  var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=50&q=' + textInput + '&type=video&key=AIzaSyDaxJmlfru9owz0k1A_8YWMKKKMV6c_b1U';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for( var i = 0; i < 10; i++){
        var ulEL = document.createElement ('ul')
        var titleEL = document.createElement ('li')
        var linkEL = document.createElement ('a')
        titleEL.textContent = data.items[i].snippet.title
        linkEL.href = "https://www.youtube.com/watch?v=" + data.items[i].id.videoId
        linkEL.textContent = "https://www.youtube.com/watch?v=" + data.items[i].id.videoId
        console.log(linkEL)
        youtubeResult.appendChild(ulEL)
        ulEL.appendChild(titleEL)
        ulEL.appendChild(linkEL)
      }
      // //Loop over the data to generate a table, each table row will have a link to the repo url
      // for (var i = 0; i < data.length; i++) {
      //   // Creating elements, tablerow, tabledata, and anchor
      //   var createTableRow = document.createElement('tr');
      //   var tableData = document.createElement('td');
      //   var link = document.createElement('a');

      //   // Setting the text of link and the href of the link
      //   link.textContent = data[i].html_url;
      //   link.href = data[i].html_url;

      //   // Appending the link to the tabledata and then appending the tabledata to the tablerow
      //   // The tablerow then gets appended to the tablebody
      //   tableData.appendChild(link);
      //   createTableRow.appendChild(tableData);
      //   tableBody.appendChild(createTableRow);
      // }
    })
    .catch(function(err){
      console.log("something went wrong")
    })  
}
fetchButton.addEventListener('click',function(){
  getApi()
  youtubeResult.textContent = ""
})
