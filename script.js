
const searchButton = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input');
const locationBUtton = document.querySelector('.location-btn');
const weatherCardsDiv = document.querySelector('.weather-cards');

const api_key = '95e10d9551890a4f7e3310d4c5dfb4ae' //Enter your API key for OpenWeatherMap in the .env file

const createWeatherCard = (weatherItem) => {
    return `<li class="card">
                <h3>(${weatherItem.dt_txt.split(' ')[0]})</h3>
                <h6>Temp: ${weatherItem.main.temp}°C</h6>
                <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                <h6>Humidity: ${weatherItem.main.humidity}% </h6>
            </li>`;
}

const getWeatherdetails = (cityName, lat, lon) => {
    const API_url = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}&cnt=40`;
    
    console.log(new Date(fiveDaysData.dt_txt).getDate())

    fetch(API_url).then(res => res.json()).then(data => {
        const ForcastDays = [];
        const fiveDaysData = data.list.filter(forecast => {
            const forcastDate = new Date(forecast.dt_txt).getDate();
            if(!ForcastDays.includes(forcastDate)) {
                return ForcastDays.push(forcastDate);
            }
        });
        console.log(new Date(fiveDaysData.dt_txt).getDate());
        console.log(fiveDaysData);
        fiveDaysData.forEach(weatherItem => {
            weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
        });
    }).catch(() => {
        alert('Error2: Error fetching locaiton issues')
    })
    }

//Need to update this function. Technical Debt. 
//function updateForcast() { //fucntion to update wether forcast heading
    //var userInput = document.getElementById("userinput").value;
    //var forcastHeading = document.getElementById("forcastHeading");
    //forcastHeading.textContent = "Your 5 day forcast for" + userInput
//}

function getCityCoordinates() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const API_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(API_url).then(res => res.json()).then(data => {
        const { name, lat, lon } = data[0];
        getWeatherdetails(name, lat, lon);
        // Option to change this to "return lat +'.'+ lon" or a derivative.
    }).catch(() => {
        alert('Error1: Error fetching locaiton cordinates')
    })

}


searchButton.addEventListener("click", getCityCoordinates);