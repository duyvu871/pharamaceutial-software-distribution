import { useContext } from 'react';
import { ProfileContext } from '@provider/profile-provider.tsx';

export const useProfile = () => {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error('useProfile must be used within a ProfileProvider');
	}
	return context;
};