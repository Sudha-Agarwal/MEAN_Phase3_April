const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function checkIndex(){
await client.connect({useUnifiedTopology:true});

    const db = client.db('mydb');
const collection = db.collection("myCollection");

//ensure that the index is present by using indexes() method
const indexes = await collection.indexes();
const indexName = indexes.map(index => index.name);

if(!indexName.includes('myindex')){
    const res = await collection.createIndex({myfield:1}, {name:'myindex'});
    console.log(res);
}

await collection.dropIndexes();//will drop all the indexes excluding the _id index

//or we can drop a specific index also
await collection.dropIndex('myindex');

}

checkIndex();