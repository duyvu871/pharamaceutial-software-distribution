import React from 'react';
import { Card, Stack } from '@mantine/core';
import DashboardCard from '@component/Card/dashboard-card.tsx';
import { Typography } from '@component/Typography';

function NotiCard() {
	return (
		<DashboardCard
			title={
				<Typography size={'h6'} weight={'semibold'}>
					Thông báo
				</Typography>
			}
		>
			<Stack p="lg">
				<Typography size={'content'} weight={'normal'} color={'text'}>
					Chưa có thông báo nào
				</Typography>
			</Stack>
		</DashboardCard>
	);
}

export default NotiCard;