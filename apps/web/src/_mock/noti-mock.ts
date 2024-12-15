import { NotiAction, Notification } from '@schema/noti-schema.ts';

export const notificationMock: Notification[] = [
	{
		id: '1',
		title: 'New message received',
		description: 'You have a new message from John Doe',
		type: 'info',
		isRead: false,
	},
	{
		id: '2',
		title: 'Task completed',
		description: 'Your task "Update documentation" has been marked as complete',
		type: 'success',
		isRead: true,
	},
	{
		id: '3',
		title: 'Payment due',
		description: 'Your subscription payment is due in 3 days',
		type: 'warning',
		isRead: false,
	},
	{
		id: '4',
		title: 'Error in deployment',
		description: 'There was an error deploying your latest changes',
		type: 'error',
		isRead: false,
	},
]

export const notiActionMock: NotiAction[] = [
	{
		username: "ntphuchungduong",
		role: "membership", // Changed from "manager"
		entity: "product",
		action: "created",
		value: 60000,
		timestamp: "24 ngày trước",
	},
	{
		username: "nguoisudungkhac",
		role: "membership",
		entity: "order",
		action: "purchased",
		quantity: 1,
		value: 100000,
		timestamp: "3 ngày trước",
	},
	{
		username: "ntphuchungduong",
		role: "membership", // Changed from "manager"
		entity: "product",
		action: "updated",
		value: 0, // No value change in update
		timestamp: "1 tuần trước",
	},
	{
		username: "admin",
		role: "admin",
		entity: "system",
		action: "error",
		value: 0,
		timestamp: "1 giờ trước",
	},
	{
		username: "nguoisudungkhac2",
		role: "membership",
		entity: "order",
		action: "canceled",
		quantity: 1,
		value: 0, // Value is 0 after cancellation
		timestamp: "2 ngày trước",
	},
	{
		username: "anotheruser",
		role: "membership",
		entity: "product",
		action: "purchased",
		quantity: 5,
		value: 250000,
		timestamp: "yesterday",
	},
	{
		username: "manager2",
		role: "membership", // Changed from "manager"
		entity: "product",
		action: "created",
		quantity: 10,
		value: 1000000,
		timestamp: "10 days ago",
	},
	{
		username: "admin",
		role: "admin",
		entity: "system",
		action: "maintenance",
		value: 0,
		timestamp: "2 hours ago",
	},
	{
		username: "nguoisudungkhac3",
		role: "membership",
		entity: "order",
		action: "returned",
		quantity: 3,
		value: 150000,
		timestamp: "5 days ago",
	},
	{
		username: "manager2",
		role: "membership", // Changed from "manager"
		entity: "product",
		action: "updated",
		value: 0,
		timestamp: "3 days ago",
	},
];