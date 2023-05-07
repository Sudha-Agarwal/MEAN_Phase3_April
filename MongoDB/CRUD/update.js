const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User1 = require('./user1');



//const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';
const uri = 'mongodb://127.0.0.1:27017/mydb';
mongoose.connect(uri)
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));

async function insertData(){
    const users = [
        {
          name: 'John',
          age: 30,
          address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY'
          }
        },
        {
          name: 'Jane',
          age: 25,
          address: {
            street: '456 Elm St',
            city: 'Los Angeles',
            state: 'CA'
          }
        },
        {
          name: 'Bob',
          age: 40,
          address: {
            street: '789 Oak St',
            city: 'San Francisco',
            state: 'CA'
          }
        },
        {
          name: 'Alice',
          age: 27,
          address: {
            street: '101 Maple Ave',
            city: 'Chicago',
            state: 'IL'
          }
        },
        {
          name: 'Mike',
          age: 35,
          address: {
            street: '222 Pine St',
            city: 'Seattle',
            state: 'WA'
          }
        }
      ];

      const result = await User1.insertMany(users);
      console.log(`${result.length} records inserted`)
}

function update1(){
    User1.updateMany({name:'John'}, {age:25})
    .then(res => console.log(res));
}

async function update2(){
    const res = await User1.updateMany({name:'John'}, {$set: { 'address.city': 'New York1'}})
    console.log(res.modifiedCount);

    //increment
    const res1 = await User1.updateMany({name:'John'}, {$inc: { age : 1}});
    console.log(res1.modifiedCount);

    //unset
    const res2 = await User1.updateMany({name:'John'}, {$unset: { age: 1}});
    console.log(res2.modifiedCount);
}

async function update3(){
    const res = await User1.updateOne({name:'John1'}, {$set: {gender: 'female'}},{upsert:true});
    console.log(res);
}

async function update4(){
    const res = await User1.updateOne({name : 'John'} , {$push : {hobbies: 'running'}});
    console.log(res);
}

async function update5(){
    const res = await User1.updateOne({name: 'John', hobbies:'running'}, 
    {$set: {'hobbies.$':'running1'}});
    console.log(res);
}

//insertData();
update1();
