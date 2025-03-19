const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Patient Registration
app.post('/PatientRegister', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name,email,password);
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    res.send('Success');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Registration failed');
  }
});

// Patient Login
app.post('/PatientLogIn', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.send('Failed');
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.send('Failed');
    }

    res.send('Success');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Failed');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
