'use client';

import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import { ProfilePayloadType } from '@schema/user-schema.ts';
import { getUserProfile } from '@api/user.ts';
import { useAuth } from '@hook/auth';
import { getAdminDataById } from '@api/admin/admin-curd.ts';
import { AdminType } from '@schema/admin/admin-schema.ts';
type AdminProfileProviderProps = {
	children: React.ReactNode
};

export interface IAdminProfileContext {
	profile: AdminType | null;
	setProfile: (profile: any) => void;
}

export const AdminProfileContext = createContext<IAdminProfileContext>({
	profile: null,
	setProfile: () => {},
});

export const AdminProfileProvider = ({children}: AdminProfileProviderProps) => {
	const {userSessionInfo} = useAuth();

	const [userProfile, setUserProfile] = useState<AdminType | null>(null);
	// const [openDrawerState, setOpenDrawerState] = useState<boolean>(false);
	useEffect(() => {
		console.log('admin session info', userSessionInfo);
		(async () => {
			const id = userSessionInfo?.id;
			if (!id) return;
			const adminProfile = await getAdminDataById(id);
			console.log('admin info', userProfile);
			setUserProfile(userProfile);
		})();
	}, [userSessionInfo]);

	return (
		<AdminProfileContext.Provider value={{
			profile: userProfile,
			setProfile: setUserProfile
		}}>
			{children}
		</AdminProfileContext.Provider>
	);
};