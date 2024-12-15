'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('consumers', [
      {
        id: uuidv4(),
        branch_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        revenue: 1000000,
        debit: 0,
        consumer_name: 'John Doe',
        gender: 'male',
        consumer_email: 'john.doe@example.com',
        phone_number: '0901234567',
        tax_code: null,
        company_name: null,
        date_of_birth: '1990-01-01',
        facebook: null,
        address: '123 Main St',
        notes: 'Preferred customer',
        province_city: 'Hanoi',
        district: 'Hoan Kiem',
        ward: 'Phuc Tan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        branch_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        revenue: 500000,
        debit: 120000,
        consumer_name: 'Jane Doe',
        gender: 'female',
        consumer_email: 'jane.doe@example.com',
        phone_number: '0912345678',
        tax_code: null,
        company_name: null,
        date_of_birth: '1995-05-05',
        facebook: null,
        address: '456 Another St',
        notes: 'Frequent buyer',
        province_city: 'HCMC',
        district: 'District 1',
        ward: 'Ben Nghe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consumers', null, {});
  }
};
