'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('branches', [
      {
        branch_id: '50b1b432-e12a-4536-9c24-650b6a140923',
        branch_name: 'Main Branch',
        address: '123 Main St',
        phone_number: '123-456-7890',
        branch_status: 'active',
        owner_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        branch_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        branch_name: 'Secondary Branch test',
        address: '456 Secondary St',
        phone_number: '987-654-3210',
        branch_status: 'inactive',
        owner_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('branches', null, {});
  }
};
