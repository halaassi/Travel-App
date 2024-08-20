const weatherbitApiKey = '219bef2cb10f49d1b15cbbcf6e3b2752'; 
const geoNamesBaseURL = 'http://api.geonames.org/searchJSON?name=';
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const geoNamesUsername = 'Hala_Assi'; 
const pixabayApiKey = '45533183-e444c4a21af64603b88e807bc';
const pixabayBaseURL = 'https://pixabay.com/api/';

// Global Variables
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

let destinations = [];

// Function to add destination to the list
function addDestination(city, date) {
    destinations.push({ city, date });
    displayDestinations();
}

// Function to remove destination from the list
function removeDestination(index) {
    destinations.splice(index, 1); // Remove the destination at the specified index
    displayDestinations(); // Update the displayed list
}
window.removeDestination = removeDestination;

// Function to display destinations
function displayDestinations() {
    // Sort destinations by countdown
    destinations.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });

    const currentDate = new Date();
    const destinationsContainer = document.getElementById('destinations');
    destinationsContainer.innerHTML = '';

    destinations.forEach((destination, index) => {
        const tripDate = new Date(destination.date);
        const isExpired = tripDate < currentDate;
        const style = isExpired ? 'expired-trip' : 'upcoming-trip';

        destinationsContainer.innerHTML += `
            <div id="destination-${index}" class="${style}">
                <strong>${destination.city}</strong> - Trip Date: ${destination.date}
                <button onclick="removeDestination(${index})">Remove</button>
            </div>
        `;
    });
}

// Event listener for the generate button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate').addEventListener('click', performAction);
    document.getElementById('save-trips').addEventListener('click', saveTrips);
    loadTrips(); // Load trips from local storage on page load
});

// Function to save trips to local storage
function saveTrips() {
    localStorage.setItem('destinations', JSON.stringify(destinations));
    alert('Trips saved successfully!');
}

// Function to load trips from local storage
function loadTrips() {
    const savedDestinations = localStorage.getItem('destinations');
    if (savedDestinations) {
        destinations = JSON.parse(savedDestinations);
        displayDestinations();
    }
}

// async function performAction() {
//     const currentDate = new Date();

//     const resultsContainer = document.getElementById('results');
//     resultsContainer.innerHTML = '';

//     for (const { city, date } of destinations) {
//         const tripDate = new Date(date);
//         const timeUntilTrip = tripDate - currentDate;
//         const daysUntilTrip = Math.ceil(timeUntilTrip / (1000 * 60 * 60 * 24));

//         try {
//             const geoData = await getGeoData(geoNamesBaseURL, city, geoNamesUsername);
//             if (geoData && geoData.geonames && geoData.geonames.length > 0) {
//                 const firstResult = geoData.geonames[0];
//                 const weatherData = await getWeatherData(city, weatherbitApiKey, daysUntilTrip);
//                 const imageData = await getImageData(city, pixabayApiKey);

//                 const destinationData = {
//                     date: newDate,
//                     latitude: firstResult.lat,
//                     longitude: firstResult.lng,
//                     country: firstResult.countryName,
//                     daysUntilTrip: daysUntilTrip,
//                     weather: weatherData,
//                     imageUrl: imageData
//                 };

//                 // Add data to the results container
//                 resultsContainer.innerHTML += `
//                 <div class="result-item">
//                     <img src="${destinationData.imageUrl}" alt="Location Image" class="resized-image">
//                     <div class="result-details">
//                         <h2>${city}</h2>
//                         <div>Date: ${destinationData.date}</div>
//                         <div>Latitude: ${destinationData.latitude}</div>
//                         <div>Longitude: ${destinationData.longitude}</div>
//                         <div>Country: ${destinationData.country}</div>
//                         <div>Days until trip: ${destinationData.daysUntilTrip}</div>
//                         <div>Weather: ${destinationData.weather.data[0].weather.description}</div>
//                     </div>
//                 </div>
//             `;
//             } else {
//                 resultsContainer.innerHTML += `<div>No data found for ${city}. Please check the city name and try again.</div>`;
//             }
//         } catch (error) {
//             console.error("Error occurred: ", error);
//             resultsContainer.innerHTML += `<div>Error retrieving data for ${city}. Please try again later.</div>`;
//         }
//     }
// }
async function performAction() {
    const currentDate = new Date();

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    for (const { city, date } of destinations) {
        const tripDate = new Date(date);
        const timeUntilTrip = tripDate - currentDate;
        const daysUntilTrip = Math.ceil(timeUntilTrip / (1000 * 60 * 60 * 24));

        try {
            const geoData = await getGeoData(geoNamesBaseURL, city, geoNamesUsername);
            if (geoData && geoData.geonames && geoData.geonames.length > 0) {
                const firstResult = geoData.geonames[0];
                const weatherData = await getWeatherData(city, weatherbitApiKey, daysUntilTrip);
                const imageData = await getImageData(city, pixabayApiKey);

                const destinationData = {
                    date: date,  // Use the destination's date instead of newDate
                    latitude: firstResult.lat,
                    longitude: firstResult.lng,
                    country: firstResult.countryName,
                    daysUntilTrip: daysUntilTrip,
                    weather: weatherData,
                    imageUrl: imageData
                };

                // Add data to the results container
                resultsContainer.innerHTML += `
                <div class="result-item">
                    <img src="${destinationData.imageUrl}" alt="Location Image" class="resized-image">
                    <div class="result-details">
                        <h2>${city}</h2>
                        <div>Date: ${destinationData.date}</div>
                        <div>Latitude: ${destinationData.latitude}</div>
                        <div>Longitude: ${destinationData.longitude}</div>
                        <div>Country: ${destinationData.country}</div>
                        <div>Days until trip: ${destinationData.daysUntilTrip}</div>
                        <div>Weather: ${destinationData.weather.data[0].weather.description}</div>
                    </div>
                </div>
            `;
            } else {
                resultsContainer.innerHTML += `<div>No data found for ${city}. Please check the city name and try again.</div>`;
            }
        } catch (error) {
            console.error("Error occurred: ", error);
            resultsContainer.innerHTML += `<div>Error retrieving data for ${city}. Please try again later.</div>`;
        }
    }
}
const getGeoData = async (baseURL, city, key) => {
    try {
        const res = await fetch(`${baseURL}${city}&maxRows=1&username=${key}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log('GeoNames API Response:', data);
        return data;
    } catch (error) {
        console.error("Error fetching GeoNames data:", error);
    }
};

const getWeatherData = async (city, key, days) => {
    try {
        const res = await fetch(`${weatherbitBaseURL}?city=${city}&days=${days}&key=${key}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
};

const getImageData = async (city, key) => {
    try {
        const cityEncoded = encodeURIComponent(city);
        const res = await fetch(`${pixabayBaseURL}?key=${key}&q=${cityEncoded}&image_type=photo&orientation=horizontal`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Pixabay API Response:', data);
        if (data.hits.length > 0) {
            return data.hits[0].webformatURL;
        } else {
            return 'default_image_url.jpg';
        }
    } catch (error) {
        console.error("Error fetching Pixabay data:", error);
        return 'default_image_url.jpg';
    }
};

export { getGeoData, getWeatherData, getImageData, performAction, addDestination };

