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
    titile:String,
    courseCode:String,
    courseDetail:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseDetail'
    }],
    instructor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Instructor'
    }
    ]
}, {strictPopulate:false});


const CourseDetail = mongoose.model("CourseDetail",courseDetailSchema);
const Instructor = mongoose.model("Instructor",instructorSchema);
const Course =  mongoose.model("Course",courseSchema);

async function insertData(){
    try{
        const courseDetail1 = new CourseDetail({
            description: 'Learn the basics of MongoDB',
            level: 'Beginner',
            prerequisites: 'None'
        });

        await courseDetail1.save();

        const courseDetail2 = new CourseDetail({
            description: 'Advanced Topics in MongoDB',
            level: 'Intermediate',
            prerequisites: 'Introduction to MongoDB'
        });
        await courseDetail2.save();

        const instructor1 = new Instructor({
            name:'Sudha',
            email:'sudha@gmail.com'

        });

        await instructor1.save();

        const instructor2 = new Instructor({
            name:'Sudha1',
            email:'sudha1@gmail.com'

        });

        await instructor2.save();

        const course = new Course({
            title: 'Introduction to MongoDB',
            courseCode:'M101',
            courseDetail:[courseDetail1._id, courseDetail2._id],
            instructor:[instructor1._id,instructor2._id]

        });

        await course.save();        
    }
    catch(err){
        console.log(err);
    }
}

async function getData(){
    try{
        Course.findOne({title:'Introduction to MongoDB'})
        .populate('courseDetail', 'description').populate('instructor')
        .then(course =>  console.log(course)).catch(err => console.log(err));       
    }
    catch(err){
        console.log(err);
    }
}

//insertData();
getData();