"use client"

import NoPermission from '@component/Execption/no-permission.tsx';
import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { checkHighEndAdmin } from '@api/admin/admin-curd.ts';

type Props = {
	children: React.ReactNode;
	blockRender?: boolean;
}

export type ProtectHighEndAdminContextType = {
	isHighEndAdmin: boolean;
}

const ProtectHighEndAdminContext = createContext<ProtectHighEndAdminContextType>({
	isHighEndAdmin: false,
});

export default function ProtectHighEndAdmin({ children, blockRender}: Props) {
	const [block, setBlock] = useState<boolean>(true);
	const [access, setAccess] = useState<boolean>(false);
	const [isHighEndAdmin, setIsHighEndAdmin] = useState<boolean>(false);

	useLayoutEffect(() => {
		checkHighEndAdmin()
			.then((data) => {
				if (data) {
					setAccess(true);
					setBlock(false);
					setIsHighEndAdmin(true);
				}
			});
	}, []);

	if (!access && blockRender) return null;
	if (block && blockRender) return <NoPermission />;

	return (
		<ProtectHighEndAdminContext.Provider value={{
			isHighEndAdmin: isHighEndAdmin
		}}>
			{children}
		</ProtectHighEndAdminContext.Provider>
	);
}

export function useProtectHighEndAdmin() {
	const context = useContext(ProtectHighEndAdminContext);
	if (!context) {
		throw new Error('useProtectHighEndAdmin must be used within a ProtectHighEndAdmin');
	}
	return context;
}