import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
import axios from 'axios';

import './css/Join.css';
import {withRouter} from "react-router"

const JoinChat = (props) => {

  console.log(props.location.state.idea_id)
  const room = props.location.state.idea_id

  const [name, setName] = useState('');
  // const [room, setRoom] = useState(''); 

  useEffect(() => {
    // make axios request that will access table with all chat messages
    fetch('api/joinchat', {
      method: 'POST',
    })
    })
=======
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './css/Join.css';
// import { withRouter } from 'react-router';

const JoinChat = (props) => {
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([{ oldMessages: [] }]);

  //const [room, setRoom] = useState('');
  const room = props.location.state.idea_id;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    fetch('/api/joinchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room })
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages({ oldMessages: data });
        console.log('FETCH MESSAGES: ', messages);
      });
  }, [name]);
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
<<<<<<< HEAD
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
=======
        <div>
          {/* <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          /> */}
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={{
            pathname: `/chat?name=${name}&room=${room}`,
            state: messages
          }}
        >
          <button className={'button mt-20'} type="submit">
            Sign In
          </button>
>>>>>>> 78c27691f356f9281d96c36c7ec87884a4b71ae0
        </Link>
      </div>
    </div>
  );
};

export default withRouter(JoinChat);
