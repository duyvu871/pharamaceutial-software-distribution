import { UserAttributes } from 'server/repository/user/schema';
import Forbidden from 'responses/clientErrors/Forbidden';
import { UserTaskConstants } from 'server/common/constants';
import { extractProperties } from 'utils/object';
import logger from 'utils/logger';
import { BranchTask } from 'server/repository/branch';
import { BranchAttributes } from 'server/repository/branch/schema';
import { UserError } from 'server/repository/user/error';
import dayjs from 'dayjs';
import prisma from 'repository/prisma.ts';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@repo/orm';

// user available tasks with it permission
export class UserTask {
	// verify password
	public static verifyPassword = async (password: string, passwordHashed: string): Promise<boolean> => {
		try {
			return bcrypt.compare(password, passwordHashed);
		} catch (error) {
			return false;
		}
	}
	// generate hash
	public static generateHash = async (password: string): Promise<string> => {
		return bcrypt.hash(password, 10);
	}
	// login task
	public static login = async (
		username: string,
		password: string
	): Promise<Pick<UserAttributes, 'id'|'username'|'email'|'age'|'phone_number'|'avatar'>> =>
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
	public static register = async (data: UserAttributes): Promise<Pick<UserAttributes, 'id'|'username'|'email'|'age'|'phone_number'>> =>
	{
		try {
			const user = await prisma.users?.create({
				data: {
					...data,
					password: await this.generateHash(data.password)
				}
			});
			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}
	// update task
	public static update = async (userId: string, data: Partial<UserAttributes>): Promise<Pick<UserAttributes, never>> => {
		try {
			logger.log('info', `Update request for user: ${userId}`);
			const user = await prisma.users.update({
				where: { id: userId },
				data
			});
			logger.log('info', `Update success for user: ${userId}`);
			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}

	// get user by id
	public static getUserById = async (userId: string): Promise<Omit<UserAttributes, 'id'|'password'>> => {
		try {
			const user = await prisma.users.findUnique({
				omit: {
					password: true
				},
				where: { id: userId },
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

	public static checkUserExist = async (findOption: Prisma.usersWhereInput): Promise<boolean> => {
		try {
			const user = await prisma.users.findFirst({
				where: findOption
			});
			return !!user;
		} catch (error) {
			throw error;
		}
	}

	public static throwErrorIfUserNotExist = async (findOption: Prisma.usersWhereInput | string, error?: Forbidden): Promise<UserAttributes> => {
		try {
			let user: any | null;

			if (typeof findOption === 'string') {
				user = await prisma.users.findFirst({
					where: { id: findOption }
				});
			} else {
				user = await prisma.users.findFirst({
					where: findOption
				});
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
			const user = await this.throwErrorIfUserNotExist(userId);
			const hashedPassword = await this.generateHash(password);
			await this.update(userId, { password: hashedPassword });
			logger.log('info', `Update password success for user: ${userId}`);
		} catch (error) {
			throw error;
		}
	}

	public static getBranches = async (userId: string): Promise<BranchAttributes[]> => {
		try {
			const user = await(userId);
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

	public static getMembership = async (userId: string): Promise<Partial<BranchAttributes>[]> => {
		try {
			await this.throwErrorIfUserNotExist(userId);
			return await BranchTask.getBranchesByOwner(userId);
		} catch (error) {
			throw error;
		}
	}

	public static createBranch = async (data: BranchAttributes, userId: string): Promise<BranchAttributes> => {
		try {
			const user = await prisma.users.findFirst({
				where: { id: userId }
			});
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);

			return await BranchTask.createBranch(userId, data);
		}	catch (error: any) {
			throw error;
		}
	}
}