// Create the page for the chat

import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // retrieving data from the url
import io from 'socket.io-client/dist/socket.io';
import { withRouter } from 'react-router';

// Importing components
import InfoBar from './InfoBar';
import Messages from './Messages';
import Input from './Input';
import TextContainer from './TextContainer';

import './css/Chat.css';

let socket;

const Chat = ({ location }) => {
<<<<<<< HEAD
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
<<<<<<< HEAD


  // storing the array of messages -- need to make a request to fill up this array of messages
  // axios request to get all the messages to store inside the state
=======
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // this stores all the messages in an array in state

  console.log('IN CHAT: ', location.state.oldMessages);

  // ! UseEffect for user joining the room
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io('localhost:3000');
    // setting the name and the room
    setName(name);
    setRoom(room);
<<<<<<< HEAD

    socket.emit('join', {name, room}, () => {

    }); // same as name: name. Sends name and room to server

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, ['localhost:3000', location.search]) // useEffect will trigger when values in array update


  // useEffect(() => {
  //   // make axios request that will access table with all chat messages
  //   axios.get('/api/joinchat')
  //     .then((req, res) => {
  //       console.log('req', req);
  //       console.log('res', res);
  //     })
  //     .catch(err => console.log(err));
  //   })
    // make query to table with chat messages -- filtered based off of room which is in state
    /*
     INSERT INTO chat_messages (user_id, room_id, messages) 
     VALUES (user_id, room, {messages})
    */

=======
    for (let i = 0; i <location.state.oldMessages.length; i++){
      location.state.oldMessages[i].user = location.state.oldMessages[i].user_id
      location.state.oldMessages[i].text = location.state.oldMessages[i].messages
    }
    console.log('CHAT 2: ', location.state.oldMessages);
    // const {user_id, date, messages} = location.state.oldMessages
    setMessages(location.state.oldMessages);
    
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0

    

<<<<<<< HEAD
=======

>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0

    socket.emit('join', { name, room }, () => {}); // same as name: name. Sends name and room to server

<<<<<<< HEAD
=======
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
=======
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]); // this stores all the messages in an array in state

	// ! UseEffect for user joining the room
	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io('localhost:3000');
		// setting the name and the room
		setName(name);
		setRoom(room);
		socket.emit('join', { name, room }, () => {}); // same as name: name. Sends name and room to server
		return () => {
			socket.emit('disconnect');
			socket.off();
		};
>>>>>>> 8e1cb47addd635e6ea0ad92afd4262129202f9c0
  }, ['localhost:3000', location.search]); // useEffect will trigger when values in array update
  

<<<<<<< HEAD
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
  // ! UseEffect for user sending a message
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

<<<<<<< HEAD

  // ! function for sending message -- also do an axios request
=======
  // function for sending message
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

<<<<<<< HEAD
=======
  console.log(message);
  console.log(messages);

>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
  // ! JSX
  return (
    <div className="outerContainer">
      <div className="container2">
<<<<<<< HEAD
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
=======
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
      </div>
      {/* <TextContainer/> */}
      {/* <TextContainer users={users}/> */}
    </div>
  );
=======
  // ! UseEffect to populate messages
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log("this is room " + room)
    // create the fetch request
    fetch('/api/joinchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({room})
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++){
          data[i].user = data[i].username
          data[i].text = data[i].messages
        }
        console.log("this is data: " , data)
        setMessages(data);
      });
  }, []);


	// ! UseEffect for user sending a message. also send each message to hte database
	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	// function for sending message
	const sendMessage = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	console.log(message);
	console.log("this is end result message " + messages);

	// ! JSX
	return (
		<div className="outerContainer">
			<div className="container2">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			{/* <TextContainer/> */}
			{/* <TextContainer users={users}/> */}
		</div>
	);
>>>>>>> 8e1cb47addd635e6ea0ad92afd4262129202f9c0
};

export default withRouter(Chat);
