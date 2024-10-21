// Import contextBridge and ipcRenderer from Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expose the weatherApi to the main world with available functions
contextBridge.exposeInMainWorld('weatherApi', {
    // Asynchronous function to get weather data
    getWeather: async (latitude, longitude) => {
        // Create URL to fetch weather data from Open Meteo API
        const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

        // Fetch response from the API
        const response = await fetch(api);

        // Throw an error if the response is not successful
        if (!response.ok) {
            throw new Error("Network response is not ok.");
        }

        // Return the response in JSON format
        return response.json();
    }
});

// Expose the locationApi to the main world with available functions
contextBridge.exposeInMainWorld('locationApi', {
    // Asynchronous function to get geocoding data for a specified location
    getLocation: async (location) => {
        // Create URL to fetch location data from Open Meteo API
        const api = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=50&language=en&format=json`;

        // Fetch response from the API
        const response = await fetch(api);

        // Throw an error if the response is not successful
        if (!response.ok) {
            throw new Error("Network response is not ok.");
        }

        // Return the response in JSON format
        return response.json();
    }
});

// Expose the shell object to the main world with available functions
contextBridge.exposeInMainWorld('shell', {
    // Send a message to the main process to open an external URL using ipcRenderer
    openExternal: (url) => ipcRenderer.send('open-external', url)
});
