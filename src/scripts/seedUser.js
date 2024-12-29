const bcrypt = require('bcrypt');
const sequelize = require('../lib/sequelize');
const User = require('../models/User');

const seedUser = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const username = 'admin';
    const plainPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      console.log(`User "${username}" already exists.`);
      return;
    }

    const user = await User.create({ username, password: hashedPassword });
    console.log(`Seeded user: ${user.username}`);
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await sequelize.close();
  }
};

seedUser();
