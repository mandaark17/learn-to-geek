var apiKey = "ljRW2RzyOi";
var apiUrl = `https://api.boardgameatlas.com/api/search?client_id=${apiKey}&limit=100&sort=popularity`;
var searchForm = document.getElementById("searchForm");
var gameInput = document.getElementById("gameInput");
var resultsContainer = document.getElementById("resultsContainer");
var facts = document.getElementById("facts");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const gameName = gameInput.value;
  if (gameName === "") {
    resultsContainer.innerHTML = "Please enter a game name.";
    return;
  }

  function getGameInfo() {
    fetch(apiUrl + "&name=" + gameName)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.games.length === 0) {
          resultsContainer.innerHTML = "No results found.";
        } else {
          console.log(data);
          facts.textContent = data.games[0].handle;
          var image = document.createElement("img");
          if (data.games[0].description_preview) {
            facts.append(data.games[0].description_preview);
          }
          image.src = data.games[0].images.thumb;
          facts.appendChild(image);
          facts.append(" Year Published: " + data.games[0].year_published);
          facts.append(" Players: " + data.games[0].players);
          if (data.games[0].msrp_text) {
            facts.append(" Cost: " + data.games[0].msrp_text);
          }
          facts.append(" Minimum Age: " + data.games[0].min_age);
        }
      });
  }
  getGameInfo();
});
