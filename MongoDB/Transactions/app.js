const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net?retryWrites=true&w=majority';

async function runTransaction(){
    const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

let session;
try{

    //start a session
    session = client.startSession();
    const db = client.db("mydb1");
    const coll = db.collection('users');

    //start a transaction
    session.startTransaction();

    //perform some operations within the transaction
    const result = await coll.insertOne({name:"abc"}, {session});

    console.log("Inserted document" + result.insertedId);

    //simulate an error
    throw new Error("Transaction Error");

    await session.commitTransaction();
    console.log("transaction committed");
}
catch(err){
    console.log("error occured, rolling back transaction" + err);

    //rollback the transaction
    await session.abortTransaction();
}
finally{
    await session.endSession();
    await client.close();

}

}

runTransaction().catch(err => console.log(err))


