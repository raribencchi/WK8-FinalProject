// define functions for each elements

function displayTemperature(response) {
    console.log(response.data);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round (response.data.main.temp);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = Math.round (response.data.main.humidity);
    
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round (response.data.wind.speed);
}



//API call using api key
let apiKey = "2abed27801bd63fe3e39896675495cfd";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Perth&appid=${apiKey}&units=metric`;

console.log(apiUrl);

// connect with axios to interact with api by declaring the functions
axios.get(apiUrl).then(displayTemperature);





