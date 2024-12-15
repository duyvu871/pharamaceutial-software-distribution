import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from 'server/repository';
import { z } from 'zod';
import ProductSchema from 'repository/product/schema';
import StoreSchema from 'repository/store/schema.ts';

// Zod Schema cho ProductUnit
export const ProductUnitZodSchema = z.object({
	id: z.string(),
	store_id: z.string(),
	name: z.string(),
	value: z.number(),
	no: z.string(),
	is_base: z.number(), // 0: không phải đơn vị cơ bản, 1: là đơn vị cơ bản
	latest_parcel_no: z.string().nullable(),
	latest_parcel_exp_date: z.string().nullable(),
	created_at: z.date(),
	updated_at: z.date(),
});

// Type cho ProductUnit từ Zod Schema
export type ProductUnitAttributes = z.infer<typeof ProductUnitZodSchema>;

// Sequelize Model
interface ProductUnitCreationAttributes
	extends Optional<ProductUnitAttributes, 'id'> {}

export default function(sequelize: Sequelize) {
	class ProductUnitSchema
		extends Model<ProductUnitAttributes, ProductUnitCreationAttributes>
		implements ProductUnitAttributes
	{
		declare id: string;
		declare store_id: string;
		declare name: string;
		declare value: number;
		declare no: string;
		declare is_base: number;
		declare latest_parcel_no: string | null;
		declare latest_parcel_exp_date: string | null;
		declare created_at: Date;
		declare updated_at: Date;

		public static associate(
			models: {
				StoreSchema: ReturnType<typeof StoreSchema>;
				ProductSchema: ReturnType<typeof ProductSchema>
			}) {
			ProductUnitSchema.belongsTo(models.StoreSchema, {
				foreignKey: 'id',
				as: 'store',
			});
			console.log('ProductUnitSchema.associate -> StoreSchema');
			ProductUnitSchema.belongsToMany(models.ProductSchema, {
				through: 'product_unit_labels',
				foreignKey: 'unit_label_id',
				otherKey: 'product_id',
				as: 'products',
			});
			console.log('ProductUnitSchema.associate -> ProductSchema');
		}
	}

	ProductUnitSchema.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			store_id: {
				type: DataTypes.UUID,
				allowNull: true,
				references: {
					model: 'stores',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'RESTRICT',
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			value: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			no: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			is_base: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			latest_parcel_no: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			latest_parcel_exp_date: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'product_units',
			timestamps: false,
		}
	);

	return ProductUnitSchema;
};