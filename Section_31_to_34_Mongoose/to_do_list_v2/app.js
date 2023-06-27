const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//--------------------------------------------------------------------

mongoose.connect("mongodb://0.0.0.0:27017/toDoListDB");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
    },
});
const Item = mongoose.model("Item", itemSchema);

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "List name is required"],
    },
    items: {
        type: [itemSchema],
    }
});
const List = mongoose.model('List', listSchema);

//---------------------------------------------------------------------

app.get('/', (req, res) => {

    const { dayText, dateText } = date.getDate();

    Item.find((err, items) => {
        if (err) console.log(err);
        else {

            if (items.length === 0) {
                Item.insertMany(
                    [
                        new Item({ name: "Wake up" }),
                        new Item({ name: "Be a complete waste of space" }),
                        new Item({ name: "Drink coffee" }),
                    ],
                    (err => {
                        if (err) console.log(err);
                        else console.log('Default items saved');
                    }),
                );
                res.redirect('/');
            }

            else res.render('list', { day: dayText, title: 'Today', items: items });
        };
    });
});

//------------------------------

app.post('/', (req, res) => {
    if (req.body.newItem.trim().length === 0) return;

    const item = new Item({ name: req.body.newItem });
    item.save();
    res.redirect('/');
});

//------------------------------

app.post('/delete', (req, res) => {
    if (req.body.checkDelete) {
        Item.findByIdAndRemove(req.body.checkDelete, (err) => {
            if (!err) {
                console.log('Deleted successfully');
                res.redirect('/');
            } else {
                console.log(err);
            }
        });
    }
});

//------------------------------

app.get('/:listName', (req, res) => {
    const listName = req.params.listName;
    const { dayText, dateText } = date.getDate();

    List.findOne({ name: listName }, (err, list) => {
        if (!list) {
            const list = new List({
                name: listName,
                items: [],
            });
            list.save();
        }
        res.render('list', { day: dayText, title: listName, items: list.items })
    });
});

//------------------------------

// app.get('/work', (req, res) => {
//     const { dayText, _ } = date.getDate();

//     res.render("list", { title: "Work", items: workItems, day: dayText });
// });

//------------------------------

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});

//------------------------------

app.get('/about', (req, res) => {
    res.render('about');
});

//---------------------------------------------------------------------

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

