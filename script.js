const searchButton = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input')
const locationBUtton = document.querySelector('.location-btn')

const api_key = "TBC" //Enter your API key for OpenWeatherMap

function updateForcast() { //fucntion to update wether forcast heading
    var userInput = document.getElementById("userinput").value;
    var forcastHeading = document.getElementById("forcastHeading");
    forcastHeading.textContent = "Your 5 day forcast for" + userInput
}



searchButton.addEventListener("click", getCityCoordinates);