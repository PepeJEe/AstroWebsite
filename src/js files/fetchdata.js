document.addEventListener("DOMContentLoaded", onDOMLoaded)

async function onDOMLoaded() {
    
    const apiKey = "8a5c5805e65e9f780bece863eb6b0167";
    const searchField = document.querySelector(".search-field");
    
    searchField.addEventListener("keypress", async function (e) {
        if(e.key === "Enter") 
        {
            const city = searchField.value; // Get the value of the search field
        
            await fetchWeatherData(city, apiKey);
        }
    });
}

async function fetchWeatherData(city, apiKey) {
    try {
        //https://en.ilmatieteenlaitos.fi/open-data-manual
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiurl);    
        if(response.ok)
        {
            const data = await response.json();
            console.log("Weather Data:", data); // Log the data

            // Extract relevant weather information
            const location = data.name;
            const temperature = data.main.temp;
            const clouds = data.clouds.all;

            console.log("LOCATION", location);
            console.log("CLOUDS", clouds);
            displayWeatherData(location, temperature, clouds);
        }
        else{
            console.error("Fetch failed with status:", response.status);
        }
    } catch (error) {
        console.log("FETCH ERROR", error);
    }
}

async function displayWeatherData(location, temperature, clouds) {

    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const cloudsElement = document.getElementById("clouds");

    locationElement.textContent = `LOCATION: ${location}`;
    temperatureElement.textContent = `TEMPERATURE: ${temperature}`;
    cloudsElement.textContent = `CLOUDS: ${clouds}`;
}