//server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Require the database connection
require('./database');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
