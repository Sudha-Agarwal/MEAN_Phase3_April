let url = "https://jsonplaceholder.typicode.com/todos/1";

async function getData(url){
    let response = await fetch(url);
    return response;
}

console.log(getData(url));

getData(url).then(res =>res.json().then(res=>console.log(res)));