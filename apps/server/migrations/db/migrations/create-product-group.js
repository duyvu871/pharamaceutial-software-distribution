// YYYYMMDDHHMMSS-create-product-groups.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('product_groups', {
			product_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'products',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				primaryKey: true, // Một phần của composite primary key
			},
			group_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'groups',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				primaryKey: true, // Một phần của composite primary key
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date()
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('product_groups');
	},
};