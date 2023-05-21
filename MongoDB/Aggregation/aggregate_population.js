const { MongoClient } = require('mongodb');

//const uri = 'mongodb://localhost:27017/mydb';
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority'
//const uri = 'mongodb://localhost:27017/mydb'

const client = new MongoClient(uri);
client.connect()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));
const db = client.db("mydb");
const cities = db.collection("cities");

async function insertData(){

    const res = await cities.insertMany([
        {"name": "Seoul", "country": "South Korea", "continent": "Asia", "population": 25.674 },
        {"name": "Mumbai", "country": "India", "continent": "Asia", "population": 19.980 },
        {"name": "Lagos", "country": "Nigeria", "continent": "Africa", "population": 13.463 },
        {"name": "Beijing", "country": "China", "continent": "Asia", "population": 19.618 },
        {"name": "Shanghai", "country": "China", "continent": "Asia", "population": 25.582 },
        {"name": "Osaka", "country": "Japan", "continent": "Asia", "population": 19.281 },
        {"name": "Cairo", "country": "Egypt", "continent": "Africa", "population": 20.076 },
        {"name": "Tokyo", "country": "Japan", "continent": "Asia", "population": 37.400 },
        {"name": "Karachi", "country": "Pakistan", "continent": "Asia", "population": 15.400 },
        {"name": "Dhaka", "country": "Bangladesh", "continent": "Asia", "population": 19.578 },
        {"name": "Rio de Janeiro", "country": "Brazil", "continent": "South America", "population": 13.293 },
        {"name": "São Paulo", "country": "Brazil", "continent": "South America", "population": 21.650 },
        {"name": "Mexico City", "country": "Mexico", "continent": "North America", "population": 21.581 },
        {"name": "Delhi", "country": "India", "continent": "Asia", "population": 28.514 },
        {"name": "Buenos Aires", "country": "Argentina", "continent": "South America", "population": 14.967 },
        {"name": "Kolkata", "country": "India", "continent": "Asia", "population": 14.681 },
        {"name": "New York", "country": "United States", "continent": "North America", "population": 18.819 },
        {"name": "Manila", "country": "Philippines", "continent": "Asia", "population": 13.482 },
        {"name": "Chongqing", "country": "China", "continent": "Asia", "population": 14.838 },
        {"name": "Istanbul", "country": "Turkey", "continent": "Europe", "population": 14.751 }
    ])
};

async function aggregateData(){
    const res = await cities.aggregate([
        { $match: { "continent": { $in: ["North America", "Asia"]}}},
        { $group: {"_id" : {            
            "continent": "$continent"       
        } ,
        "sum_population" : {$sum: "$population"}      
        }},
        {$sort: {"sum_population" : -1}},
        {$match: {sum_population : {$gte: 100}}},
        {$project: {_id:0, continent:"$_id.continent", sum_population: 1}}
    ]);

    for await (const record of res){
        console.log(JSON.stringify(record));
    }

    

}

//insertData();
aggregateData();