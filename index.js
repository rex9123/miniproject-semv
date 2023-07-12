const express = require('express');
const dbConnect = require('./mongodb')
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5500, () => {
  console.log('Server started at port 5500');
});
