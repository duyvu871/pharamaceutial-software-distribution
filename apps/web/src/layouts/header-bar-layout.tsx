import React from 'react';
import HeaderToolbar from '@component/Header/header-toolbar.tsx';
import { NavbarFeatureDirect } from '@component/Navbar/feature-direct.tsx';

function HeaderBarLayout({children}: {children: React.ReactNode}): JSX.Element {
	return (
		<>
			<HeaderToolbar />
			<NavbarFeatureDirect />
			{children}
		</>
	);
}

export default HeaderBarLayout;