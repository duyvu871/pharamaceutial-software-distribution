'use client'
import React, { useLayoutEffect } from 'react';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { useAtom } from 'jotai';
import NextImage from 'next/image';
import {Button, Image} from '@mantine/core'
import { Typography } from '@component/Typography';
import { Label } from '@component/label';
import { AiFillQuestionCircle } from "react-icons/ai";
import RingNoti from '@component/Notification/ring-noti.tsx';
import { getNotifications } from '@api/notification.ts';
import { notificationAtom } from '@store/state/overview/notifocation.ts';
import ContextHeader from '@component/Header/context-header.tsx';
import BranchPlan from '@component/Subscription/branch-plan.tsx';



function HeaderToolbar() {
	const [branchDetail] = useAtom(currentBranchAtom);
	const [, setNotifications] = useAtom(notificationAtom);

	useLayoutEffect(() => {
		(async () => {
			const notification = await getNotifications({
				page: 1,
				limit: 10,
				order: 'createdAt:desc'
			});
			// console.log(notification);
			setNotifications(notification);
			window.document.title = branchDetail?.branch_name || 'Admin';
		})();
	}, []);

	return (
		<div className={"w-full h-14 bg-white border-b border-b-zinc-200"}>
			<div className={"flex flex-row justify-between items-center w-full h-full"}>
				<div className={"mx-4 flex items-center gap-2"}>
					<Image component={NextImage} src={"/images/logo-MP-thuoc.png"} alt={"logo"} width={200} height={200}
								 className={"!w-8"} />
					<div>
						<Typography
							size={"h5"}
							weight={'bold'}
							color={'primary'}
							className={'uppercase'}
						>
							{branchDetail?.branch_name || 'Admin'}
						</Typography>
					</div>
				</div>
				<div className={"mx-4 flex items-center gap-3"}>
					<BranchPlan />
					<Button className={"hover-button-with-primary"}>
						<Label
							label={
								<AiFillQuestionCircle className={"text-emerald-600"} />
							}
						>
							<Typography
								size={"content"}
								weight={'normal'}
								color={'primary'}
								className={'capitalize'}
							>
								Hướng dẫn sử dụng
							</Typography>
						</Label>
					</Button>
					<RingNoti />
					<ContextHeader />
				</div>
			</div>
		</div>
	);
}

export default HeaderToolbar;