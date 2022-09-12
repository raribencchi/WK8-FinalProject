//Calculate date
function formatDate(timeStamp) {
    let date = new Date(timeStamp);

    let hours = date.getHours();
    if (hours <10) {
        hours = 0 + hours;
    }

    let minutes = date.getMinutes();
    if (minutes <10) {
        minutes = 0 + minutes;
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return day + hours + ":" + minutes;
}

// bring future week weather forecast to JS file and call it through function

function displayForecast() {

    let forecastElement = document.querySelector("#forecast")
   
    let forecastHTML = `<div class="row">`;

    let days = ["Mon", "Tue","Wed","Thu", "Fri", "Sat"]
    days.forEach(function(day) {

 //concatenating the function
forecastHTML = forecastHTML +
`<div class="col-2">
  <div class="weather-forecast-date">${day}</div>
   <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="" width="42"/>
  <div class= "weather-forecst-temperatures">
    <div class="weather-forecaste-temperature">
      <span class="weather-forecaste-temperature-max">22&#176</span>/<span class="weather-forecaste-temperature-min">10&#176</span>  
    </div>                   
  </div>
</div>`;

    })
       
forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
 
  }

// define functions for each elements
function displayTemperature(response) {
   // console.log(response.data);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    celsiusTemperature = (response.data.main.temp);

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round (celsiusTemperature);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = Math.round (response.data.main.humidity);
    
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round (response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate (response.data.dt * 1000);

 

    let iconElement = document.querySelector("#icon");
    //instead of using innerhtml use setAttribute to change the feature of an element
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    //setAttribute for icon description

    iconElement.setAttribute("alt", response.data.weather[0].description);
}
// function to find city searched through API

function search(city) {
    //API call using api key
let apiKey = "2abed27801bd63fe3e39896675495cfd";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//console.log(apiUrl);

// connect to axios to interact with api 
axios.get(apiUrl).then(displayTemperature);

}

//Function to link search results
function handleSearch(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    
    //to hide href link option when fahrenheit is clicked
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active")

    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
  
}

function displaycelsiusTemperature(event) {
    event.preventDefault();

    //to hide href link option when celsius is clicked
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active")

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round (celsiusTemperature);
}

let celsiusTemperature = null;

search("New York");
displayForecast();

//linking search results

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

//event listener for temperatures

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);






