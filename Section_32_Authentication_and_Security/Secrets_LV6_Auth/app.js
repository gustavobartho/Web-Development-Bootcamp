require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

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

mongoose.connect('mongodb://127.0.0.1:27017/secretsLV6DB');

//------------------------------------------------------

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String,
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use(new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/secrets',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return cb(err, user);
        });
    }
));

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
    .get(async (req, res) => {
        const users = await User.find({ "secret": { $ne: null } });
        if (users && users.length) {
            res.render('secrets', { usersWithSecrets: users });
        }
    });

app.get('/auth/google', (req, res) => {
    passport.authenticate("google", { scope: ['profile'] });
});

app.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/secrets');
});

app.route('/submit')
    .get((req, res) => {
        if (req.isAuthenticated()) res.render('submit');
        else res.redirect('/login');
    })
    .post(async (req, res) => {
        const submittedSecret = req.body.secret;
        try {
            const user = await User.findById(req.user.id);
            if (user) {
                user.secret = submittedSecret;
                await user.save();
            }
            res.redirect('/secrets');
        } catch (err) {
            res.redirect('/secrets');
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