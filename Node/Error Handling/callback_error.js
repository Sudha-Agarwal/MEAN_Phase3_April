//synchronous
/*try{
    throw new Error("Error");
}
catch(err){
    console.log("Error " + err);

}*/

//asynchronous
/*try{
    setTimeout(() => {
        throw new Error("Error");
    },0)
}
catch(err){
    console.log("Caught Error");
}
*/

const fs = require('fs');

fs.readFile('abc1.txt', 'utf-8', (err,result) =>{
    if(err){
        console.log("Error");
        return;
    }

    console.log(result);
});


const fs1 = require('fs').promises;

fs1.readFile('abc1.txt', 'utf-8')
.then(data => console.log(data)).catch(err=> console.log("Err"));

console.log('End');
