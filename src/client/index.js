// js files
import { addDestination, performAction, getGeoData, getWeatherData, getImageData } from '../client/js/app';


console.log(addDestination, performAction, getGeoData, getWeatherData, getImageData);

document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the Add Destination button
    document.getElementById('add-destination').addEventListener('click', () => {
        const city = document.getElementById('city').value;
        const date = document.getElementById('date-input').value;
        if (city && date) {
            addDestination(city, date);
            document.getElementById('city').value = '';
            document.getElementById('date-input').value = '';
        }
    });

    // Event listener for the Generate button
    document.getElementById('generate').addEventListener('click', performAction);
});

// sass files
import './styles/style.scss'
