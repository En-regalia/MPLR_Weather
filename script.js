const searchButton = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input')
const locationBUtton = document.querySelector('.location-btn')

const api_key = "TBC" //Enter your API key for OpenWeatherMap

//Need to update this function. Technical Debt. 
//function updateForcast() { //fucntion to update wether forcast heading
    //var userInput = document.getElementById("userinput").value;
    //var forcastHeading = document.getElementById("forcastHeading");
    //forcastHeading.textContent = "Your 5 day forcast for" + userInput
//}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;
    API_url = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}';
    

}


searchButton.addEventListener("click", getCityCoordinates);