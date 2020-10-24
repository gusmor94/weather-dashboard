var cityFormEl = document.querySelector("#city-form")
var citySearchEl = document.querySelector("#city-search")
var cityNameEl = document.querySelector("#city-name")
var tempEl = document.querySelector("#temperature")
var humidEl = document.querySelector("#humidity")
var windSpeedEl = document.querySelector("#wind-speed")
var uvIndexEl = document.querySelector("#uv-index")

// fetch weather api
var getCurrentWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=56f3f1c095b48e9300d7b4ab51186f23"
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentWeather(data)
            })
        } else {
            alert("Error " + response.statusText)
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather")
    })
}
getCurrentWeather("san francisco")

// search for a specific city
var formSubmitHandler = function(event) {
    event.preventDefault()
    // get the value from input element
    var cityName = citySearchEl.value.trim()
    if (cityName) {
        getCurrentWeather(cityName)
        citySearchEl.value = ""
    } else {
        alert("Please enter an appropriate city name.")
    }
}

// display weather
var displayCurrentWeather = function(location) {
    // display city to current city weather card
    cityNameEl.textContent = location.name
    tempEl.textContent = "Temperature: " + location.main.temp + " °F"
    humidEl.textContent = "Humidity: " + location.main.humidity + " %" 
    windSpeedEl.textContent = "Wind Speed: " + location.wind.speed + " MPH"
    
    // call displayUvIndex function to display on page
    var latitude = location.coord.lat
    var longitude = location.coord.lon
    displayUvIndex(latitude, longitude)
}

// retrieve uv index
var displayUvIndex = function(lat, lon) {
    var uvIndexApi = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=56f3f1c095b48e9300d7b4ab51186f23"
    fetch(uvIndexApi).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            uvIndexEl.textContent = "UV Index: " + data.value
        })
    })
}

// display weather forecast

cityFormEl.addEventListener("submit", formSubmitHandler)