const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const UserSchema = require('./users');
const app = express();

app.use(cors());

const uri = 'mongodb://127.0.0.1:27017/mydb';
//mongodb://localhost:27017
//const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));


const User = mongoose.model("User", UserSchema);

app.get('/api/users', async(req,res) => {
    const page = parseInt(req.query.skip) || 1;
    const limit = parseInt(req.query.limit) || 2;

    var startIndex = page;

    if(page == 1){
        startIndex = 0;
    }
    else{
        startIndex = (page-1) * limit;
    }

    const endIndex = page * limit;
    
    try{
        const Users = await User.find().skip(startIndex).limit(2);
        res.send(Users);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    };
    
})

app.get('*', (req,res)=>{
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("listening");
})