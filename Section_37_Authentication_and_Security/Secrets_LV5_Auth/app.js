require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/secretsLV5DB');

//------------------------------------------------------

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//------------------------------------------------------

app.get('/', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/secrets');
    res.render('home');
});

app.get('/logout', (req, res) => {
    req.logout(() => { });
    res.redirect('/');
});

app.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = new User({
                username: username,
                password: password,
            });
            req.login(user, (err) => {
                if (!err) passport.authenticate("local")(req, res, () => { res.redirect('/secrets') });
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
            res.redirect('login');
        }
    });


app.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;
            User.register({ username: username }, password, (err, user) => {
                if (err) throw err;
                else req.login(user, (err) => {
                    if (!err) passport.authenticate("local")(req, res, () => { res.redirect('/secrets') });
                });
            });
        } catch (err) {
            console.log(err);
            res.redirect('/register');
        }
    });

app.route('/secrets')
    .get((req, res) => {
        if (req.isAuthenticated()) res.render('secrets');
        else res.redirect('/login');
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