// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
  gapi.client.setApiKey('9676a9fef7msh02b923c8e8eebe8p1ff668jsn857752fe0e73');
  search();
}

function searchVideos(query) {
  var request = gapi.client.youtube.search.list({
    part: 'snippet', // Targets a specific method in the youtube data api
    q: 'how to play ' + query, // Add 'how to play ' to the search query
    type: 'video', // Filters it to just videos
    maxResults: 10, // Adjust the number of results as needed
    order: 'title', // Asking for the title name
    thumbnail: 'default', // Returns a default thumbnail of the video
  });

  // Send the request to the API server,
  // and invoke onSearchRepsonse() with the response.
  request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
  showResponse(response);
}

function displayVideos(videos) {
  var videoList = document.getElementById('videoList'); // Assuming you have a <ul> element with the ID 'videoList'

  videoList.innerHTML = ''; // Clear the previous results

  videos.forEach(function(video) {
    var title = video.snippet.title;

    // Create a new <li> element for each video title
    var listItem = document.createElement('li');
    listItem.textContent = title;

    // Append the <li> to the <ul>
    videoList.appendChild(listItem);
  });
}
