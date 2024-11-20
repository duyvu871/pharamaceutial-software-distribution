'use strict';

// const { hash } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
  async up(queryInterface, Sequelize) {
    // const hashedPassword = await hash('password123', bcrypt.genSaltSync(5));
    await queryInterface.bulkInsert('users', [{
      id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
      username: 'sampleuser',
      password: "$2b$05$ij2UBiO2xkHnYpUzBsxDfecFq1wI3KwgH3FhmJMdsz7eqt5yAcjkq",
      email: 'sampleuser@example.com',
      age: 30,
      phone_number: '1234567890',
      address: '123 Sample Street',
      avatar: 'https://example.com/avatar.png',
      notes: 'This is a sample user.',
      is_active: true,
      last_login: new Date(),
      reset_token: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { username: 'sampleuser' }, {});
  }
};
