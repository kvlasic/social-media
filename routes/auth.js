const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Add user to database and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Find user by email or username
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  try {
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Don't return password, isAdmin to user
      const { password, isAdmin, ...otherProperties } = user._doc;
      res.status(200).json(otherProperties);
    } else {
      res.status(400).json("Username or password wrong");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
