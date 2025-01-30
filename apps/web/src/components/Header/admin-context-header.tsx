import { Avatar, Divider, NavLink, Popover, Stack } from '@mantine/core';
import React, { useLayoutEffect, useState } from 'react';
import { useProfile } from '@hook/dashboard/use-profile.ts';
import { Typography } from '@component/Typography';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosSettings,  } from "react-icons/io";
import { usePathname } from '@route/hooks';
import { IoExitOutline } from "react-icons/io5";
import { cn } from '@lib/tailwind-merge.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { pathToRegex } from '@util/regex.ts';
import { useAuth } from '@hook/auth';


type NavItem = {
	path?: string | RegExp,
	href?: string,
	icon: React.ElementType,
	label: string,
	description: string,
	action?: () => void
}


function ContextHeader() {
	const {profile: userProfile} = useProfile();
	const pathname = usePathname();
	const {branchId} = useDashboard();
	const {logout} = useAuth();

	const navLinkItems: NavItem[] = [
		{
			path: /dashboard/, // regex for dashboard page only
			href: '/dashboard',
			icon: MdOutlineSpaceDashboard ,
			label: 'Tổng quan',
			description: '',
			action: () => console.log('Tổng quan')
		},
		{
			path: pathToRegex(`/dashboard/branch/${branchId}/user/settings`),///`dashboard\/branch\/`${branchId}`\/user\/settings`, // regex for settings page only
			href: `/dashboard/branch/${branchId}/user/settings`,
			icon: IoIosSettings,
			label: 'Cài đặt',
			description: '',
		},
	]

	return (
		<Popover position="bottom" offset={0} withArrow shadow='xs'>
			<Popover.Target>
				{/*<Avatar>*/}
				<Avatar className={'!w-9 cursor-pointer'} src={userProfile?.avatar} alt={userProfile?.username} />
				{/*</Avatar>*/}
			</Popover.Target>
			<Popover.Dropdown w={200}>
				<Stack gap={10}>
					<Stack gap={1}>
						<Typography size={'content'} weight={'semibold'}>{userProfile?.username}</Typography>
						<Typography size={'xs'} className={'text-blue-500'}>{userProfile?.email}</Typography>
					</Stack>
					<Divider />
					<Stack gap={1}>
						{navLinkItems.map((item, index) => {
							const active = pathname ?
								(item.path instanceof RegExp
									? item.path.test(pathname)
									: pathname.includes(item.path as string))
								: false
							return  (
								<NavLink
									color={'teal'}
									href={item.href || ''}
									key={item.label}
									active={active}
									label={
										<Typography
											size={'sm'}
											weight={'semibold'}
											className={
												cn({
													'text-teal-500': active,
												})
											}
										>{item.label}</Typography>
									}
									description={item.description}
									// rightSection={item.rightSection}
									leftSection={<item.icon size={20} />}
									onClick={item.action}
								/>
							)
						})}
					</Stack>
					<Divider />
					<Stack gap={1}>
						<NavLink
							color={'red'}
							active={true}
							label={
								<Typography size={'sm'} weight={'semibold'} color={'alert'}>Đăng xuất</Typography>
							}
							description={''}
							leftSection={<IoExitOutline  size={20} />}
							onClick={() => {
								console.log('Đăng xuất');
								logout();
							}}
						/>
					</Stack>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
}

export default ContextHeader;