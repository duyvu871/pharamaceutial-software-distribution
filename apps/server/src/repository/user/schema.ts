import { PrismaClient, users, Prisma } from "@repo/orm";
import bcrypt from 'bcrypt';
import BadRequest from 'responses/clientErrors/BadRequest';
import * as zod from 'zod';
import { vi } from '@repo/locale';
import { userPermission } from 'server/repository/permission';

export interface UserAttributes {
	id: string;
	username: string;
	password: string | null;
	email: string | null;
	age: number | null;
	phone_number: string | null;
	address: string | null;
	avatar: string | null;
	notes: string | null;
	is_active: boolean;
	permission: zod.infer<typeof userPermission>;
	last_login: Date | null;
	reset_token:string | null;

	createdAt: Date | null;
	updatedAt: Date;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export const UserZodSchema = zod.object({
	id: zod.string(),
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
	age: zod.number().int().positive(),
	phone_number: zod.string().min(10).max(10),
	address: zod.string().optional(),
	avatar: zod.string().optional(),
	notes: zod.string().optional(),
	is_active: zod.boolean(),
	last_login: zod.date().optional(),
	reset_token: zod.string().optional(),
	createdAt: zod.date(),
	updatedAt: zod.date().optional()
});

type UserSchema = PrismaClient['users'] & {
	generateHash: (password: string) => Promise<string>;
	verifyPassword: (password: string) => Promise<boolean>;
};


// export default function(sequelize: Sequelize) {
// 	class UserSchema extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
// 		declare id: string;
// 		declare username: string;
// 		declare email: string;
// 		declare age: number;
// 		declare phone_number: string;
// 		declare password: string | null;
// 		declare address: string | null;
// 		declare avatar: string | null;
// 		declare is_active: boolean;
// 		declare last_login: Date | null;
// 		declare notes: string | null;
// 		declare reset_token: string | null;
// 		declare permission: zod.infer<typeof userPermission>;
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
// 	}
//
// 	UserSchema.init({
// 		id: {
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4,
// 			autoIncrement: false,
// 			primaryKey: true,
// 			allowNull: false
// 		},
// 		username: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		password: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		email: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		age: {
// 			type: DataTypes.INTEGER,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		phone_number: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		address: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		avatar: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		notes: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		is_active: {
// 			type: DataTypes.BOOLEAN,
// 			allowNull: false,
// 			defaultValue: true
// 		},
// 		last_login: {
// 			type: DataTypes.DATE,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		reset_token: {
// 			type: DataTypes.STRING,
// 			defaultValue: null,
// 			allowNull: true
// 		},
// 		permission: {
// 			type: DataTypes.ARRAY(DataTypes.STRING),
// 			allowNull: false,
// 			defaultValue: userPermission.options,
// 		},
// 		createdAt: {
// 			type: DataTypes.DATE,
// 			defaultValue: DataTypes.NOW,
// 			allowNull: true
// 		},
// 		updatedAt: {
// 			type: DataTypes.DATE,
// 			defaultValue: DataTypes.NOW,
// 			allowNull: true
// 		}
// 	}, {
// 		sequelize,
// 		modelName: 'users'
// 	});
//
// 	UserSchema.beforeCreate(async (user, options) => {
// 		if (!user.password) {
// 			throw new BadRequest('pwd_required', 'Password is required, but not provided', 'Password is required');
// 		};
// 		user.password = await UserSchema.generateHash(user.password);
// 	});
// // UserSchema.beforeUpdate(async (user) => {
// // 	const hashedPassword = user.password ? await UserSchema.generateHash(user.password) : user.previous('password');
// // 	user.password = hashedPassword || user.password || null;
// // });
// 	return UserSchema;
// };

