const { MongoClient }  = require('mongodb');

const uri = "mongodb://localhost:27017";
//const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect({useUnifiedTopology:false}).then(() => console.log("DB connected"));

const db = client.db('mydb');
const logs = db.collection("logs");

logs.insertOne({
    "created_at": new Date(),
    "message" : "This is a log message"
}).then(data => console.log("record inserted"));

logs.createIndex({'created_at' :1}, {expireAfterSeconds: 10}).then(() => console.log("index created"));