import * as http from 'http';

const host = 'localhost';
const port =8000;

const requestListner = function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("My First server");
}

const server = http.createServer(requestListner);

server.listen(port,host, ()=>{
    console.log(`server is running on ${port}`);
})