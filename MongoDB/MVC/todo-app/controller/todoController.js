const Todo = require('../model/todo');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const password = process.env.ATLAS_PASSWORD;


mongoose.connect(`mongodb+srv://sudhaagarwal84:${password}@cluster0.gheldac.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));

const database = mongoose.connection.useDb("myDb");
const collection = database.collection("todo");

exports.getTodos = async(req,res) => {
    try{
        const todos = await collection.find().toArray();
        res.render('index', {todos});
    }
    catch(err){
        console.log(err)
    }
   
};

exports.createTodo = async (req,res) => {
    console.log(req.body);

    try{
        const { title, description} = req.body;
        const todo = new Todo({
            title,description
        });
        await todo.validate();
        const result = await collection.insertOne(todo);
        console.log(`${result.insertedId}`);
    }
    catch(error){
        console.log(error);
    }
    res.redirect('/');

};

exports.updateTodo = async (req,res) => {
    console.log(req.params.id);
    const {id} = req.params;
    console.log(id);

    const result = await collection.updateOne({_id: new mongoose.Types.ObjectId(id)},{$set : {'status' : 'completed'}});
    console.log(`${result.modifiedCount} document was updated`);

    res.redirect('/');

}

exports.deleteTodo = async (req,res) => {
   
    const {id} = req.params;
   

    const result = await collection.deleteOne({_id: new mongoose.Types.ObjectId(id)});
    console.log(`${result.deletedCount} document was deleted`);

    res.redirect('/');

}

