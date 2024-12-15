import { UserAttributes } from 'server/repository/user/schema';
import Forbidden from 'responses/clientErrors/Forbidden';
import { UserTaskConstants } from 'server/common/constants';
import { extractProperties } from 'utils/object';
import logger from 'utils/logger';
import { BranchSchema, BranchTask } from 'server/repository/branch';
import { BranchAttributes } from 'server/repository/branch/schema';
import type { FindOptions } from 'sequelize';
import { UserError } from 'server/repository/user/error';
import dayjs from 'dayjs';
import prisma from 'repository/prisma.ts';
import * as bcrypt from 'bcrypt';
import {PrismaClient} from '@repo/orm';
import Prisma from 'repository/prisma.ts';

// user available tasks with it permission
export class UserTask {
	public static verifyPassword = async (password: string, passwordHashed: string): Promise<boolean> => {
		try {
			return bcrypt.compare(password, passwordHashed);
		} catch (error) {
			return false;
		}
	}
	// login task
	public static login = async (username: string, password: string):
		Promise<Pick<PrismaClient['users']['fields'], 'id'|'username'|'email'|'age'|'phone_number'|'avatar'>> =>
	{
		try {
			const user = await prisma.users.findFirst({ where: { username } });
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);
			const validatePassword = await this.verifyPassword(password, user.password);
			if (!validatePassword) throw new Forbidden(
				UserTaskConstants.INVALID_PASSWORD,
				'Mật khẩu không đúng',
				'Mật khẩu không đúng'
			);

			await prisma.users.update({
				where: { id: user.id },
				data: {
					last_login: dayjs().toDate()
				}
			});

			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number', 'avatar']);
		} catch (error) {
			throw error;
		}
	}
	// register task
	public static register = async (data: UserAttributes): Promise<UserAttributes> => {
		try {
			const user = await UserSchema?.create(data);
			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}
	// update task
	public static update = async (userId: string, data: UserAttributes): Promise<Pick<UserSchemaType, never>> => {
		try {
			logger.log('info', `Update request for user: ${userId}`);
			const user = await this.throwErrorIfUserNotExist(userId);
			await user.update(data);
			logger.log('info', `Update success for user: ${userId}`);
			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}

	// get user by id
	public static getUserById = async (userId: string): Promise<Exclude<UserSchemaType, 'id'>> => {
		try {
			const user = await UserSchema.findByPk(userId, {
				attributes: { exclude: ['password', 'permission'] }
			});
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);
			return user;
		} catch (error) {
			throw error;
		}
	}
	public static checkUserExist = async (findOption: FindOptions<UserSchemaType>): Promise<boolean> => {
		try {
			const user = await UserSchema?.findOne(findOption);
			return !!user;
		} catch (error) {
			throw error;
		}
	}

	public static throwErrorIfUserNotExist = async (findOption: FindOptions<UserSchemaType> | string, error?: Forbidden): Promise<UserSchemaType> => {
		try {
			let user: any | null;

			if (typeof findOption === 'string') {
				user = await UserSchema.findByPk(findOption);
			} else {
				user = await UserSchema.findOne(findOption);
			}

			if (!user) throw (error || UserError.notFound());
			return user;
		} catch (error) {
			throw error;
		}
	}

	public static updatePassword = async (userId: string, password: string): Promise<void> => {
		try {
			logger.log('info', `Update password request for user: ${userId}`);
			const user: UserSchemaType = await this.throwErrorIfUserNotExist(userId);
			const hashedPassword = await UserSchema.generateHash(password);
			// @ts-ignore
			await user.update({ password: hashedPassword });
			logger.log('info', `Update password success for user: ${userId}`);
		} catch (error) {
			throw error;
		}
	}

	public static getBranches = async (userId: string): Promise<BranchAttributes[]> => {
		try {
			const user = await UserSchema.findByPk(userId);
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);
			return (await BranchTask.getBranchesByOwner(userId));
		} catch (error) {
			throw error;
		}
	}

	public static getMembership = async (userId: string): Promise<BranchAttributes[]> => {
		try {
			await this.throwErrorIfUserNotExist(userId);
			return await BranchTask.getBranchesByOwner(userId);
		} catch (error) {
			throw error;
		}
	}

	public static createBranch = async (data: BranchAttributes, userId: string): Promise<BranchAttributes> => {
		try {
			const user = await UserSchema.findByPk(userId);
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);

			const branch = await BranchTask.createBranch(userId, data);

			return branch.dataValues;
		}	catch (error: any) {
			throw error;
		}
	}
}