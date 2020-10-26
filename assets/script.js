var cityFormEl = document.querySelector("#city-form")
var searchTermEl = document.querySelector("#search-term")
var searchHistoryEl = document.querySelector("#city-history")
var cityNameEl = document.querySelector("#city-name")
var currentDate = document.querySelector("#current-date")
var tempEl = document.querySelector("#temperature")
var humidEl = document.querySelector("#humidity")
var windSpeedEl = document.querySelector("#wind-speed")
var uvIndexEl = document.querySelector("#uv-index")
var cardDeckEl = document.querySelector(".card-deck")

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


// search for a specific city
var formSubmitHandler = function(event) {
    event.preventDefault()
    // get the value from input element
    var cityName = searchTermEl.value.trim()
    if (cityName) {
        getCurrentWeather(cityName)
        getWeatherForecast(cityName)
        searchTermEl.value = ""
    } else {
        alert("Please enter an appropriate city name.")
    }

    // create a search history
    var previousSearch = document.createElement("button")
    previousSearch.classList = "list-group-item list-group-item-action"
    previousSearch.textContent = cityName
    searchHistoryEl.appendChild(previousSearch)
    previousSearch.addEventListener("click", function(event) {
        getCurrentWeather(cityName)
        getWeatherForecast(cityName)
    })
}

// display weather
var displayCurrentWeather = function(location) {
    // display city to current city weather card
    cityNameEl.textContent = location.name
    
    // dislplay weather icon for current weather condition
    var icon = location.weather[0].icon
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
    var iconImage = document.createElement("img")
    iconImage.setAttribute("src", iconUrl)
    iconImage.setAttribute("id", "weather-icon")
    var weatherIconEl = document.querySelector("#current-weather-icon")
    cityNameEl.appendChild(iconImage)

    // display current date
    currentDate.textContent = moment().format(" (MM/DD/YYYY) ")

    // display weather properties
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
            uvIndexColor(data)
        })
    })
}

// change uv index color depending on weather conditions
var uvIndexColor = function(index) {
    var indexValue = index.value
    if (indexValue < 3) {
        uvIndexEl.innerHTML = "UV Index: <span id='uv-index-result' class='bg-success'>" + index.value + "</span>"
    } else if (indexValue > 3 && indexValue < 8) {
        uvIndexEl.innerHTML = "UV Index: <span id='uv-index-result' class='bg-warning'>" + index.value + "</span>"
    } else if (indexValue > 8) {
        uvIndexEl.innerHTML = "UV Index: <span id='uv-index-result' class='bg-danger'>" + index.value + "</span>"
    }
}

// display weather forecast
var getWeatherForecast = function(location) {
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=56f3f1c095b48e9300d7b4ab51186f23"
    fetch(forecastApiUrl).then(function(response) {
        response.json().then(function (data) {
            displayWeatherForecast(data)
        })
    })
}


var displayWeatherForecast = function(forecast) {
    // day one
    var iconOne = forecast.list[5].weather[0].icon
    var iconOneUrl = "https://openweathermap.org/img/wn/" + iconOne + ".png"
    var dayOne = document.querySelector("#day-one")
    var imgOne = document.querySelector("#img-one")
    var tempOne = document.querySelector("#temp-one")
    var humidOne = document.querySelector("#humid-one")
    dayOne.textContent = moment().add(1, "day").format("MM/DD/YYYY")
    imgOne.setAttribute("src", iconOneUrl) 
    tempOne.textContent = "Temp: " + forecast.list[5].main.temp + " °F"
    humidOne.textContent = "Humidity: " + forecast.list[5].main.humidity + " %"

    // day two
    var iconTwo = forecast.list[13].weather[0].icon
    var iconTwoUrl = "https://openweathermap.org/img/wn/" + iconTwo + ".png"
    var dayTwo = document.querySelector("#day-two")
    var imgTwo = document.querySelector("#img-two")
    var tempTwo = document.querySelector("#temp-two")
    var humidTwo = document.querySelector("#humid-two")
    dayTwo.textContent = moment().add(2, "days").format("MM/DD/YYYY")
    imgTwo.setAttribute("src", iconTwoUrl) 
    tempTwo.textContent = "Temp: " + forecast.list[13].main.temp + " °F"
    humidTwo.textContent = "Humidity: " + forecast.list[13].main.humidity + " %"

    // day three
    var iconThree = forecast.list[21].weather[0].icon
    var iconThreeUrl = "https://openweathermap.org/img/wn/" + iconThree + ".png"
    var dayThree = document.querySelector("#day-three")
    var imgThree = document.querySelector("#img-three")
    var tempThree = document.querySelector("#temp-three")
    var humidThree = document.querySelector("#humid-three")
    dayThree.textContent = moment().add(3, "day").format("MM/DD/YYYY")
    imgThree.setAttribute("src", iconThreeUrl) 
    tempThree.textContent = "Temp: " + forecast.list[21].main.temp + " °F"
    humidThree.textContent = "Humidity: " + forecast.list[21].main.humidity + " %"

    // day four
    var iconFour = forecast.list[29].weather[0].icon
    var iconFourUrl = "https://openweathermap.org/img/wn/" + iconFour + ".png"
    var dayFour = document.querySelector("#day-four")
    var imgFour = document.querySelector("#img-four")
    var tempFour = document.querySelector("#temp-four")
    var humidFour = document.querySelector("#humid-four")
    dayFour.textContent = moment().add(4, "day").format("MM/DD/YYYY")
    imgFour.setAttribute("src", iconFourUrl) 
    tempFour.textContent = "Temp: " + forecast.list[29].main.temp + " °F"
    humidFour.textContent = "Humidity: " + forecast.list[29].main.humidity + " %"

    // day five
    var iconFive = forecast.list[37].weather[0].icon
    var iconFiveUrl = "https://openweathermap.org/img/wn/" + iconFive + ".png"
    var dayFive = document.querySelector("#day-five")
    var imgFive = document.querySelector("#img-five")
    var tempFive = document.querySelector("#temp-five")
    var humidFive = document.querySelector("#humid-five")
    dayFive.textContent = moment().add(5, "day").format("MM/DD/YYYY")
    imgFive.setAttribute("src", iconFiveUrl) 
    tempFive.textContent = "Temp: " + forecast.list[37].main.temp + " °F"
    humidFive.textContent = "Humidity: " + forecast.list[37].main.humidity + " %"

    cardDeckEl.classList.remove("hidden")
}

cityFormEl.addEventListener("submit", formSubmitHandler)