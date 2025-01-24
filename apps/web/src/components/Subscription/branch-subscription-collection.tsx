import React from 'react';
import {
	Card,
	Text,
	Badge,
	Group,
	Stack,
	Divider,
	ThemeIcon,
	Flex,
	Grid,
	Box,
	Button,
} from '@mantine/core';
import { Check, Clock, CreditCard, Repeat, X } from 'lucide-react';
import dayjs from 'dayjs';
import { AdminType } from '@schema/admin/admin-schema.ts';
import { Subscription } from '@schema/subscription-schema.ts';

interface SubscriptionCardProps {
	subscription: Subscription;
	onCancel?: (id: string) => void;
}

interface SubscriptionListProps {
	subscriptions: Subscription[];
	onCancel?: (id: string) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onCancel }) => {
	const isExpired = dayjs(subscription.end_date).isBefore(dayjs())

	const getStatusBadge = () => {
		if (isExpired) {
			return <Badge color="red" leftSection={<X size={16} />}>
				Hết hạn
			</Badge>;
		}
		if (subscription.status === 'trialing') {
			return <Badge color="yellow" leftSection={<Clock size={16} />}>
				Thử nghiệm
			</Badge>;
		}
		return <Badge color="teal" leftSection={<Check size={16} />}>
			Đang hoạt động
		</Badge>;
	};

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Flex justify="space-between" align="center" mb="sm">
				<Text size="lg" fw={500} >
					{subscription.branch_plans.plan_name}
				</Text>
				{getStatusBadge()}
			</Flex>
			<Stack gap="xs">
				<Divider/>
				<Group gap="sm" align="center">
					<ThemeIcon variant="light" color="gray" size={26} radius="xl">
						<Clock size={16} />
					</ThemeIcon>
					<Text size="md" >
						{`Bắt đầu: ${dayjs(subscription.start_date).format('DD/MM/YYYY')}`}
					</Text>
					<Text size="md" >
						{`Hết hạn: ${dayjs(subscription.end_date).format('DD/MM/YYYY')}`}
					</Text>
				</Group>
				<Group gap="sm" align="center">
					<ThemeIcon variant="light" color="gray" size={26} radius="xl">
						<CreditCard size={16} />
					</ThemeIcon>
					<Text size="md">
						Thanh toán: {subscription.payment_method || 'N/A'}
					</Text>
				</Group>
				<Group gap="sm" align="center">
					<ThemeIcon variant="light" color="gray" size={26} radius="xl">
						<Repeat size={16} />
					</ThemeIcon>
					<Text size="md" >
						Tự động gia hạn: {subscription.auto_renew ? 'Có' : 'Không'}
					</Text>
				</Group>
				<Divider />
				<Box mt="md">
					{onCancel && !isExpired && <Button
						color="red"
						onClick={() => onCancel(subscription.id)}
						fullWidth
					>
						Hủy đăng ký
					</Button>}
				</Box>
			</Stack>
		</Card>
	);
};

const BranchSubscriptionCollection: React.FC<SubscriptionListProps> = ({ subscriptions, onCancel }) => {
	// console.log(subscriptions);

	return (
		<Box>
			<Grid gutter="md">
				{subscriptions.map((subscription) => (
					<Grid.Col
						key={subscription.id}
						span={6}
					>
						<SubscriptionCard subscription={subscription} onCancel={onCancel} />
					</Grid.Col>
				))}
				{subscriptions.length === 0 &&
					<Text align="center" size="lg" color="gray">
						Chưa có đăng ký nào
					</Text>
				}
			</Grid>
		</Box>
	);
};

export default BranchSubscriptionCollection;