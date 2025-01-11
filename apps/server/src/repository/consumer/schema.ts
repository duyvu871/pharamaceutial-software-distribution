import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import BadRequest from 'responses/clientErrors/BadRequest';
import * as z from 'zod';
import { vi } from '@repo/locale';

export const ConsumerZodSchema = z.object({
	id: z.string(),
	consumer_name: z.string({
		required_error: 'Tên khách hàng không được để trống',
		invalid_type_error: 'Tên khách hàng phải là chuỗi'
	}).min(3),
	gender: z.enum(['male', 'female']).nullable(),
	consumer_email: z.string().email().nullable(),
	phone_number: z.string()
		.min(10, { message: 'Phone number is too short' })
		.max(11, { message: 'Phone number is too long' })
		.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Phone number is invalid' }),
	tax_code: z.string().nullable(),
	company_name: z.string().nullable(),
	date_of_birth: z.date().nullable(),
	facebook: z.string().nullable(),
	address: z.string().nullable(),
	notes: z.string().nullable(),
	province_city: z.string().nullable(),
	district: z.string().nullable(),
	ward: z.string().nullable(),

	revenue: z.number().default(0),
	debit: z.number().default(0),

	branch_id: z.string(),

	createdAt: z.date(),
	updatedAt: z.date().nullable(),
});

export type ConsumerAttributes = z.infer<typeof ConsumerZodSchema>;

interface ConsumerCreationAttributes extends Optional<ConsumerAttributes, 'id'> {}

// export default function(sequelize: Sequelize) {
// 	class ConsumerSchema extends Model<ConsumerAttributes, ConsumerCreationAttributes> implements ConsumerAttributes {
// 		declare id: string;
// 		declare consumer_name: string;
// 		declare consumer_email: string | null;
// 		declare phone_number: string;
// 		declare tax_code: string;
// 		declare company_name: string | null;
// 		declare date_of_birth: Date;
// 		declare facebook: string | null;
// 		declare notes: string | null;
// 		declare province_city: string | null;
// 		declare address: string | null;
// 		declare gender: 'male' | 'female' | null;
// 		declare district: string | null;
// 		declare ward: string | null;
//
// 		declare revenue: number;
// 		declare debit: number;
// 		declare branch_id: string;
//
// 		declare readonly createdAt: Date;
// 		declare readonly updatedAt: Date;
//
// 		public static associate(models: { BranchSchema: typeof BranchSchema }) {
// 			ConsumerSchema.belongsTo(models.BranchSchema, { foreignKey: 'branch_id', as: 'consumer' });
// 		}
//
// 		public static async validateConsumer(data: ConsumerAttributes): Promise<void> {
// 			try {
// 				ConsumerZodSchema.parse(data);
// 			} catch (error) {
// 				throw new BadRequest('invalid_consumer_data', 'Invalid consumer data', error.message);
// 			}
// 		}
// 	}
// 	ConsumerSchema.init({
// 		id: {
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4,
// 			autoIncrement: false,
// 			primaryKey: true,
// 			allowNull: false,
// 		},
//
// 		branch_id: {
// 			type: DataTypes.UUID,
// 			allowNull: false,
// 			references: {
// 				model: 'branches', // Tên bảng branch
// 				key: 'branch_id',
// 			},
// 			onUpdate: 'CASCADE', // Cập nhật dữ liệu liên quan
// 			onDelete: 'RESTRICT', // Xóa dữ liệu liên quan
// 		},
//
// 		revenue: {
// 			type: DataTypes.BIGINT,
// 			defaultValue: 0,
// 		},
//
// 		debit: {
// 			type: DataTypes.BIGINT,
// 			defaultValue: 0
// 		},
//
// 		consumer_name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		gender: {
// 			type: DataTypes.ENUM('male', 'female'),
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		consumer_email: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		phone_number: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		tax_code: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		company_name: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		date_of_birth: {
// 			type: DataTypes.DATE,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		facebook: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		address: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		notes: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		province_city: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		district: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		ward: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 			defaultValue: null,
// 		},
// 		createdAt: {
// 			type: DataTypes.DATE,
// 			defaultValue: DataTypes.NOW,
// 			allowNull: true,
// 		},
// 		updatedAt: {
// 			type: DataTypes.DATE,
// 			defaultValue: DataTypes.NOW,
// 			allowNull: true,
// 		},
// 	}, {
// 		sequelize,
// 		modelName: 'consumers',
// 	});
//
//
// 	ConsumerSchema.beforeCreate(async (consumer, options) => {
// 		if (!consumer.consumer_name) {
// 			throw new BadRequest('name_required', 'Name is required, but not provided', 'Name is required');
// 		}
// 	});
//
// 	return ConsumerSchema;
// };
