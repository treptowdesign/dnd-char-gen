import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // path to the SQLite database file
  logging: console.log,
});

export default sequelize;
