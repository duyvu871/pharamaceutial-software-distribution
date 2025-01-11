import React from 'react';
import { Typography } from '@component/Typography';
import { Card, Group } from '@mantine/core';

type DashboardCardProps = {
	children?: React.ReactNode;
	title?: React.ReactNode;
	titleGroup?: React.ReactNode;
}

function DashboardCard({children, title, titleGroup}: DashboardCardProps): JSX.Element {
	return (
		<Card shadow="sm" padding="lg">
			<Group className={"!items-center !justify-between w-full"}>
				{title}
				{titleGroup}
			</Group>
			{children}
		</Card>
	);
}

export default DashboardCard;