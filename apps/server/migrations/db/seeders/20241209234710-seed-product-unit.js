'use strict';
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const productUnitsData = [];
    const unitNames = ['Hộp', 'Vỉ', 'Viên', 'Chai', 'Lọ', 'Tuýp', 'Ống', 'Gói'];

    for (let i = 0; i < unitNames.length; i++) {
      const store_id = 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e';
      const name = unitNames[i];
      const is_base = 1; // 50% cơ hội là đơn vị cơ bản
      const value = is_base ? 1 : faker.number.int({ min: 2, max: 30 }); // Nếu là base unit thì value = 1, không thì từ 2-30
      const latest_parcel_exp_date = faker.date.future({ years: 2 }).toISOString().split('T')[0]; // Tạo ngày hết hạn trong vòng 2 năm tới, format YYYY-MM-DD

      productUnitsData.push({
        id: uuidv4(),
        store_id,
        name,
        value,
        no: `NO-${faker.string.alphanumeric(8).toUpperCase()}`,
        is_base,
        latest_parcel_no: `LOT-${faker.string.alphanumeric(6).toUpperCase()}`,
        latest_parcel_exp_date,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('product_units', productUnitsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_units', null, {});
  },
};