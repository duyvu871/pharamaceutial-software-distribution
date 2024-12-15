'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('memberships', [
      {
        id: 'a3c689fa-f20b-4b1c-ae44-4f73e8b7c0a1',
        username: 'member 1',
        first_name: 'member',
        last_name: '1',
        hire_date: new Date(),
        password: hashedPassword,
        email: 'membership1@example.com',
        phone_number: '0912345678',
        avatar: null,
        notes: 'This is a test user',
        employee_status: 'active',
        branch_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        reset_token: null,
        permission: ['READ', 'WRITE', 'DELETE'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('memberships', null, {});
  }
};
