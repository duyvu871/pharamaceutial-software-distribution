"use client"

import React from 'react';
import MantineProviderClient from '@provider/mantine-provider';
import ToastLayout from '@layout/toast-layout.tsx';
import JotaiProvider from '@provider/jotai-provider';

type AppLayoutProps = {
	children: React.ReactNode;
};

const AppLayout = ({children}: AppLayoutProps) => {
	return (
		// <AuthProvider>
			<ToastLayout>
				<MantineProviderClient>
					<JotaiProvider>
						{/*<ProfileProvider>*/}
							{children}
						{/*</ProfileProvider>*/}
					</JotaiProvider>
				</MantineProviderClient>
			</ToastLayout>
		// </AuthProvider>
	);
};

export default AppLayout;