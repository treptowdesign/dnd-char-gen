import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER, // No UNSIGNED for SQLite
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Attach the sequelize instance
    tableName: 'users', // Define the table name explicitly
  }
);

export default User;
