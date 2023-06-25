const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    let result = num1 + num2;

    res.send('The result is ' + result);
});

app.get('/bmi-calculator', (req, res) => {
    res.sendFile(__dirname + '/bmi-calculator.html');
});

app.post('/bmi-calculator', (req, res) => {
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);

    let result = weight / Math.pow(height, 2);

    res.send('Your BMI is ' + result);
});

app.listen('3000', () => {
    console.log('Server running on port 3000');
});