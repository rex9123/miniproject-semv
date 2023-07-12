const url = 'mongodb://0.0.0.0:27017'; // Update with your MongoDB connection URL
const dbName = 'users1'; // Update with your database name
const { MongoClient } = require('mongodb');

// Create a reusable function to establish the connection and return the db object
const connectToMongoDB = (callback) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Failed to connect to MongoDB:', err);
      return;
    }

    console.log('Connected to MongoDB successfully');

    const db = client.db(dbName);
    callback(db); // Invoke the callback function with the db object
  });
};

module.exports = connectToMongoDB;
