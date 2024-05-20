
const searchButton = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input');
const locationButton = document.querySelector('.location-btn');
const weatherCardsDiv = document.querySelector('.weather-cards');
const currentCardsDiv = document.querySelector('.current-weather')

require('dotenv').config();

const api_key = process.env.Weather_API_Key; //Enter your API key for OpenWeatherMap in the local .env file. 


function getCityCoordinates() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const API_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    
    fetch(API_url).then(res => res.json()).then(data => {
        
        const {name, lat, lon } = data[0] // Defines the variables from the data returned from the city cordinates API.
        getWeatherdetails(name, lat, lon)
 
    }).catch(() => {
        alert('Error1: Error fetching locaiton cordinates')
    })
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            
            const {latitude, longitude} = position.coords // defines variables from brouser posstion data.
            
            const REVERSE_API_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`
            fetch(REVERSE_API_url).then(res => res.json()).then(data =>{
                
                    const {name} = data[0] // Name recived from the reverse Geolocation API.
                    
                    getWeatherdetails(name, latitude, longitude)
            }).catch(()=> {
                alert('An error occored when fetching the city name')
            });
        },
        error => { 
            if(error.code === error.PERMISSION_DENIED){
                alert('Location request denied. Please reset location permitions and grant acess to location');
            }
        }
    );
}

const getWeatherdetails = (cityName, lat, lon) => {

    const API_url = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`;

    fetch(API_url)
        .then(res => res.json())
        .then(data => {
            const ForcastDaysList = [];
            const fiveDaysForcast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!ForcastDaysList.includes(forecastDate)) {
                    return ForcastDaysList.push(forecastDate);
                }// Function filters the forcast data reunred from API from a 5 day 3 hour forcast to a daily forcast.
            });
            
            //resets cityInput value and removes exsisting weather cards
            cityInput.value = "";
            currentCardsDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";
            
            fiveDaysForcast.forEach((weatherItem, index) => { // Creates weather cards. Diferatiating between the main day card and the 5 day forcast cards.
               if(index === 0) {
                    currentCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index))
               } else {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
               }
            });
        })
        .catch(() => {
            console.error('Error2');
            console.log(error)
            alert('Error2: Error fetching location data');
        });
};

const createWeatherCard = (name, weatherItem, index) => { //confirms the data included on the Weahter cards. 3
    if(index === 0 ) {
        return `<div class="details">
                    <h3> ${name} (${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <h6>Temperature: ${weatherItem.main.temp}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}% </h6>
                </div>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="Weather icon">`;
    } else {
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <h6><img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="Weather icon"></h6>
                    <h6>Temp: ${weatherItem.main.temp}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}% </h6>
                </li>`;
    }
}


searchButton.addEventListener("click", getCityCoordinates);
locationButton.addEventListener("click", getUserCoordinates);