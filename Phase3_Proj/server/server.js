const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());

// Enable CORS middleware
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.51:4200'); // Replace with your Angular application URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});*/
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true // Optional: Allow sending cookies with Socket.io requests
  }
});
//const io = socketIO(server);

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chat_portal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a schema for the chat messages
const messageSchema = new mongoose.Schema({
  user: String,
  content: String,
  roomId: String,
  timestamp: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Create a schema for users
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model based on the schema
const User = mongoose.model('user', userSchema);

// Create a schema for joined users
const joinedUserSchema = new mongoose.Schema({
  username: String, 
  chatRoom: {
    type: String   
  }
});

// Create a model based on the joineduser schema
const joinedUser = mongoose.model('joinedUser', joinedUserSchema);


async function getJoinedUsers(chatRoom,username) {
  try {
    console.log("room " + chatRoom);
    const joinedUsers = await joinedUser.find({chatRoom: chatRoom}, 'username');
    console.log("joined: " + joinedUsers);
    const usernames = joinedUsers.map(joinedUser => joinedUser.username);
    return usernames;
  } catch (error) {
    console.error('Error retrieving joined users:', error);
    throw error;
  }
}
// Configure Socket.io
io.on('connection', async(socket) => {
  console.log('User connected');
  // Get the username from the client-side
  const username = socket.handshake.query.username;
  const chatRoom = socket.handshake.query.chatRoom;
  
// Delete the existing records for the given username and chatroom
await joinedUser.deleteMany({ username: username, chatRoom: chatRoom });

  // Save the user in the database
 // Create a new instance of the joinedUser model and save it to the database
 const joineduser = new joinedUser({ username: username, chatRoom: chatRoom });
 joineduser.save()
   .then(() => {
     console.log(username + ' User joined successfully');    
     socket.join(chatRoom); 
     // Emit a "userJoined" event to all connected sockets except the newly joined socket
     socket.broadcast.to(chatRoom).emit('userJoined', username);
     // Additional logic after the user has joined
   })
   .catch(error => {
     console.error('Error joining user:', error);
     // Handle the error appropriately
   });

  // Emit an event to the current connection with the list of joined users
  try {
    const joinedUsers = await getJoinedUsers(chatRoom);
    console.log(joinedUsers)
    socket.emit('joinedUsers', joinedUsers);
   
  } catch (error) {
    console.error('Error retrieving joined users:', error);
    // Handle the error appropriately
  }
  
  // Handle new messages
  socket.on('newMessage', (message) => {
    const newMessage = new Message({
      user: message.user,
      content: message.content
    });    
    //Broadcast the message to all connected clients
    io.emit('newMessage', newMessage);

    /*newMessage.save()
      .then(() => {
        io.emit('newMessage', newMessage); // Broadcast the message to all connected clients
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      }); */
  });

  socket.on('leaveChatRoom', async () => {
    // Remove user from chat room
    //const chatRoom = Object.keys(socket.rooms)[1]; // Assumes the first room is the default room
    socket.leave(chatRoom);
    console.log(`${username} left chat room: ${chatRoom}`);
    await joinedUser.deleteMany({ username: username, chatRoom: chatRoom });
    socket.join(chatRoom); 
    socket.broadcast.to(chatRoom).emit('userLeft', username);

    
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected');    
  });
});

// Register route
app.post('/register', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      const newUser = new User({
        username,
        password: hashedPassword
      });

      newUser.save()
        .then(() => {
          res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => console.error('Error hashing password'));
});


// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
      } else {
        bcrypt.compare(password, user.password)
          .then((match) => {
            if (!match) {
              res.status(401).json({ error: 'Invalid username or password' });
            } else {
              const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
              res.status(200).json({ token: token, username: username });
            }
          })
          .catch((error) => {
            console.error('Error comparing passwords:', error);
            res.status(500).json({ error: 'Internal server error' });
          });
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// GET /chat-rooms endpoint
app.get('/chat-rooms', (req, res) => {
  // Fetch the list of chat rooms from the database
  const chatRooms = [
    'Room 1',
    'Room 2',
    'Room 3'
  ];

  res.json({ chatRooms });
});


// API endpoint to get messages of a specific chat room
app.get('/chat-rooms/:roomId', async (req, res) => {
  console.log("gett")
  const roomId = req.params.roomId;
  console.log(roomId);

  try {
    // Fetch messages for the specified room from the database
    const messages = await Message.find({ roomId: roomId });
    res.json({chatMessages: messages});
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});


// API endpoint to store a message in a specific chat room
app.post('/chat-rooms/:roomId/messages', async (req, res) => {
  const roomId = req.params.roomId;
  const { content, user } = req.body;
  console.log(req.body);

  try {
    // Create a new message instance
    const message = new Message({
      roomId: roomId,
      content: content,
      user: user
    });

    // Save the message to the database
    await message.save();

    res.json({chatMessages: message});
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ error: 'Failed to store message' });
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
