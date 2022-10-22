const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var items = ["Wake up", "Be a complete waste of space", "Drink coffee"];
var workItems = [];

app.get('/', (req, res) => {

    const { dayText, dateText } = date.getDate();

    res.render('list', { day: dayText, title: dateText, items: items });
});

app.post('/todo', (req, res) => {
    if (req.body.newItem.trim().length > 0) {
        if (req.body.list === "Work") {
            workItems.push(req.body.newItem);
            res.redirect('/work');
        } else {
            items.push(req.body.newItem);
            res.redirect('/');
        }
    }


});

app.get('/work', (req, res) => {
    const { dayText, _ } = date.getDate();

    res.render("list", { title: "Work", items: workItems, day: dayText });
});

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

