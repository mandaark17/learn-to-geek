// Declarations
var gameApi = "E544j3UXCv";
var apiUrl = `https://api.boardgameatlas.com/api/search?client_id=${gameApi}&limit=100&sort=popularity`;
var searchButton = document.getElementsByClassName("search-button")[0];
var resultsContainer = document.getElementById("resultsContainer");
var searchInput = document.getElementsByClassName("search-input");
var factsContainer = document.getElementsByClassName("facts-placeholder")[0];
var gameArray = [];
var datalist = document.getElementById("history1");

//Board Game API
window.addEventListener("load", function () {
  var storedGameArray = localStorage.getItem("gameArray");
  if (storedGameArray) {
    gameArray = JSON.parse(storedGameArray);
  }
  for (var i = 0; i < gameArray.length; i++) {
    var option = document.createElement("option");
    option.value = gameArray[i];
    datalist.appendChild(option);
  }
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const gameName = searchInput[0].value;
  if (gameName === "") {
    factsContainer.innerHTML = "Please enter a game name.";
    return;
  }
  console.log(gameName);
  function getGameInfo() {
    fetch(apiUrl + "&name=" + gameName)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.games.length === 0) {
          factsContainer.innerHTML = "No results found.";
        } else {
          //formats the title of the game to have all first letters Uppercase
          var gameTitle = formatGameName(data.games[0].handle);

          function formatGameName() {
            var words = gameName.split(" ");
            var capitalizedWords = words.map(function (word) {
              var firstLetter = word.charAt(0).toUpperCase();
              var restOfWord = word.slice(1);
              return firstLetter + restOfWord;
            });
            return capitalizedWords.join(" ");
          }
          console.log(data);
          factsContainer.textContent = formatGameName(gameTitle) + ": ";
          factsContainer.append(document.createElement("br"));
          var image = document.createElement("img");
          if (data.games[0].description_preview) {
            factsContainer.append(data.games[0].description_preview);
            factsContainer.append(document.createElement("br"));
          }
          image.src = data.games[0].images.thumb;
          factsContainer.appendChild(image);
          factsContainer.append(document.createElement("br"));
          factsContainer.append(
            " Year Published: " + data.games[0].year_published
          );
          factsContainer.append(document.createElement("br"));
          if (data.games[0].players) {
            factsContainer.append(" Players: " + data.games[0].players);
            factsContainer.append(document.createElement("br"));
          }
          if (data.games[0].msrp_text) {
            factsContainer.append(" Cost: " + data.games[0].msrp_text);
            factsContainer.append(document.createElement("br"));
          }
          if (data.games[0].min_age) {
            factsContainer.append(" Minimum Age: " + data.games[0].min_age);
            factsContainer.append(document.createElement("br"));
          }
        }

        if (!gameArray.includes(gameName)) {
          gameArray.push(gameName); // Add the game name directly to the gameArray
          localStorage.setItem("gameArray", JSON.stringify(gameArray)); // Save the gameArray to local storage
          console.log(gameArray);
  
          datalist.innerHTML = '';
          for (i = 0; i < gameArray.length; i++) {
              var option = document.createElement("option")
              option.value = gameArray[i];
              datalist.appendChild(option);
          }
        }
      });
  }
  getGameInfo();
});

// YouTube API
var fetchButton = document.querySelector('.search-button');
var searchEL = document.querySelector('.search-input')
var youtubeResult = document.querySelector('.video-placeholder')

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var textInput = 'how to play ' + searchEL.value;
  var youtubeApi = 'AIzaSyA_4MqgADoM6dEZQymSJuIpuFZA1TxuvsM';
  var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=50&q=' + textInput + '&type=video&key=' + youtubeApi;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        var frameEl = document.createElement ('iframe')
        var embedLink = "https://www.youtube.com/embed/"+data.items[0].id.videoId
        var videoContainer= document.querySelector('.video-placeholder')
  
        frameEl.setAttribute("src", embedLink)
        videoContainer.appendChild(frameEl)
    })
    .catch(function(err){
      console.log("something went wrong")
    })  
}
fetchButton.addEventListener('click',function(){
  getApi()
  youtubeResult.textContent = ""
})

// Modal for contributors
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});