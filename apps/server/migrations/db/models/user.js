'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const bcrypt = require('bcrypt');
// const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async generateHash (password) {
      return await bcrypt.hash(password, bcrypt.genSaltSync(5));
    }
    async verifyPassword (password) {
      if (!this.password) return false;
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init({
    fid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true
    },
    reset_token: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  User.beforeCreate(async (user, options) => {
    if (!user.password) {
      throw new Error('pwd_required');
    };
    user.password = await User.generateHash(user.password);
  });
  User.beforeUpdate(async (user) => {
    const hashedPassword = user.password ? await User.generateHash(user.password) : user.previous('password');
    user.password = hashedPassword || user.password || null;
  });

  return User;
};