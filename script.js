const apiKey = "7856fde344204392871191525253101"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weatherInfo");

function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    } else {
        alert("Please enter a city name.");
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        }, () => {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherInfo.innerHTML = `<p>City not found. Try again!</p>`;
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>Failed to fetch weather data.</p>`;
        });
}

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
