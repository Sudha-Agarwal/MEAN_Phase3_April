const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const UserSchema = require('./users');



const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(uri)
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));


async function searchUser(){

  const User = mongoose.model('User', UserSchema);

  const users = [
    { name: 'Alice', age: 25, email: 'alice@gmail.com', active: true, hobbies: ['reading', 'swimming'] },
    { name: 'Bob', age: 30, email: 'bob@gmail.com', active: false, hobbies: ['running', 'hiking'] },
    { name: 'Charlie', age: 20, email: 'charlie@Gmail.com', active: true, hobbies: ['swimming', 'yoga'] },
    { name: 'David', age: 35, email: 'david@yahoo.com', active: true, hobbies: ['reading', 'hiking'] },
    { name: 'Eve', age: 28, email: 'eve@yahoo.com', active: false, hobbies: ['swimming', 'yoga'] }
  ];

  //await users.save();
  //const result = await User.find();

 const result = await User.insertMany(users);
 console.log(`${result.length} records insered`);


 //query builder function
 User.find().where('age').gte(18).lte(30)
 .where('email').regex(/@gmail\.com$/i)
 .where('active').equals(true)
 .where('hobbies').in(['swimming', 'running'])
 .sort('-age')
 .select('name age email hobbies')
 .limit(1).then(users => console.log(users))

  /*User.insertMany(users).then(()=>{
    User.find().where('age').gte(18).lte(30)
    .where('email').regex(/@gmail\.com$/i)
    .where('active').equals(true)
    .where('hobbies').in(['swimming', 'running'])
    .sort('-age')
    .select('name age email hobbies')
    .skip(1)
    .limit(10).then(users => console.log(users))
  });*/
}

function searchUser1(){
  const User = mongoose.model('User', UserSchema);

  User.find({
    $and:[
      {active:true},
      {age: {$gte:25, $lte:35}},
      {email: {$regex: /gmail\.com$/, $options:'i'}},
      {name : {$in: ["ALICE", "BOB"]}},
      {hobbies: {$all: ['reading','swimming']}}
    ]
  }).then(users => console.log(users));

}

function searchUser2(){
  const User = mongoose.model('User', UserSchema);

  User.find({
    $or:[
      { active:false },
      { age: { $gte:25, $lte:35}}
    ],
    $nor: [{ email:  {$regex: /gmail\.com$/, $options:'i'}}],
    $and: [
      { hobbies: { $exists:true}}
    ]
  }).select('name').then(data => console.log(data));

}

searchUser2();
