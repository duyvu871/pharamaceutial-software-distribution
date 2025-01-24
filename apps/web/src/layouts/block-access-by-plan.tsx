import { useAuth } from '@hook/auth';
import NoPermission from '@component/Execption/no-permission.tsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { checkHighEndAdmin } from '@api/admin/admin-curd.ts';

type Props = {
	children: React.ReactNode;
	roles: ('admin'|'user'|'membership')[];
	plan: string[];
}

export default function BlockAccessByPlan({ children, roles, plan }: Props) {
	const [accessiblePlans, setAccessiblePlans] = useState<string[]>(plan);
	const [block, setBlock] = useState<boolean>(true);
	const [access, setAccess] = useState<boolean>(false);

	useLayoutEffect(() => {
		checkHighEndAdmin()
			.then((data) => {
				if (data) {
					setAccessiblePlans(['high-end']);
					setAccess(true);
					setBlock(false);
				}
			});
	}, []);

	if (!access) return null;
	if (block) return <NoPermission />;

	return children;
}