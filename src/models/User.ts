import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/sequelize';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
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
    sequelize,
    modelName: 'User',
  }
);

export default User;
