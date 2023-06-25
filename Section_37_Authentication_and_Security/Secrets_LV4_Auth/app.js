require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/secretsLV4DB');

const saltRounds = Number(process.env.SALT_ROUNDS);

//------------------------------------------------------

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});
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
    })
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.find({ email: username });
            if (!user || !user?.length) {
                res.redirect('login');
                return;
            }
            bcrypt.compare(password, user[0].password, (err, isEqual) => {
                if (err) throw (err);
                if (isEqual) res.render('secrets');
                if (!isEqual) res.redirect('login');

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
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) throw (err);
                const newUser = new User({ email: username, password: hash });
                await newUser.save()
                res.render('secrets');
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
            res.redirect('login');
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