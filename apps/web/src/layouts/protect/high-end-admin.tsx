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

export default function ProtectHighEndAdmin({ children, blockRender = true }: Props) {
	const [isChecking, setIsChecking] = useState<boolean>(true);
	const [access, setAccess] = useState<boolean>(false);
	const [isHighEndAdmin, setIsHighEndAdmin] = useState<boolean>(false);

	useLayoutEffect(() => {
		checkHighEndAdmin()
			.then((data) => {
				setAccess(data);
				setIsHighEndAdmin(data);
			})
			.catch(() => {
				setAccess(false);
				setIsHighEndAdmin(false);
			})
			.finally(() => {
				setIsChecking(false); // Kết thúc quá trình check
			});
	}, []);

	// Xử lý hiển thị khi blockRender được bật
	if (blockRender) {
		// Hiển thị nothing khi đang check
		if (isChecking) return null;

		// Hiển thị NoPermission nếu không có quyền
		if (!access) return <NoPermission />;
	}

	return (
		<ProtectHighEndAdminContext.Provider value={{ isHighEndAdmin }}>
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