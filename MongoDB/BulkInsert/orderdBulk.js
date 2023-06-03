const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';

const dbName = 'mydb';

const client = new MongoClient(uri);

async function main(){
    await client.connect();
    console.log("connected");

    const db = client.db(dbName);
    const orders = db.collection('orders');

    const bulkOperation = orders.initializeOrderedBulkOp();
    bulkOperation.insert({customer:'abc', amount:100});
    bulkOperation.insert({customer:'abc1', amount:200});

    //execute the bulk operation
    bulkOperation.execute()
    .then(res => console.log("Ordered Bulk insert Result" + res))
    .catch(err => console.log("Error executing bulk insert" + err))


}

main();