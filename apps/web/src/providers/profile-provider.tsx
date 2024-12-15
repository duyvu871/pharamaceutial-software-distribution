'use client';

import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import { ProfilePayloadType } from '@schema/user-schema.ts';
import { getUserProfile } from '@api/user.ts';
import { useAuth } from '@hook/auth';
type ProfileProviderProps = {
    children: React.ReactNode
};

export interface IProfileContext {
		profile: ProfilePayloadType | null;
		setProfile: (profile: any) => void;
}

export const ProfileContext = createContext<IProfileContext>({
	profile: null,
	setProfile: () => {},
});

export const ProfileProvider = ({children}: ProfileProviderProps) => {
	const {userSessionInfo} = useAuth();

	const [userProfile, setUserProfile] = useState<ProfilePayloadType | null>(null);
	// const [openDrawerState, setOpenDrawerState] = useState<boolean>(false);
	useEffect(() => {
		console.log('userSessionInfo', userSessionInfo);
		(async () => {
			const userId = userSessionInfo?.id;
			if (!userId) return;
			const userProfile = await getUserProfile(userId);
			console.log('userProfile', userProfile);
			setUserProfile(userProfile);
		})();
	}, [userSessionInfo]);

 	return (
  	<ProfileContext.Provider value={{
			profile: userProfile,
			setProfile: setUserProfile
		}}>
 	  	{children}
  	</ProfileContext.Provider>
 	);
};