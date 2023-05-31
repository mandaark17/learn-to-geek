var apiKey = "E544j3UXCv";
var apiUrl = `https://api.boardgameatlas.com/api/search?client_id=${apiKey}&limit=100&sort=popularity`;
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