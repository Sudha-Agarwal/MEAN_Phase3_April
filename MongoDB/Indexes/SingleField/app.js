const { MongoClient }  = require('mongodb');

const uri = "mongodb://localhost:27017/mydb";

const client = new MongoClient(uri);

client.connect().then(() => console.log("DB connected"));

const courses = [
    {
      name: 'MongoDB for Beginners',
      coursedetails: {
        description: 'An introduction to MongoDB for beginners',
        duration: 10
      },
      instructor: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    },
    {
      name: 'MongoDB for Developers',
      coursedetails: {
        description: 'A course on MongoDB for developers',
        duration: 20
      },
      instructor: {
        name: 'Jane Smith',
        email: 'janesmith@example.com'
      }
    },
    {
      name: 'MongoDB for Administrators',
      coursedetails: {
        description: 'A course on MongoDB for administrators',
        duration: 15
      },
      instructor: {
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com'
      }
    }
  ];

  const db = client.db("mydb");
  const courseCollection = db.collection("course");

  async function insertData(){
    const result = await courseCollection.insertMany(courses);
    console.log(result);
  }

  function createIndex(){
    courseCollection.createIndex({"coursedetails.duration": 1}).then(data => console.log(data));
  }

  function findData(){
    courseCollection.find({'coursedetails.duration' : {$lt:15} }).explain().then(res => console.log(res));
  }
  
  //insertData()
  //createIndex();
  findData();