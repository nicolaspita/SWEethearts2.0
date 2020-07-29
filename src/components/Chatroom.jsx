import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import socket from 'socket.io';

const Chatroom = (props) => {
  return (
    <div>
      <h1>This is a Chatroom!</h1>
    </div>
  )
}

export default Chatroom;