const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://0.0.0.0:27017";

const dbName = "myDB";

// Create a new MongoClient
const client = new MongoClient(uri);

async function insertDocuments(db, callback) {
    const collection = db.collection('stuff');

    await collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ]);

    console.log("Inserted 3 documents ");

    await callback();
}

async function findDocuments(db, callback) {
    const collection = db.collection('stuff');

    const data = await collection.find({});

    console.log(data);

    await callback();
}

async function run() {

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    await findDocuments(db, async () => { await client.close() });

}

run().catch(console.dir);



