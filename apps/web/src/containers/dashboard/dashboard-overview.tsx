'use client';

import React, { useLayoutEffect, useState } from 'react';
import { userProfileAtom } from '@store/state/profile/user-profile.ts';
import { useAtom } from 'jotai';
import { getUserProfile } from '@api/user.ts';
import { useAuth } from '@hook/auth';
import { Avatar, Button, Card, Divider, Drawer, Indicator, Stack } from '@mantine/core';
import { Typography } from '@component/Typography';
import { useUID } from '@hook/common/useUID.ts';
import { CenterBox } from '@component/CenterBox';
import { Label } from '@component/label';
import { localeVi } from '@global/locale.ts';
import { useRouter } from '@route/hooks';
import dayjs from 'dayjs';
import { useDisclosure } from '@mantine/hooks';
import CreateBranch from '@component/Form/create-branch.tsx';
import { cn } from '@lib/tailwind-merge.ts';

function DashboardOverview() {
	const router = useRouter();
	const {userSessionInfo} = useAuth();
	const {generateUID} = useUID();
	const [userProfile, setUserProfile] = useAtom(userProfileAtom);
	// const [openDrawerState, setOpenDrawerState] = useState<boolean>(false);
	const [openDrawerState, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
	useLayoutEffect(() => {
		console.log('userSessionInfo', userSessionInfo);
		(async () => {
			const userId = userSessionInfo?.id;
			if (!userId) return;
			const userProfile = await getUserProfile(userId);
			console.log('userProfile', userProfile);
			setUserProfile(userProfile);
		})();
	}, [userSessionInfo]);

	const directToBranch = (branchId: string) => {
		console.log('directToBranch', branchId);
		router.push(`/dashboard/branch/${branchId}`);
	}


	return (
		<div className={""}>
			<div className={"w-full h-16 flex justify-center items-center "}>
				<Typography weight={'semibold'} size={'h5'}>Tổng quan</Typography>
			</div>
			<Divider my="0" />
			<div className={cn({
				'hidden': !userProfile
			})}>
				<div className={'px-4 pb-10 flex flex-col'}>
					<CenterBox size={"lg"} classNames={{
						inner: 'py-10 flex flex-col justify-center items-center gap-7 sm:!flex-row'
					}}>
						<Indicator offset={15} withBorder processing inline size={20}
											 color={userProfile?.is_active ? 'green' : 'red'}>
							<Avatar w={100} h={100} src={userProfile?.avatar} alt={userProfile?.username} />
						</Indicator>
						<div className={"flex flex-col items-start"}>
							<Label label={'Quản lý:'} position={'left'}>
								<Typography weight={'semibold'} size={'content'}>{userProfile?.username}</Typography>
							</Label>
							<Label label={'Email:'} position={'left'}>
								<Typography size={'content'}>{userProfile?.email}</Typography>
							</Label>
							<Label label={'Hoạt động cuối:'} position={'left'}>
								<Typography size={'content'}>{dayjs(userProfile?.last_login).format('DD/MM/YYYY HH:mm:ss')}</Typography>
							</Label>
						</div>
					</CenterBox>
					<CenterBox size={"lg"} classNames={{
						inner: 'pb-4 flex flex-col justify-center items-center'
					}}>
						<Button
							variant="filled"
							w={'100%'}
							className={"w-full !bg-[var(--main-color)] hover:bg-opacity-70 transition-colors"}
							onClick={() => openDrawer()}
						>
							Thêm chi nhánh
						</Button>
					</CenterBox>
					<CenterBox size={'lg'}>
						<Stack>
							{/*<di*/}
							{userProfile && userProfile.branches.map((branch, index) => (
								<Card
									key={`branch-${generateUID()}`}
									shadow={'sm'}
									classNames={{
										root: 'w-full cursor-pointer',
									}}
									className={"flex !flex-row justify-start items-center p-2 hover:bg-[var(--hover-card-color)] transition-colors"}
									onClick={() => directToBranch(branch.branch_id)}
								>
									<div className={'flex flex-col items-start'}>
										<div>
											<Label label={'Chi nhánh:'} weight={'medium'}>
												<Typography size={'content'} weight={'medium'}
																		color={'primary'}>{branch.branch_name}</Typography>
											</Label>
											<Label label={'Trạng thái:'} weight={'medium'}>
												<Typography
													size={'content'}
													weight={'medium'}
													color={
														branch.branch_status === 'inactive'
															? 'alert'
															: branch.branch_status === 'active'
																? 'primary' : 'warning'
													}
												>{localeVi.branch[branch.branch_status]}</Typography>
											</Label>
											<Label label={'Địa chỉ:'} weight={'medium'}>
												<Typography>{branch.address}</Typography>
											</Label>
											<Label label={'Điện thoại:'} weight={'medium'}>
												<Typography>{branch.phone_number}</Typography>
											</Label>
										</div>
									</div>
								</Card>
							))}
							{!userProfile && <Typography>Không có chi nhánh</Typography>}
						</Stack>
					</CenterBox>
				</div>
				<Drawer position={'right'} opened={openDrawerState} onClose={closeDrawer} title={
					<Typography weight={'semibold'} size={'h5'}>Thêm chi nhánh</Typography>
				}>
					<CreateBranch />
				</Drawer>
			</div>
		</div>
	);
}

export default DashboardOverview;