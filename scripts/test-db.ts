import sequelize from '../lib/sequelize';

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
