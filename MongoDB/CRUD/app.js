const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(uri)
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));


async function searchUser(){
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
     
    },
    active: {
      type: Boolean,
      required: true
    },
    hobbies:[String]
  });
  const User = mongoose.model('User', UserSchema);
  UserSchema.pre('save', function(next){
    this.name = this.name.toUpperCase();
    next();//to call next hook
  })

  UserSchema.post('find', function(docs){
    console.log(`Found ${docs.length} users`);
  });  

  const users = new User(
    { name: 'Alice', age: 25, email: 'alice@gmail.com', active: true, hobbies: ['reading', 'swimming'] }
    /*{ name: 'Bob', age: 30, email: 'bob@gmail.com', active: false, hobbies: ['running', 'hiking'] },
    { name: 'Charlie', age: 20, email: 'charlie@Gmail.com', active: true, hobbies: ['swimming', 'yoga'] },
    { name: 'David', age: 35, email: 'david@yahoo.com', active: true, hobbies: ['reading', 'hiking'] },
    { name: 'Eve', age: 28, email: 'eve@yahoo.com', active: false, hobbies: ['swimming', 'yoga'] }*/
  );

  await users.save();
  const result = await User.find();

  /*User.insertMany(users).then(()=>{
    User.find().where('age').gte(18).lte(30)
    .where('email').regex(/@gmail\.com$/i)
    .where('active').equals(true)
    .where('hobbies').in(['swimming', 'running'])
    .sort('-age')
    .select('name age email hobbies')
    .limit(1).then(users => console.log(users))
  });*/
}

searchUser();