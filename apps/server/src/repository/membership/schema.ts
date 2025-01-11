import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
// import sequelize from 'server/repository';
import BadRequest from 'responses/clientErrors/BadRequest';
import * as zod from 'zod';
import { vi } from '@repo/locale';
import { membershipPermission } from 'server/repository/permission';
// import BranchSchema from 'server/repository/branch/schema';

export interface MembershipAttributes {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	password: string | null;
	email: string | null;
	phone_number: string | null;
	hire_date: Date;
	avatar: string | null;
	notes: string | null;
	permission: zod.infer<typeof membershipPermission>[];
	employee_status: 'active' | 'inactive';
	reset_token: string | null;
	branch_id: string;

	createdAt: Date | null;
	updatedAt: Date | null;
}

interface MembershipCreationAttributes extends Optional<MembershipAttributes, 'id'> {}

export const MembershipZodSchema = zod.object({
	id: zod.string(),
	first_name: zod.string({
		required_error: vi.name_is_required,
		invalid_type_error: vi.name_must_be_a_string
	}).min(3),
	last_name: zod.string({
		required_error: vi.name_is_required,
		invalid_type_error: vi.name_must_be_a_string
	}).min(3),
	username: zod.string({
		required_error: vi.name_is_required,
		invalid_type_error: vi.name_must_be_a_string
	}).min(3),
	password: zod.string({
		required_error: vi.password_is_required,
		invalid_type_error: vi.please_enter_your_email_and_password
	}).min(6),
	email: zod.string({
		required_error: vi.email_is_required,
		invalid_type_error: vi.please_enter_your_email_and_password
	}).email(vi.email_is_invalid),
	phone_number: zod.string().min(10).max(10),
	hire_date: zod.date(),
	avatar: zod.string().optional(),
	notes: zod.string().optional(),
	permission: membershipPermission,
	employee_status: zod.enum(['active', 'inactive']),
	reset_token: zod.string().optional(),
	branch_id: zod.string(),

	createdAt: zod.date(),
	updatedAt: zod.date().optional()
});
//
// export default function(sequelize: Sequelize) {
// 	class MembershipSchema extends Model<MembershipAttributes, MembershipCreationAttributes> implements MembershipAttributes {
// 		declare id: string;
// 		declare first_name: string;
// 		declare last_name: string;
// 		declare username: string;
// 		declare password: string | null;
// 		declare email: string;
// 		declare phone_number: string;
// 		declare hire_date: Date;
// 		declare avatar: string | null;
// 		declare notes: string | null;
// 		declare employee_status: 'active' | 'inactive';
// 		declare permission: zod.infer<typeof membershipPermission>;
// 		declare reset_token: string | null;
// 		declare branch_id: string;
//
// 		declare readonly createdAt: Date;
// 		declare readonly updatedAt: Date;
//
// 		public static async generateHash(password: string): Promise<string> {
// 			return await bcrypt.hash(password, bcrypt.genSaltSync(5));
// 		}
// 		public async verifyPassword(password: string): Promise<boolean> {
// 			if (!this.password) return false;
// 			return await bcrypt.compare(password, this.password);
// 		}
//
// 		public static associate(models: { BranchSchema: ReturnType<typeof BranchSchema> }) {
// 			MembershipSchema.belongsTo(models.BranchSchema, {
// 					foreignKey: {
// 						name: 'branch_id',
// 					},
// 					as: 'branch' // this determines the name in `associations`!
// 				}
// 			);
// 		}
// 	}
//
// 	MembershipSchema.init({
// 		id: {
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4,
// 			autoIncrement: false,
// 			primaryKey: true,
// 			allowNull: false,
// 		},
// 		username: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		first_name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		last_name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		hire_date: {
// 			type: DataTypes.DATE,
// 			allowNull: false,
// 		},
// 		password: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		email: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true,
// 		},
// 		phone_number: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true,
// 		},
// 		avatar: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true,
// 		},
// 		notes: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true,
// 		},
// 		employee_status: {
// 			type: DataTypes.ENUM('active', 'inactive'),
// 			allowNull: false,
// 		},
// 		branch_id: {
// 			type: DataTypes.UUID,
// 			allowNull: false,
// 			references: {
// 				model: 'branches', // name of the target table
// 				key: 'branch_id', // key in the target table that we're referencing
// 			},
// 		},
// 		reset_token: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true,
// 		},
// 		permission: {
// 			type: DataTypes.ARRAY(DataTypes.STRING),
// 			allowNull: false,
// 			defaultValue: membershipPermission.options,
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
// 		modelName: 'memberships'
// 	});
// 	MembershipSchema.beforeCreate(async (user, options) => {
// 		if (!user.password) {
// 			throw new BadRequest('pwd_required', 'Password is required, but not provided', 'Password is required');
// 		};
// 		user.password = await MembershipSchema.generateHash(user.password);
// 	});
// 	MembershipSchema.beforeUpdate(async (user) => {
// 		const hashedPassword = user.password ? await MembershipSchema.generateHash(user.password) : user.previous('password');
// 		user.password = hashedPassword || user.password || null;
// 	});
//
// 	return MembershipSchema;
// };