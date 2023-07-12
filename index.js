const express = require('express');
const app = express();
const connectToMongoDB = require('./mongodb');
const { body, validationResult } = require('express-validator');
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  // Call the connectToMongoDB function and perform the insert operation
  connectToMongoDB((db) => {
    const collection = db.collection('users');
    collection.insertOne({ username, password }, (err, result) => {
      if (err) {
        console.error('Failed to insert user:', err);
        return res.status(500).json({ message: 'Failed to insert user' });
      }

      return res.status(200).json({ message: 'User inserted successfully' });
    });
  });
});

app.listen(5500, () => {
  console.log('Server started at port 5500');
});
