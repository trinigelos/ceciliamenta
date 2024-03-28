//auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

// Signup route
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    let { email, password, confirmPassword, username } = req.body;

    // Validate email
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if the user already exists with email
    const existingUsermail = await User.findOne({ email });
    if (existingUsermail) {
      return res
        .status(400)
        .json({ message: "Email registrado a otra cuenta" });
    }
    // Check if the user already exists with username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "El usuario ya fue registrado" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "USER NOT FOUND Invalid credentials" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "PASSWORD NOT VALID Invalid credentials" });
    }

    // Create and send a JWT token for user authentication
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY_JWT,
      { expiresIn: "10h" }
    );
    // Send back user data and token
    res.json({
      user: { username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
