'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const medicineCategories = [
      'Thuốc giảm đau',
      'Thuốc kháng sinh',
      'Thuốc hạ sốt',
      'Thuốc chống dị ứng',
      'Thuốc tim mạch',
      'Thuốc tiêu hóa',
      'Thuốc thần kinh',
      'Thuốc nội tiết',
      'Thuốc da liễu',
      'Thuốc mắt',
      'Thuốc tai mũi họng',
      'Thuốc hô hấp',
      'Vitamin & Khoáng chất',
      'Thuốc chống viêm',
      'Thuốc cơ xương khớp',
      'Thuốc tiết niệu - sinh dục',
      'Thuốc chống ung thư',
      'Thuốc chống đông máu',
      'Thuốc trị ký sinh trùng',
      'Dung dịch tiêm truyền',
    ];

    const groupsData = medicineCategories.map((type, index) => ({
      id: uuidv4(),
      store_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
      group_name: type, // Lấy tên danh mục thuốc theo index
      description: `Nhóm thuốc ${type}`,
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      deleted_by: null,
    }));

    await queryInterface.bulkInsert('groups', groupsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groups', null, {});
  },
};