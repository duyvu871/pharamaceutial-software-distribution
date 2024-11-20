import { UserAttributes, UserSchema } from 'server/repository/user/schema';
import Forbidden from 'responses/clientErrors/Forbidden';
import { UserTaskConstants } from 'server/common/constants';
import { extractProperties } from 'utils/object';
import logger from 'utils/logger';

// user available tasks with it permission
export class UserTask {
	// login task
	public static login = async (username: string, password: string): Promise<UserAttributes> => {
		try {
			const user = await UserSchema.findOne({ where: { username } });
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);
			const validatePassword = await user.verifyPassword(password);
			if (!validatePassword) throw new Forbidden(
				UserTaskConstants.INVALID_PASSWORD,
				'Mật khẩu không đúng',
				'Mật khẩu không đúng'
			);
			return extractProperties(user.dataValues, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}
	// register task
	public static register = async (data: UserAttributes): Promise<UserAttributes> => {
		try {
			const user = await UserSchema.create(data);
			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}
	// update task
	public static update = async (id: number, data: UserAttributes): Promise<UserAttributes> => {
		try {
			logger.log('info', 'UserTask.update', "Update request for user: %s", id);
			const user = await UserSchema.findByPk(id);
			if (!user) throw new Forbidden(
				UserTaskConstants.NO_USER_FOUND,
				'Người dùng không tồn tại trên hệ thống',
				'Người dùng không tồn tại'
			);
			await user.update(data);
			logger.log('info', 'UserTask.update', "Update success for user: %s", id);
			return extractProperties(user, ['id', 'username', 'email', 'age', 'phone_number']);
		} catch (error) {
			throw error;
		}
	}
}