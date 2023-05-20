const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

const db = client.db('mydb');
const books = db.collection("books");

/*books.createIndex({description : "text"}).then( res => {
    books.find({$text: {$search : "injustice"}}).toArray().then(data => console.log(data))
});*/

//wildcard text index
books.createIndex({"$**" : "text"}).then(() => {
    console.log("wildcard index created");

    books.find({$text: {$search: 'pride'}}).toArray().then(data => console.log(data));

})



