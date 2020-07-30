const express = require('express');
const path = require('path'); // for chat
const http = require('http'); // for chat
const app = express();
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const model = require('./Models/model');
const signUpRouter = require('./Routers/signupRouter');
const exploreRouter = require('./Routers/exploreRouter');
const submitRouter = require('./Routers/submitRouter');
const loginRouter = require('./Routers/loginRouter');
const profileRouter = require('./Routers/profileRouter');
<<<<<<< HEAD
const chatRouter = require('./Controllers/chatController');
=======
const chatRouter = require('./Routers/chatRouter');
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
const flash = require('express-flash');
const initializePassport = require('./passport');
const passport = require('passport');
initializePassport(passport);
require('dotenv').config();
const PORT = 3000;

// cors update
const cors = require('cors');

app.use(cors());

// socket
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const server = http.createServer(app);
const io = socketio(server); // Socket.io -> make server working

// ! Implementing web sockets
io.on('connection', (socket) => {
<<<<<<< HEAD
  // TODO: Make the connection to the database and load in data relevant to room
  console.log("We Have a new connection!!!")

  // socket.on will listen for events (emit 'join')
  socket.on('join' , ({name, room }, callback) => { // get data from the client to server
    const {error, user} = addUser({id: socket.id, name, room}) // returns either error or a user
    // add logic here to query the database

    // query to check existing room
    const roomQuery = `
    INSERT INTO chat_messages (room_id)
    SELECT ${room}
    WHERE
      NOT EXISTS (SELECT room_id FROM chat_messages WHERE room_id = ${room})`;

    model.query(roomQuery, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('roomquery good');
    });

    // query here to retrieve old messages
    const messageQuery = `
    SELECT room_id, messages FROM chat_messages
    WHERE room_id = ${room}
    `;

    model.query(messageQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
      messageHistory = result.rows[0].messages;
      console.log('in msg query', messageHistory);
    });

    if(error) return callback(error);
    //iterate through the messageHistory 
    // messageHistory.forEach(msg => {
    //   socket.emit('message', {user: user.name, text: msg});
    // });
    // socket.emit('message', {user: 'admin', text: messageHistory });
    socket.emit('message' , {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin' , text: `${user.name}, has joined`})
=======
  console.log('We Have a new connection!!!');

  // socket.on will listen for events (emit 'join')
  socket.on('join', ({ name, room }, callback) => {
    // get data from the client to server
    const { error, user } = addUser({ id: socket.id, name, room }); // returns either error or a user

    if (error) return callback(error);

    // ! socket built in methods
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}, has joined` });

>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
    socket.join(user.room);
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    // const user = getUser(socket.id) // specific instance of the user's id
    const user = getUser(socket.id);
    console.log(message, user);
    io.to(user.room).emit('message', {user: user.name, text: message});

<<<<<<< HEAD
    // TODO: SEND THE MESSAGE TO THE DATA BASE TO user.room with the user.name and the message
    const queryText = 
    `
    UPDATE chat_messages
    SET messages = array_append(messages, '${message}')
    WHERE room_id = ${user.room};
    `;

    model.query(queryText, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('msg db query good');
    })
=======
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
  });

  socket.on('disconnect', () => {
    console.log('User had left!!!');
<<<<<<< HEAD
  })

})



=======
  });
});
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0

/*
 * Handle parsing request body
 */
app.use(express.json());
// allow cors
// app.use(
// 	cors({
// 		origin: `http://localhost:8080`, // allow to server to accept request from different origin
// 		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// 		credentials: true, // allow session cookie from browser to pass through
// 	})
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/api/login', loginRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/submit', submitRouter);
app.use('/api/profile', profileRouter);
<<<<<<< HEAD
// app.use('/api/joinchat', chatRouter);


=======
app.use('/api/joinchat', chatRouter);
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
// globoal error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/*
 * Start server
 */
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
