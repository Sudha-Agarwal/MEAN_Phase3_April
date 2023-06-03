const { MongoClient }  = require('mongodb');

//const uri = "mongodb://127.0.0.1:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net?retryWrites=true&w=majority';

async function runTransaction(){
    const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

let session;
try{

    //start a session
    session = client.startSession();
    const db = client.db("mydb1");
    const orders = db.collection('orders');
    const inventory = db.collection('inventory');    

    //start a transaction
    session.startTransaction();

    const product = 'product123';
    const quantityToDeduct = 1;

    await inventory.updateOne(
        {product},
        {$inc : {quantity: -quantityToDeduct}},
        {session}
    );

    await orders.insertOne(
        { product, quantity: quantityToDeduct }, {session})

    const res = await session.commitTransaction().catch(() => {
        session.abortTransaction();
    });

    if(res) {
        await session.commitTransaction();
        console.log("transaction committed");
    }
    else{
        await session.abortTransaction();
        await session.endSession();
        console.log("transaction aborted");
    }   
}
finally{
    await session.endSession();
    await client.close();

}

}

runTransaction().catch(err => console.log(err))


