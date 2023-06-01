var gameApi = "E544j3UXCv";
var apiUrl = `https://api.boardgameatlas.com/api/search?client_id=${gameApi}&limit=100&sort=popularity`;
var searchButton = document.getElementsByClassName("search-button")[0];
var resultsContainer = document.getElementById("resultsContainer");
var searchInput = document.getElementsByClassName("search-input");
var factsContainer = document.getElementsByClassName("facts-placeholder")[0];

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
      });
  }
  getGameInfo();
});

var fetchButton = document.querySelector('.search-button');
var searchEL = document.querySelector('.search-input')
var youtubeResult = document.querySelector('.video-placeholder')
var SearchDropDown = document.querySelector('.dropdown-content')
var DropdownEl = document.querySelector('.dropbtn')

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var textInput = 'how to play ' + searchEL.value;
  var youtubeApi = 'AIzaSyBEE5Yf5ZAP4gPVsqsVja8djNhyzBQel84';
  var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=50&q=' + textInput + '&type=video&key=' + youtubeApi;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
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
  var searchVal = searchEL.value
  localSto(searchVal)
  getApi()
  youtubeResult.textContent = ""
})

// LocalStorage History Search

var historySearch = JSON.parse(localStorage.getItem("search-history")) || []

function showhistory (historySearch){
  for ( var i = 0; i < historySearch.length; i++){
      var pastSearch = document.createElement('button')
      var brEL = document.createElement('br')
      pastSearch.classList.add("btn")
      pastSearch.setAttribute('data-search', historySearch[i])
      pastSearch.textContent = historySearch[i]
      SearchDropDown.appendChild(pastSearch)
      SearchDropDown.appendChild(brEL)

  }
}
showhistory(historySearch)

function localSto (datainput){
  historySearch.push(datainput)
  localStorage.setItem("search-history",JSON.stringify(historySearch))
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
DropdownEl.addEventListener('click', function(event) {
  myFunction()
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
)

//EventListner for each search history
document.querySelectorAll('.btn').forEach(function(btn){
  btn.addEventListener('click',function(event){
      var InputHis = this.dataset.search
      console.log(InputHis)
      var youtubeApi = 'AIzaSyBEE5Yf5ZAP4gPVsqsVja8djNhyzBQel84';
      // var GameUrl = apiUrl + "&name=" + InputHis
      var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=50&q=' + InputHis + '&type=video&key=' + youtubeApi;

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
      youtubeResult.textContent = ""
      // getGameInfo(GameUrl)

  })
})