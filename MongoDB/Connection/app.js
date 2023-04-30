
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();


const uri = "mongodb+srv://sudhaagarwal84:zSdEkzzGjYnJIHbT@cluster0.gheldac.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', async(req,res) => {
    try{
    const database = client.db("myDb");
    const collection = database.collection("todo");

    //query the collection for all documents
    const documents = await collection.find().toArray();

    res.send(documents);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }

});

app.listen(3000, ()=>{
    console.log("Listening");
})
