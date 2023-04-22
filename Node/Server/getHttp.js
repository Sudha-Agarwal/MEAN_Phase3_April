/*const https = require('https');

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp)=>{

let data = '';

resp.on('data', (chunk)=>{
    data += chunk;
});

resp.on('end',()=>{
    console.log(JSON.parse(data));
} )

});


const request = require('request');
const { json } = require('stream/consumers');
request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {json:true},(err, res, body) =>{
    if(err){
        console.log(err);       
        return; 
    }

    console.log(body.url);
    console.log(body.explanation);


}).on("error", err =>{
    console.log("Error " + err.message);
});*/

//console.log("Axios");

const axios = require('axios');

//for TS
//import axios from 'axios';

axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
.then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);

}).catch(error => {
    console.log(error);
});


//sending multiple requests using axios

axios.all([
    axios.get(url),
    axios.get(url)
]).then(axios.spread((response1, response2) =>{
    console.log(response1.data);
    console.log(response2.data)
})).catch(error => console.log(error));

