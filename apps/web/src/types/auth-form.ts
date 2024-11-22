export type RegisterFormType = {
	username: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export type LoginFormType = {
	// role: 'admin' | 'user' | 'membership';
	username: string;
	password: string;
}