import React from 'react';
import { Card, Group, Stack, Timeline, Text } from '@mantine/core';
// import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';
import { Typography } from '@component/Typography';
import { activityAtom } from '@store/state/overview/notifocation.ts';
import { useAtom } from 'jotai';
import DashboardCard from '@component/Card/dashboard-card.tsx';
import { MdOutlineUpdate, MdCreateNewFolder  } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoWarning } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { localeVi, wordVi } from '@global/locale.ts';
import { NotiAction } from '@schema/noti-schema.ts';
import { useUID } from '@hook/common/useUID.ts';

const iconClass = {
	created: 'text-green-500',
	updated: 'text-blue-500',
	purchased: 'text-yellow-500',
	deleted: 'text-red-500',
	canceled: 'text-red-500',
	error: 'text-red-500',
	maintenance: 'text-yellow-500',
	returned: 'text-yellow-500',
}

const Icon = {
	created: <MdCreateNewFolder className={iconClass.created} />,
	updated: <MdOutlineUpdate className={iconClass.updated}/>,
	purchased: <BiSolidPurchaseTag className={iconClass.purchased}/>,
	deleted: <FaDeleteLeft className={iconClass.deleted}/>,
	error: <IoWarning className={iconClass.error}/>,
	maintenance: <FaInfoCircle className={iconClass.maintenance}/>,
	returned: <FaInfoCircle className={iconClass.returned}/>,
} as const;

function DashboardActivity() {
	const [activities,] = useAtom(activityAtom);
	const {generateUID} = useUID();
	return (
		<DashboardCard
			title={
				<Typography size={'h6'} weight={'semibold'}>
					Hoạt động
				</Typography>
			}
		>
			<Stack py={'lg'}>
				{activities.length === 0 && (
					<Typography size={'xs'} weight={'normal'} color={'text'}>
						Chưa có hoạt động nào
					</Typography>
				)}
				<Timeline bulletSize={30} lineWidth={1}>
					{activities.map((activity, index) => (
						<Timeline.Item
							key={'activity-' + generateUID()}
							bullet={Icon?.[activity.action as keyof typeof Icon] || <FaInfoCircle className={'text-blue-500'}/>}
							color={'red'}
							classNames={{
								itemBullet: '!bg-white',
							}}
							title={
								<Typography size={'content'} weight={'normal'} className={'leading-5 lowercase'}>
									<span className={'text-blue-500 font-medium'}>{activity.username}</span>
									{' - '} <span className={'text-blue-500'}>{wordVi[activity.role]}</span>
									{' - '} <span>{localeVi.noti.notiAction[activity.action]}</span>
									{' '}
									<span>{Boolean(activity.quantity) ? `x${activity.quantity }` : ''}{' '}
										{
										// @ts-ignore
										wordVi?.[activity.entity] || activity.entity
										}
									</span>
									<span>{activity.value ? ` - ${activity.value.toLocaleString()}đ` : ''}</span>
								</Typography>
							}>
							<Text size="xs" mt={4}>{activity.timestamp}</Text>
						</Timeline.Item>
					))}
				</Timeline>
			</Stack>
		</DashboardCard>
	);
}

export default DashboardActivity;