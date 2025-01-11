import Forbidden from 'responses/clientErrors/Forbidden';
import { UserTaskConstants } from 'server/common/constants';

export class UserError {
	public static notFound() {
		throw new Forbidden(
			UserTaskConstants.NO_USER_FOUND,
			'Người dùng không tồn tại trên hệ thống',
			'Người dùng không tồn tại'
		);
	}

	// some other error methods
}