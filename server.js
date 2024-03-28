//server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const jobPostRoutes = require("./routes/jobPostRoutes");
// const categoryRoutes = require('./routes/categoryRoutes');
// const verifyTokenRoute = require("./routes/verifyToken"); // Adjust the path as necessary

const cors = require("cors");

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Require the database connection
require("./database");

// Middleware to parse JSON data
app.use(bodyParser.json());

// Middleware to parse URL-encoded data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// require routes for signup and login
app.use(authRoutes);

// Use job post routes
app.use(jobPostRoutes);

// // Use the verify Token route
// app.use(verifyTokenRoute);

// //use categories routes
// app.use(categoryRoutes);

app.get("/", (req, res) => {
  res.send("it-s working");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
