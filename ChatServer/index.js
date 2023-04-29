const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

/*app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});*/

app.use(express.static('public'));

io.on('connection',(socket) =>{
    console.log('a user connected');

    socket.on('chat message', (msg) =>{
        console.log(msg);

        if(msg === 'hi'){
            io.emit('chat message', "How are you?")
        }
        else{
            io.emit('chat message', "from server");
        }
    })

    socket.on('disconnect', ()=>{
        console.log("user disconnected");
    })
});

http.listen(3000, function(){
    console.log("Listening");
})

