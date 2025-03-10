const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./config/database.js');
const app = express();

// Define PORT before using it
const PORT = 3000;

// Get environment configuration
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// Database connection
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool,
    logging: config.logging
  }
);

// User model definition
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Test data insertion
const testData = async () => {
  try {
    // Create test users
    await User.bulkCreate([
      { name: 'John Doe', email: 'john@example.com', status: true },
      { name: 'Jane Smith', email: 'jane@example.com', status: true }
    ]);
    console.log('Test data inserted successfully');
  } catch (error) {
    console.error('Error inserting test data:', error);
  }
};

// Initialize database and start server
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
    return testData();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Test the API:');
      console.log('1. Get all users: http://localhost:3000/users');
    });
  })
  .catch(err => console.error('Error:', err));

module.exports = { User };

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});
