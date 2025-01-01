import { z } from 'zod';

// Zod Schema cho Store
export const StoreZodSchema = z.object({
	id: z.string(),
	store_name: z.string(), // Tên kho
	branch_id: z.string(), // ID chi nhánh
	address: z.string(), // Địa chỉ kho
	phone: z.string().nullable(), // Số điện thoại liên hệ
	email: z.string().nullable(), // Email liên hệ
	created_at: z.date(), // Thời gian tạo
	updated_at: z.date(), // Thời gian cập nhật
	status: z.number(), // 1: Active, 0: Inactive
	description: z.string().nullable(), // Mô tả
	deleted_at: z.date().nullable(), // Thời gian xóa
	deleted_by: z.string().nullable(), // Người xóa
});

// Type cho Store từ Zod Schema
export type StoreAttributes = z.infer<typeof StoreZodSchema>;
//
// import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
// import sequelize from 'server/repository';
// import { BranchSchema } from 'repository/branch';
//
// // Sequelize Model Interface
// interface StoreCreationAttributes extends Optional<StoreAttributes, 'id'> {}
//
// export default function(sequelize: Sequelize) {
// 	class StoreSchema extends Model<StoreAttributes, StoreCreationAttributes> implements StoreAttributes {
// 		declare id: number; // ID kho
// 		declare store_name: string; // Tên kho
// 		declare branch_id: string; // ID chi nhánh
// 		declare address: string; // Địa chỉ kho
// 		declare phone: string | null; // Số điện thoại liên hệ
// 		declare email: string | null; // Email liên hệ
// 		declare created_at: Date; // Thời gian tạo
// 		declare updated_at: Date; // Thời gian cập nhật
// 		declare status: number; // 1: Active, 0: Inactive
// 		declare description: string | null; // Mô tả
// 		declare deleted_at: Date | null; // Thời gian xóa
// 		declare deleted_by: string | null; // Người xóa
//
// 		public static associate(models: { BranchSchema: typeof BranchSchema }) {
// 			StoreSchema.belongsTo(models.BranchSchema, { foreignKey: 'branch_id', as: 'branch' });
// 		}
// 	}
//
//
// // Khởi tạo Sequelize Model
// 	StoreSchema.init(
// 		{
// 			id: {
// 				type: DataTypes.UUID,
// 				defaultValue: DataTypes.UUIDV4,
// 				primaryKey: true,
// 				allowNull: false,
// 			},
// 			branch_id: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: 'branches',
// 					key: 'branch_id',
// 				}
// 			},
// 			store_name: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			address: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			phone: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			email: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			created_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			updated_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			status: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			description: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			deleted_at: {
// 				type: DataTypes.DATE,
// 				allowNull: true,
// 			},
// 			deleted_by: {
// 				type: DataTypes.UUID,
// 				allowNull: true,
// 			},
// 		},
// 		{
// 			sequelize,
// 			modelName: 'stores',
// 			timestamps: false
// 		}
// 	);
//
// 	return StoreSchema;
// };

