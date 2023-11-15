import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function showRandomGiph() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printRandom(response);
    } else {
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

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

function getTrending() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=10&offset=0&rating=g&bundle=messaging_non_clips
  `;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printTrending(response);
    } else {
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}
//UI
function printRandom(apiResponse) {
  const image = document.createElement("img");
  image.setAttribute("src", apiResponse.data.images.fixed_height.url);
  image.setAttribute("class", "col-lg-3");
  image.setAttribute("style", "padding: 3%");
  document.querySelector('#randomShow').append(image);
}

function printError(request, apiResponse, keyword) {
  document.querySelector('#result').innerText = `There was an error accessing the search input for ${keyword} :  ${request.status} ${request.statusText}: ${apiResponse.message}`;
  // issue with 3 param if other only has 2?
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

function printTrending(apiResponse) {
  const image = document.createElement("img");
  image.setAttribute("src", apiResponse.data[0].images.original.url);
  document.querySelector('#resultTrending').append(image);
  const image2 = document.createElement("img");
  image2.setAttribute("src", apiResponse.data[1].images.original.url);
  document.querySelector('#resultTrending').append(image2);
  const image3 = document.createElement("img");
  image3.setAttribute("src", apiResponse.data[2].images.original.url);
  document.querySelector('#resultTrending').append(image3);
  const image4 = document.createElement("img");
  image4.setAttribute("src", apiResponse.data[3].images.original.url);
  document.querySelector('#resultTrending').append(image4);
}
window.addEventListener("load", function() {
  getTrending();
  document.querySelector('form#query').addEventListener("submit", handleFormSubmission);
  document.querySelector('div#randomShow').addEventListener("click", showRandomGiph);
});