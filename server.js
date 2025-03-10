require('dotenv').config();
const express = require('express');
const { User } = require('./question5');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Test the API:');
  console.log('1. Get all users: http://localhost:3000/users');
});
