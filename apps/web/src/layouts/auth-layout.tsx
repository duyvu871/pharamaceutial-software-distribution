import React from 'react';

interface AuthLayoutProps {
	children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<main
			className="overflow-x-hidden mx-auto h-svh w-full flex justify-center items-center">
			{children}
		</main>
	);
}

export default AuthLayout;