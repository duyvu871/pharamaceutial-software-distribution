import React from 'react';

type AdminHeaderLayoutProps = {
	children: React.ReactNode;
};

function AdminHeaderLayout(props: AdminHeaderLayoutProps) {
	return (
		<>

			{props.children}
		</>
	);
}

export default AdminHeaderLayout;