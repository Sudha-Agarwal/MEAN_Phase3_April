const mongoose = require('mongoose');

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

  UserSchema.pre('insertMany', function(next, docs) {
    for (let i = 0; i < docs.length; i++) {
      docs[i].name = docs[i].name.toUpperCase();
    }
    next();
  });
  
UserSchema.pre('save' , function(next){
  this.name = this.name.toUpperCase();
});


  UserSchema.post('find', function(docs){
    console.log(`Found ${docs.length} users`);
  });  

  module.exports = UserSchema;