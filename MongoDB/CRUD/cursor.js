const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const UserSchema = require('./users');



const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';
//const uri = 'mongodb://127.0.0.1:27017/mydb';
mongoose.connect(uri)
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));


const User = mongoose.model("User", UserSchema);

const cursor = User.find().limit(2).cursor();

cursor.eachAsync((doc) => {
    console.log(doc)
}).then(() => {
    console.log("Finished iterating over all documents")
}).catch(err => console.log(err))