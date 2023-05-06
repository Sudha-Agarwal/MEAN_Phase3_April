const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(uri)
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));

const courseDetailSchema = new mongoose.Schema({
    description:String,
    level: String,
    prerequisites:String
});

const instructorSchema = new mongoose.Schema({
    name:String,
    email:String
});

const courseSchema = new mongoose.Schema({
    title:String,
    courseCode:String,
    details:courseDetailSchema,
    instructors:[instructorSchema]
},{collection:'coursesMongo'});

const Course = mongoose.model('Course', courseSchema);


async function insertData(){

    const course = new Course({
        title:'Introduction to MongoDB',
        courseCode: 'M101',
        details:{
            description: 'Learn the basics of MongoDB',
            level: 'Beginner',
            prerequisites: 'None'
        },
        instructors:[
            {
                name:'Sudha',
                email:'sudha@gmail.com'
            },
            {
                name:'Sudha1',
                email:'sudha1@gmail.com'
            }
        ]
    });

    try{
        await course.save();
    }
    catch(err){
        console.log(err)
    }

    finally{
        await mongoose.disconnect();
        console.log("disconnected")
    }
}

insertData();


