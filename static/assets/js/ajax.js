const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = process.env.MONGO_URI;

MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true }, (err, client) => {

    if (err) throw err;

    const db = client.db("connect_recipes");

    db.collection('users').find({}).toArray().then((docs) => {

        console.log(docs);

    }).catch((err) => {

        console.log(err);
    }).finally(() => {

        client.close();
    });
});