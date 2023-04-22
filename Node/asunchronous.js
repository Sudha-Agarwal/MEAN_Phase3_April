console.log('start');
setTimeout(()=>{
    console.log('Timeout');
},0);
Promise.resolve('Promise').then(res=>console.log(res));

async function getData(){
    console.log('Inside async');
    let res = await Promise.resolve('Promise with async');
    console.log('async await');
    console.log(res);
}
console.log('before function')
getData();
console.log('after function');
console.log('End');