const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/secretsDB');

//------------------------------------------------------

const userSchema = {
    email: String,
    password: String,
};
const User = new mongoose.model("User", userSchema);

//------------------------------------------------------

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});

app.route('/login')
    .get((req, res) => {
        res.render('login');
    }).post(async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ email: username, password: password });
        if (!user) {
            res.redirect('/login');
            return;
        }
        res.render('secrets');
    });

app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;
            const newUser = new User({
                email: username,
                password: password
            });
            await newUser.save()
            res.render('secrets');
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

//------------------------------------------------------

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

/* 
try {

} catch (err) {
    console.log(err);
    res.sendStatus(500);
}
*/