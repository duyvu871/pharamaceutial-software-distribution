"use client"

import React from 'react';
import TabSectionBase from '@component/Tab/tab-section-base.tsx';
import UserSettingForm from '@component/Form/user-setting-form.tsx';
import UserSettingPasswordForm from '@component/Form/user-setting-password-form.tsx';


export default function UserSetting() {

	console.log("UserSetting");
	const tabs = [
		{
			key: "config",
			label: "Cài đặt tài khoản",
			// icon: TbLicense,
			renderSection: () => <UserSettingForm />
		},
		{
			key: "reset-password",
			label: "Cài đặt mật khẩu",
			renderSection: () => <UserSettingPasswordForm />
		}
	]

	return (
		<TabSectionBase
			tabRender={tabs}
		/>
	);
}