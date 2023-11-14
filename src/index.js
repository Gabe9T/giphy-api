import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getSearch(keyword) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyword}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, keyword);
    } else {
      printError(this, response, keyword);
    }
  });

  request.open("GET", url, true);
  request.send();
}
//UI
function printError(request, apiResponse, keyword) {
  document.querySelector('#result').innerText = `There was an error accessing the search input for ${keyword}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, keyword) {
  document.querySelector('#result').innerText = `Here is your ${keyword} picture: `;
  const image = document.createElement("img");
  image.setAttribute("src", apiResponse.data[0].images.original.url);
  document.querySelector('#result').append(image);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const keyword = document.querySelector('#searchInput').value;
  document.querySelector('#searchInput').value = null;
  getSearch(keyword);
}

window.addEventListener("load", function() {
  document.querySelector('form#query').addEventListener("submit", handleFormSubmission);
});