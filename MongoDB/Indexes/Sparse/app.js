const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function createSparseIndex(){
await client.connect({useUnifiedTopology:true});

    const db = client.db('mydb');
const users = db.collection("users");

//create a sparse index on the 'hobbies' field

await users.createIndex({hobbies:1},{sparse:true, name:'sparse-hobbies'});

console.log("index created");

const result = users.find({hobbies: {$exists: true}}).toArray().then(data => console.log(data));

console.log(result);

}

createSparseIndex();