const { Sequelize } = require('sequelize');
const dbConfig = require('./config/database.js');

const config = dbConfig.development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection successful');
    
    // Get all tables in the database
    const [results] = await sequelize.query('SHOW TABLES');
    console.log('\nAvailable tables:');
    results.forEach(row => {
      console.log(`- ${Object.values(row)[0]}`);
    });
  } catch (error) {
    console.error('✗ Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
