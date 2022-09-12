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

//linking search results

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

//event listener for temperatures

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);






