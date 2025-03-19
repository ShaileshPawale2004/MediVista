const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register Route
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
    res.send('Success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Login Route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Failed');
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Failed');
    }

    res.send('Success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { register, login };
