## Overview

The Trip Planner App is a web application that allows users to plan and manage their upcoming trips. Users can add multiple destinations with specific dates, view weather forecasts for their planned trips, and see images of the locations. 

## Features

- **Add Destinations**: Users can input a city and a trip date, and the app will store this destination for future reference.
- **Remove Destinations**: Users can easily remove any unwanted trips from the list.
- **Weather Forecast**: The app fetches weather data for the trip date from the Weatherbit API.
- **Location Images**: The app retrieves relevant images for the destination from the Pixabay API.
  
## How It Works

1. **Add a Trip**: Enter the city name and the trip date. Click "Add Destination" to add the trip to the list.
2. **View Trip Details**: Click "Generate" to fetch and display weather data and images for the trips.

## Dependencies

The project uses the following APIs and libraries:

- **GeoNames API**: For fetching the latitude, longitude, and country information of a destination.
  - `http://api.geonames.org/`
- **Weatherbit API**: For fetching the weather forecast based on the trip date and location.
  - `https://api.weatherbit.io/`
- **Pixabay API**: For fetching images related to the destination city.
  - `https://pixabay.com/api/`

## Getting Started

### Prerequisites

Before running the app, ensure you have the following:

- A modern web browser (Google Chrome, Firefox, etc.)
- Internet connection (for API requests)

### Installation

1. **Clone the Repository**: 
    ```bash
        https://github.com/halaassi/Travel-App.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd Travel-App
    ```
3. **Install dependencies**:
   ```bash
       npm install v20.16.0

    ```
4. **Build Commands**:
- **`npm run build-prod`**: Build the application for production. This creates a minified and optimized build suitable for deployment.
- **`npm run build-dev`**: Build the application for development. This includes unminified code and source maps for easier debugging.
5.  **Start Command** .
- **`npm run start`**: Start the application. This command runs the development server and opens the application for local development.
6.  **Test Command** .
- **`npm run start`**: Test the application. This command runs the test suite for  application.

## Usage

1. **Add a Destination**: Use the input fields to add a new trip destination.
2. **Generate Trip Data**: Click the "Generate" button to retrieve weather and image data.


## Acknowledgements

- **GeoNames** for providing location data.
- **Weatherbit** for the weather data.
- **Pixabay** for the beautiful images.

---

*Developed by [Hala Assi ].*
