const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

const db = client.db("mydb");
  const courseCollection = db.collection("course");

//creating compound indexes
courseCollection.createIndex({'coursedetails.duration' : 1, 'instructor.name' : 1},{name:'compound_index'});


