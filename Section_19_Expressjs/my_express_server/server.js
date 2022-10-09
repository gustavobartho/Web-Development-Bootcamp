const express = require('express');

const app = express();

app.get("/", (req, res) => {
    console.log(req);

    res.send("<h1>Hello</h1>");
});

app.get('/contact', (req, res) => {
    res.send('Contact me at: ');
});

app.get('/about', (req, res) => {
    res.send('You know nothing.');
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});