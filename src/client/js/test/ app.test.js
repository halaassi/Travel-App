import { getGeoData, getWeatherData, getImageData ,performAction,addDestination} from '../app.js';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    // Set up DOM structure
    document.body.innerHTML = `
        <input id="city" value="New York" />
        <input id="date-input" value="2024-12-25" />
        <button id="add-destination">Add Destination</button>
        <div id="destinations"></div>
        <button id="generate">Generate</button>
        <div id="results"></div>
    `;

    // Re-attach event listeners after DOM setup
    document.getElementById('add-destination').addEventListener('click', () => {
        const city = document.getElementById('city').value;
        const date = document.getElementById('date-input').value;
        if (city && date) {
            addDestination(city, date);
            document.getElementById('city').value = '';
            document.getElementById('date-input').value = '';
        }
    });

    document.getElementById('generate').addEventListener('click', performAction);
});

describe('API Functions', () => {
    test('should fetch geo data successfully', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ geonames: [{ lat: '40.7128', lng: '-74.0060', countryName: 'USA' }] }));

        const data = await getGeoData('http://api.geonames.org/searchJSON?name=', 'New York', 'Hala_Assi');
        expect(data.geonames).toHaveLength(1);
        expect(data.geonames[0].countryName).toBe('USA');
    });

    test('should fetch weather data successfully', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: [{ weather: { description: 'Sunny' } }] }));

        const data = await getWeatherData('New York', '219bef2cb10f49d1b15cbbcf6e3b2752', 7);
        expect(data.data[0].weather.description).toBe('Sunny');
    });

    test('should fetch image data successfully', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ hits: [{ webformatURL: 'http://example.com/image.jpg' }] }));

        const imageUrl = await getImageData('New York', '45533183-e444c4a21af64603b88e807bc');
        expect(imageUrl).toBe('http://example.com/image.jpg');
    });

    // test('should handle errors in fetch requests', async () => {
    //     fetchMock.mockRejectOnce(new Error('API error'));

    //     await expect(getGeoData('http://api.geonames.org/searchJSON?name=', 'New York', 'Hala_Assi')).rejects.toThrow('API error');
    //     await expect(getWeatherData('New York', '219bef2cb10f49d1b15cbbcf6e3b2752', 7)).rejects.toThrow('API error');
    //     await expect(getImageData('New York', '45533183-e444c4a21af64603b88e807bc')).rejects.toThrow('API error');
    // });
});

describe('DOM Manipulation', () => {
    test('should display results after generating', async () => {
        fetchMock.mockResponses(
            [JSON.stringify({ geonames: [{ lat: '40.7128', lng: '-74.0060', countryName: 'USA' }] }), { status: 200 }],
            [JSON.stringify({ data: [{ weather: { description: 'Sunny' } }] }), { status: 200 }],
            [JSON.stringify({ hits: [{ webformatURL: 'http://example.com/image.jpg' }] }), { status: 200 }]
        );

        // Simulate adding a destination
        const addDestinationButton = document.getElementById('add-destination');
        addDestinationButton.click();

        // Simulate clicking the generate button
        const generateButton = document.getElementById('generate');
        await generateButton.click();

        // Add a slight delay to ensure async operations complete
        await new Promise((r) => setTimeout(r, 100));

        // Check the results container
        const resultsContainer = document.getElementById('results');
        console.log('Results Container HTML:', resultsContainer.innerHTML); // Debugging statement

        expect(resultsContainer.innerHTML).toContain('New York');
        expect(resultsContainer.innerHTML).toContain('Sunny');
        expect(resultsContainer.innerHTML).toContain('http://example.com/image.jpg');
    });
});
