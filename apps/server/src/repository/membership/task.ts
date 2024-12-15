import { UserAttributes, UserSchema } from 'server/repository/user/schema';
import Forbidden from 'responses/clientErrors/Forbidden';
import { UserTaskConstants } from 'server/common/constants';
import { extractProperties } from 'utils/object';
import logger, { appLogger } from 'utils/logger';
import MembershipSchema, { MembershipAttributes } from 'server/repository/membership/schema';

// membership available tasks with it permission
export class MembershipTask {
	// login task
	public static async login(username: string, password: string): Promise<MembershipAttributes> {
		try {
			const member = await MembershipSchema.findOne({ where: { username } });
			if (!member) {
				throw new Forbidden('member_not_found', 'Member not found', 'Member not found');
			}
			if (member.employee_status === 'inactive') {
				throw new Forbidden('member_is_inactive', 'Member is inactive', 'Member is inactive');
			}
			if (!await member.verifyPassword(password)) {
				throw new Forbidden('wrong_password', 'Wrong password', 'Wrong password');
			}
			return extractProperties(member.dataValues, ['id', 'username', 'email', 'phone_number', 'avatar', 'notes', 'employee_status', 'branch_id']);
		} catch (error: any) {
			appLogger.log('error', `MembershipTask.login - ${error.message}`);
			throw error;
		}
	}

	// register task
	// public static async register(data: MembershipAttributes): Promise<MembershipAttributes> {}

	//
}