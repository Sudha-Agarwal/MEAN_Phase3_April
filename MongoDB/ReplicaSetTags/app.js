const { MongoClient }  = require('mongodb');

const uri = "mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0";
//const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';
async function tags(){
const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

const db = client.db("mydb");
const collection = db.collection("users");

const query = {name:'abc'};

const tagSet = [{dc:'west', usage:'production'}];
const options = {readPreference: ['secondary', tagSet]}

const cursor = collection.find(query,options);

const documents = await cursor.toArray();
console.log(documents);

}
tags();
