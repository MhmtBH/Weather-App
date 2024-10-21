// Get references to buttons from the DOM
const get_weather_button = document.getElementById("get-weather-button");
const get_location_button = document.getElementById("get-location-button");

// Convert weather codes to human-readable weather information
function weatherCodeToWeatherInformation(code) {
    switch (code) {
        case 0: return "Clear Sky";
        case 1: return "Mainly Clear";
        case 2: return "Partly Cloudy";
        case 3: return "Overcast";
        case 45: return "Fog";
        case 48: return "Depositing Rime Fog";
        case 51: return "Light Drizzle";
        case 53: return "Moderate Drizzle";
        case 55: return "Dense Drizzle";
        case 56: return "Light Freezing Drizzle";
        case 57: return "Dense Freezing Drizzle";
        case 61: return "Slight Rain";
        case 63: return "Moderate Rain";
        case 65: return "Heavy Rain";
        case 66: return "Light Freezing Rain";
        case 67: return "Heavy Freezing Rain";
        case 71: return "Slight Snowfall";
        case 73: return "Moderate Snowfall";
        case 75: return "Heavy Snowfall";
        case 77: return "Snow Grains";
        case 80: return "Slight Rain Showers";
        case 81: return "Moderate Rain Showers";
        case 82: return "Violent Rain Showers";
        case 85: return "Slight Snow Showers";
        case 86: return "Heavy Snow Showers";
        case 95: return "Slight Thunderstorm";
        case 96: return "Thunderstorm with Slight Hail";
        case 99: return "Thunderstorm with Heavy Hail";
        default: return null; // Return null for unknown codes
    }
}

// Map weather codes to corresponding image file paths
function weatherCodeToImage(code) {
    switch (code) {
        case 0: return "./images/0.png";
        case 1:
        case 2: return "./images/1-2.png";
        case 3: return "./images/3.png";
        case 45:
        case 48: return "./images/45-48.png";
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65: return "./images/51-53-55-61-63-65-80-81-82.png";
        case 56:
        case 57: return "./images/56-57-66-67.png";
        case 71:
        case 73:
        case 75:
        case 77: return "./images/71-73-75-77-85-86.png";
        case 80:
        case 81:
        case 82: return "./images/51-53-55-61-63-65-80-81-82.png";
        case 85:
        case 86: return "./images/71-73-75-77-85-86.png";
        case 95:
        case 96:
        case 99: return "./images/95-96-99.png";
        default: return "./images/transparent.png"; // Default image for unknown codes
    }
}

// Map weather codes to corresponding background image file paths
function weatherCodeToBackground(code) {
    switch (code) {
        case 0: return "./images/Clear.jpg";
        case 1:
        case 2: return "./images/PartlyCloud.jpg";
        case 3: return "./images/Cloudy.jpg";
        case 45:
        case 48: return "./images/Fog.jpg";
        case 51:
        case 53:
        case 55: return "./images/Rain.jpg";
        case 56:
        case 57: return "./images/Drizzle.jpg";
        case 61:
        case 63:
        case 65: return "./images/Rain.jpg";
        case 66:
        case 67: return "./images/Drizzle.jpg";
        case 71:
        case 73:
        case 75:
        case 77: return "./images/Snow.jpg";
        case 80:
        case 81:
        case 82: return "./images/Rain.jpg";
        case 85:
        case 86: return "./images/Snow.jpg";
        case 95:
        case 96:
        case 99: return "./images/Thunder.jpg";
        default: return "./images/transparent.png"; // Default image for unknown codes
    }
}

// Function to fetch weather data from the API
async function getWeatherApi() {
    const latitude = document.getElementById("latitude-input").value;
    const longitude = document.getElementById("longitude-input").value;
    const WDATA = document.getElementById("Weather-Data");
    const WIMAGE = document.getElementById("Weather-Image");

    // Clear previous weather data
    WDATA.innerHTML = "";

    try {
        // Fetch weather data using the weatherApi exposed in the main world
        const data = await window.weatherApi.getWeather(latitude, longitude);
        console.log(data);

        const weather = data.current; // Get current weather data

        // Get weather information based on the weather code
        var currentWeather = weatherCodeToWeatherInformation(weather.weather_code);
        const weatherInfo = `
            <br>
            Weather: &nbsp${currentWeather}<br>
            Time: &nbsp${weather.time}<br>
            Humidity: &nbsp${weather.relative_humidity_2m}%<br>
            Temperature: &nbsp${weather.temperature_2m} °C<br>
            Wind Speed: &nbsp${weather.wind_speed_10m} km/h<br>
            <br>
        `;

        // Update the DOM with weather information
        WDATA.innerHTML = weatherInfo;
        WIMAGE.src = weatherCodeToImage(weather.weather_code);

        const APPBG = document.getElementById("body");
        APPBG.style.backgroundImage = `url(${weatherCodeToBackground(weather.weather_code)})`;

        // Set opacity for the weather data panel
        document.getElementById("Weather-Data-Panel").style.opacity = "100";
    } catch (error) {
        console.error("An error occurred:", error);

        // Handle error by setting default images
        WIMAGE.src = "./images/transparent.png";
        const APPBG = document.getElementById("body");
        APPBG.style.backgroundImage = "url(./images/transparent.png)";

        // Hide the weather data panel
        document.getElementById("Weather-Data-Panel").style.opacity = "0";
    }
}

// Function to fetch location data from the API
async function getLocationApi() {
    const location = document.getElementById("Location-Input").value;

    const locationListDiv = document.getElementById("Location-List-Div");

    // Clear previous location results
    while (locationListDiv.hasChildNodes()) {
        locationListDiv.removeChild(locationListDiv.firstChild);
    }

    try {
        // Fetch location data using the locationApi exposed in the main world
        const data = await window.locationApi.getLocation(location);
        console.log(data);

        // Populate location results in the DOM
        data.results.forEach(place => {
            const placeInfo = `<br>
                Name: ${place.name}<br>
                Country: ${place.country}<br>
                Latitude: ${place.latitude}<br>
                Longitude: ${place.longitude}<br>
                <br>`;

            const locationListDiv = document.getElementById("Location-List-Div");
            const locations = document.createElement("button");

            locations.innerHTML += placeInfo;
            locationListDiv.appendChild(locations);

            // Function to handle button click to get weather for the selected location
            function buttonClickToWeather() {
                const latitude = document.getElementById("latitude-input");
                const longitude = document.getElementById("longitude-input");

                // Set latitude and longitude input fields with selected place's data
                latitude.value = place.latitude;
                longitude.value = place.longitude;

                // Call getWeatherApi to fetch weather data for the selected location
                getWeatherApi();
            }

            locations.addEventListener("click", buttonClickToWeather);
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Add event listeners to buttons
get_weather_button.addEventListener("click", getWeatherApi);
get_location_button.addEventListener("click", getLocationApi);

// Function to open GitHub link
function goGithub() {
    window.shell.openExternal("https://github.com/MhmtBH");
}

// Add event listener to GitHub button
document.getElementById('Github').addEventListener('click', goGithub);
