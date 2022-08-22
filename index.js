const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

// MIDDLEWARE
// JSON parser
app.use(express.json());
// Helmet helps to secure Express/Connect apps with various HTTP headers
app.use(helmet());
// HTTP request logger
app.use(morgan("common"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.get("/users", (req, res) => {
  res.send("Welcome to the user page");
});

// Start the server on port 8800
app.listen(8800, () => {
  console.log("Backend server is running");
});
