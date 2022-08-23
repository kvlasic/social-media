const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

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

// ROUTES
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// Start the server on port 8800
app.listen(8800, () => {
  console.log("Backend server is running");
});
