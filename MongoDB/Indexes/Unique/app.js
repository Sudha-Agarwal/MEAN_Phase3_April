const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

const db = client.db('mydb');
const users = db.collection("users");

//create a unique index on the email field

users.createIndex({email : 1}, {unique: true, background: true})
.then(data => {
    console.log(data);
    users.insertOne({name:'abc', email: 'johndoe2334@example.com'}).catch(err => console.log(err))

})

//partial index
users.createIndex({age: 1},
    {partialFilterExpression : {age: {$gt:25}}})
.catch(err => console.log(err));


