'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      store_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'stores', // Bảng stores
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      product_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medicine_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      barcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shortcut: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      original_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      sell_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      quantity_of_stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      group_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'groups', // Bảng groups
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // SET NULL: Set giá trị NULL nếu có dữ liệu liên quan
      },
      using_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      base_unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // 1: Active
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      min_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      made_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      avg_original_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      default_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      productUnit: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'product_units', // Bảng product_units
          key: 'id',
        },
        onUpdate: 'CASCADE', // CASCADE: Cập nhật dữ liệu liên quan
        onDelete: 'RESTRICT', // RESTRICT: Không cho phép xóa nếu có dữ liệu liên quan
      },
      quantity: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};