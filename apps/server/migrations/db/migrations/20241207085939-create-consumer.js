'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('consumers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      branch_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'branches', // Tên bảng branch
          key: 'branch_id',
        },
        onUpdate: 'CASCADE', // Cập nhật dữ liệu liên quan
        onDelete: 'RESTRICT', // Xóa dữ liệu liên quan
      },
      revenue: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },

      debit: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },

      consumer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: true,
        defaultValue: null,
      },
      consumer_email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tax_code: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      province_city: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      ward: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('consumers');
  }
};
