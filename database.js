// database.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => console.error('MongoDB connection error:', error));

const db = mongoose.connection;

// In case we want to add event listeners
db.on('error', (error) => {
    console.error('MongoDB error:', error);
});
