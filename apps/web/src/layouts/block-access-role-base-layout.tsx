import { useAuth } from '@hook/auth';
import NoPermission from '@component/Execption/no-permission.tsx';

type Props = {
	children: React.ReactNode;
	roles: ('admin'|'user'|'membership')[];
}

export default function BlockAccessRoleBaseLayout({ children, roles }: Props) {
	const {userSessionInfo} = useAuth();

	if (!userSessionInfo) {
		return <></>;
	}

	if (!roles.includes(userSessionInfo?.role)) {
		return <NoPermission />;
	}

	return children;
}