const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB");

// --------------------------------------------

// const fruitSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String,
// });

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fruit name is required"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Banana",
    rating: 11,
    review: "Top dms seloko",
});

// Saves the document in the collection
//fruit.save();

// ------------------------------------------

// const personSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
// });

// const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//     name: "Jalim Sales Rabei",
//     age: 33,
// });

// person.save();

// ----------------------------------------------

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema,
});

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
    name: "Pineapile",
    rating: 9,
    review: "Good"
});

pineapple.save();

const person = new Person({
    name: "Diva Gina Berta",
    age: 44,
    favoriteFruit: pineapple,
});

person.save();

// ------------------------------------------

const orange = new Fruit({
    name: "Orange",
    rating: 8,
    review: "good",
});

const apple = new Fruit({
    name: "Apple",
    rating: 3,
    review: "Terrible company",
});

const picole = new Fruit({
    name: "Picolé",
    rating: 11,
    review: "Melhor q fruta",
});

// Fruit.insertMany([orange, apple, picole], (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('fruits successfully saved');
//     }
// });

// -------------------------------------------

Fruit.find((err, data) => {
    if (err) {
        console.log(err);
    } else {
        //console.log(data);
        //data.forEach((fruit) => console.log(fruit.name));
    }
});

// --------------------------------------------

Fruit.updateOne({ name: "Banana" }, { review: "Otimo mt bom excelente dms bom" }, (err) => {
    if (err) console.log(err);
    else console.log('Successfully updated fruit');
});

Fruit.findOne({ name: "Banana" }, (err, fruit) => {
    if (err) console.log(err);
    else console.log(fruit);
});

Fruit.deleteOne({ name: "Picolé" }, (err) => {
    if (err) console.log(err);
    else console.log('Successfully deleted fruit');
});

// --------------------------------------------

Person.deleteMany({ age: 33 }, (err) => {
    if (err) console.log(err);
    else console.log('Successfully deleted people');
});

// --------------------------------------------

