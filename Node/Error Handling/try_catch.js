var fs = require('fs');


//will work in the case of synchronous code
try{
    const data = fs.readFileSync('abc.txt', 'utf-8');
    console.log(data);
}
catch(err){
    console.log("Error");
}

console.log("End");
