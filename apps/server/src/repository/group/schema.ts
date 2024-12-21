import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { z } from 'zod';


// Zod Schema cho Group
export const GroupZodSchema = z.object({
	id: z.number(),
	store_id: z.number(),
	group_name: z.string(),
	description: z.string().nullable(),
	status: z.number(), // 1: Active, 0: Inactive
	created_at: z.number(),
	updated_at: z.number(),
	deleted_at: z.number().nullable(),
	deleted_by: z.number().nullable(),
});

// Type cho Group từ Zod Schema
export type GroupAttributes = z.infer<typeof GroupZodSchema>;

// Sequelize Model
interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

// export default function(sequelize: Sequelize) {
// 	class GroupSchema extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
// 		declare id: number; // ID nhóm
// 		declare store_id: number; // ID cửa hàng
// 		declare group_name: string; // Tên nhóm
// 		declare description: string | null; // Mô tả nhóm
// 		declare status: number; // 1: Active, 0: Inactive
// 		declare created_at: number; // Thời gian tạo
// 		declare updated_at: number; // Thời gian cập nhật
// 		declare deleted_at: number | null; // Thời gian xóa
// 		declare deleted_by: number | null; // ID người xóa
//
// 		public static associate( models: { StoreSchema: ReturnType<typeof StoreSchema> },
// 		) {
// 			GroupSchema.belongsTo(models.StoreSchema, { foreignKey: 'id', as: 'store' });
// 		}
// 	}
//
// 	// Khởi tạo Sequelize Model
// 	GroupSchema.init(
// 		{
// 			id: {
// 				type: DataTypes.UUID,
// 				defaultValue: DataTypes.UUIDV4,
// 				primaryKey: true,
// 				allowNull: false,
// 			},
// 			store_id: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: 'stores',
// 					key: 'id',
// 				},
// 				onUpdate: 'CASCADE',
// 				onDelete: 'RESTRICT',
// 			},
// 			group_name: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			description: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			status: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			created_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			updated_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
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
// 			modelName: 'groups',
// 		}
// 	);
//
// 	return GroupSchema;
// };
