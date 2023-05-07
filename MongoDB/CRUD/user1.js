const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: {
      street: String,
      city: String,
      state: String
    }
  }, {strict : false});
  
  module.exports = mongoose.model('User1', userSchema);