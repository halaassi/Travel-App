const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Running on localhost: ${port}`);
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};



app.post('/addData', (req, res) => {
    projectData = req.body; // Expecting an array of destinations
    console.log('Stored Data:', projectData);
    res.send(projectData);
});

// GET route to send weather and image data back to the client
app.get('/getData', (req, res) => {
    res.send(projectData);
});

