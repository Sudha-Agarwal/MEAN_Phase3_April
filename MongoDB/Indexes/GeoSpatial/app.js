const { MongoClient }  = require('mongodb');

//const uri = "mongodb://localhost:27017";
const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect({useUnifiedTopology:true}).then(() => console.log("DB connected"));

const db = client.db("mydb");
  const places = db.collection("places");

async function insertData(){

    const result = places.insertMany([

        {
            //GeoJSONData
            loc : {type: "Point", coordinates:[-73.97, 40.77]},
            name:'Central park',
            category:"Parks"
        },
        {
             //GeoJSONData
             loc : {type: "Point", coordinates:[-73.88, 40.78]},
             name:'La Guardia Airport',
             category:"Airport"
        }
    ]);
    console.log(result);

}

async function createIndex(){
    places.createIndex({loc:'2dspehere'});
}

async function queryIndex(){
    places.find({
        loc:{
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [-73.88,40.78]
                },
                $maxDistance: 500                
            }
        }
    }).toArray().then(data => console.log(data));

    places.find({
        loc: {
            $geoWithin: {
                $box: [
                    [-74.01, 40.70],
                    [-73.90,40.86]
                ]
            }
        }
    }).toArray().then(data => console.log(data));
}

queryIndex();