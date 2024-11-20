'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
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
      permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [
          'Store.All',
          'Report.All',
          'Supplier.All',
          'Medicine.All',
          'Membership.All',
          'Promotion.All',
          'Customer.All',
          'User.Read',
          'User.Update',
          'User.Create',
        ],
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};