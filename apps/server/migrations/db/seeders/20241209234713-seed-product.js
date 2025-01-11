'use strict';
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const groupQuery = await queryInterface.sequelize.query(
      `SELECT * FROM groups`
    );
    const groupIds = groupQuery[0].map(group => group.id);
    const groupType = groupQuery[0].map(group => group.group_name);

    const productUnitsQuery = await queryInterface.sequelize.query(
      `SELECT * FROM product_units`
    );

    const productUnitNames = productUnitsQuery[0].map(productUnit => productUnit.name);

    const reader = await require('fs').promises.readFile(path.join(__dirname, './seed-product.json'), 'utf8');
    const data = JSON.parse(reader);
    const products = data.map(product => {
      const randomIndex = Math.floor(Math.random() * groupType.length);
      const group_id = groupIds[randomIndex];
      const product_type = groupType[randomIndex];

      const randomUnitIndex = Math.floor(Math.random() * productUnitNames.length);
      const base_unit = productUnitNames[randomUnitIndex];
      const productUnitId = productUnitsQuery[0][randomUnitIndex].id;
      return {
       id: uuidv4(),
        store_id: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e',
        product_type: product_type,
        medicine_id: product.medicine_id,
        barcode: product.barcode,
        product_no: product.product_no,
        product_name: product.product_name,
        shortcut: product.shortcut,
        original_price: product.original_price,
        sell_price: product.sell_price,
        weight: product.weight,
        quantity_of_stock: product.quantity_of_stock,
        group_id: group_id,
        using_id: 1,
        base_unit: base_unit,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
        min_quantity: 1,
        max_quantity: 100,
        description: product.description,
        note: product.note,
        manufacturer: product.manufacturer,
        made_in: product.made_in,
        deleted_at: null,
        deleted_by: null,
        avg_original_price: product.original_price,
        default_image: product.default_image,
        productUnit: productUnitId,
        quantity: '{}'
      }
    })
    await queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
