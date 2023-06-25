const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

//-----------------------------------------------------

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/wikiDB');
//-----------------------------------------------------

const articleSchema = {
    title: String,
    content: String,
};
const Article = mongoose.model('Article', articleSchema);

//-----------------------------------------------------

app.route('/articles')
    .get(async (req, res) => {
        try {
            const foundArticles = await Article.find();
            res.send(foundArticles);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    })
    .post(async (req, res) => {
        try {
            const { title, content } = req.body;
            const newArticle = new Article({
                title: title,
                content: content
            });
            await newArticle.save();
            res.send();
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    })
    .delete(async (req, res) => {
        try {
            await Article.deleteMany();
            res.send();
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

//---------------

app.route('/articles/:articleTitle')
    .get(async (req, res) => {
        try {
            const { articleTitle } = req.params;
            const article = await Article.findOne({ title: articleTitle });
            if (!article) {
                res.sendStatus(404);
                return;
            }
            res.send(article);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    })
    .put(async (req, res) => {
        try {
            const { articleTitle } = req.params;
            const { title, content } = req.body;
            await Article.replaceOne({ title: articleTitle }, { title: title, content: content });
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    })
    .patch(async (req, res) => {
        try {
            const { articleTitle } = req.params;
            const { title, content } = req.body;
            await Article.updateOne({ title: articleTitle }, { title: title, content: content });
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    })
    .delete(async (req, res) => {
        try {
            const { articleTitle } = req.params;
            await Article.deleteOne({ title: articleTitle });
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

//-----------------------------------------------------

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});