import React, { useState } from 'react';
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
    Select,
} from '@mantine/core';
import { Check, Clock, CreditCard, Repeat, X } from 'lucide-react';
import dayjs from 'dayjs';
import { AdminType } from '@schema/admin/admin-schema.ts';
import { Subscription } from '@schema/subscription-schema.ts';
import StateStatus from '@component/Status/state-status.tsx';
import { BranchPlanType, PaymentRightStatus, PaymentStatus } from '@type/enum/branch.ts';

interface SubscriptionCardProps {
	subscription: Subscription;
	onCancel?: (id: string) => void;
	updatePaymentStatus: (id: string, status: string) => void;
}

interface SubscriptionListProps {
	subscriptions: Subscription[];
	onCancel?: (id: string) => void;
	updatePaymentStatus: (id: string, status: string) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onCancel, updatePaymentStatus }) => {
	const isExpired = dayjs(subscription.end_date).isBefore(dayjs())

	const [status, setStatus] = useState<string>(subscription.payment_status ?? 'unpaid');

	const getStatusBadge = () => {
		if (isExpired) {
			return (
				<Badge color="red" leftSection={<X size={16} />}>
					Hết hạn
				</Badge>
			);
		}
		if (subscription.status === 'trialing') {
			return <Badge color="yellow" leftSection={<Clock size={16} />}>
				Thử nghiệm
			</Badge>;
		}
		return <Badge color="var(--main-color)" leftSection={<Check size={16} />}>
			Đang hoạt động
		</Badge>;
	};

	const BadgeColor = {
		unpaid: "bg-zinc-500/10 text-zinc-500",
		paid: "bg-green-500/10 text-green-500",
		pending: "bg-yellow-500/10 text-yellow-500",
		cancelled: "bg-zinc-500/10 text-zinc-500",
		expired: "bg-red-500/10 text-red-500",
	}

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
						Phương thức thanh toán: {subscription.payment_method || 'N/A'}
					</Text>
				</Group>
				<Group gap="sm" align="center">
					<ThemeIcon variant="light" color="gray" size={26} radius="xl">
						<CreditCard size={16} />
					</ThemeIcon>
					<Text size="md" >
						Trạng thái thanh toán:
						<StateStatus
							state={subscription.payment_status ?? 'unpaid'}
							customColor={BadgeColor}
							customText={PaymentStatus}
						/>
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
				<Stack gap="sm" align="start">
					<Select
						label="Trạng thái thanh toán"
						defaultValue={subscription.payment_status}
						onChange={(value) => value && setStatus(value)}
						data={Object.keys(PaymentRightStatus).map((key) => ({
							value: key,
							label: PaymentRightStatus[key as keyof typeof PaymentRightStatus],
						}))}
						renderOption={(value) =>  (
							<StateStatus
								state={value.option.value ?? 'unpaid'}
								customColor={BadgeColor}
								customText={PaymentRightStatus}
							/>
						)}
					/>
					<Button
						color={"var(--main-color)"}
						onClick={() => updatePaymentStatus(subscription.id, status)}
					>
						Cập nhật
					</Button>
				</Stack>
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

const BranchSubscriptionCollection: React.FC<SubscriptionListProps> = ({ subscriptions, onCancel, updatePaymentStatus }) => {

	return (
		<Box>
			<Grid gutter="md">
				{subscriptions.map((subscription) => (
					<Grid.Col
						key={subscription.id}
						span={6}
					>
						<SubscriptionCard
							subscription={subscription}
							onCancel={onCancel}
							updatePaymentStatus={updatePaymentStatus}
						/>
					</Grid.Col>
				))}
				{subscriptions.length === 0 &&
					<Text size="lg" color="gray">
						Chưa có đăng ký nào
					</Text>
				}
			</Grid>
		</Box>
	);
};

export default BranchSubscriptionCollection;