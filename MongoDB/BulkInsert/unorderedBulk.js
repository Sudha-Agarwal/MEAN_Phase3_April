const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';

const dbName = 'mydb';

const client = new MongoClient(uri);

async function main(){
    await client.connect();
    console.log("connected");

    const db = client.db(dbName);
    const orders = db.collection('orders');

    const bulkOperation = orders.initializeUnorderedBulkOp();
    bulkOperation.insert({customer:'abc_u', amount:100});
    bulkOperation.insert({customer:'abc1_u', amount:200});

    //execute the bulk operation
    bulkOperation.execute()
    .then(res => console.log("Unordered Bulk insert done"))
    .catch(err => console.log("Error executing bulk insert" + err))


}

main();