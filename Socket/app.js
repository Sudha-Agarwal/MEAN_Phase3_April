const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection',(socket) =>{
    console.log('a user connected');

    socket.on('disconnect', ()=>{
        console.log("user disconnected");
    })
});

http.listen(3000, function(){
    console.log("Listening");
})