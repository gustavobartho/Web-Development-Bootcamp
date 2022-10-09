const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

    let query = req.body.cityName;
    let apiKey = '80fff43dcf7bce0a25983ea82d4deb36';
    const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + query + '&appid=' + apiKey;

    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<p> The weather is currently " + weatherData.weather[0].description + " in " + query + ".");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees</h1>");
            res.write("<image src=" + iconUrl + ">");
            res.send();
        });
    });
});



app.listen(3000, () => {
    console.log('Listening on port 3000');
});