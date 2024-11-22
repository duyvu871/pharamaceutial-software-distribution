import React from 'react';
// import { LoginForm } from '@/components/AuthComponents/LoginForm';
import AuthLayout from '@layout/auth-layout.tsx';
import { LoginForm } from '@component/auth-component/login-form.tsx';

function Login() {
	return (
		<AuthLayout>
			<LoginForm/>
		</AuthLayout>
	);
}

export default Login;