const express = require('express');
const chatController = require('../Controllers/chatController.js');

const router = express.Router();
// get request from front end to retrieve message history
router.get('/', chatController, (req, res) => {
  console.log('in chatRouter');
  res.status(200).json();
});

module.exports = router;
