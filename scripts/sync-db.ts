import sequelize from '../lib/sequelize';
import User from '../models/User'; // Import the User model

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates all tables
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

syncDatabase();
