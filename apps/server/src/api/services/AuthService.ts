import * as bcrypt from 'bcrypt';

export default class AuthService {
	public static comparePassword = async (password: string, hash: string) => {
		return bcrypt.compare(password, hash);
	}

	public static hashPassword = async (password: string) => {
		return bcrypt.hash(password, 10);
	}
}