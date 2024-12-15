'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // Dữ liệu mẫu cho bảng `stores`
    const stores = [
      {
        id: '50b1b432-e12a-4536-9c24-650b6a140923',
        branch_id: '50b1b432-e12a-4536-9c24-650b6a140923', // ID chi nhánh giả định
        store_name: 'Kho Trung Tâm',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0901234567',
        email: 'central@store.com',
        created_at: now,
        updated_at: now,
        status: 1,
        description: 'Kho trung tâm phục vụ chính',
        deleted_at: null,
        deleted_by: null,
      },
      {
        id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        branch_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        store_name: 'Kho Phụ',
        address: '456 Đường DEF, Quận 3, TP.HCM',
        phone: '0909876543',
        email: 'branch@store.com',
        created_at: now,
        updated_at: now,
        status: 1,
        description: 'Kho phụ hỗ trợ khu vực',
        deleted_at: null,
        deleted_by: null,
      },
    ];

    await queryInterface.bulkInsert('stores', stores, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa dữ liệu mẫu
    await queryInterface.bulkDelete('stores', null, {});
  },
};
