import { atom } from "jotai";
import { NotiAction, Notification } from '@schema/noti-schema.ts';

export const notificationAtom = atom<Notification[]>([]);

// Define a new atom to manage notifications
export const notificationsActionsAtom = atom(
	(get) => get(notificationAtom), // Read current state
	(
		get,
		set,
		action:
			| { type: 'add'; notification: Notification }
			| { type: 'remove'; id: string }
			| { type: 'set'; notifications: Notification[] }
			| { type: 'clear' }
			| { type: 'read'; id: string }
			| { type: 'read-all' }
	) => {
		const current = get(notificationAtom);
		if (action.type === 'add') {
			// Add a new notification
			set(notificationAtom, [...current, action.notification]);
		} else if (action.type === 'remove') {
			// Remove a notification by ID
			set(notificationAtom, current.filter((n) => n.id !== action.id));
		} else if (action.type === 'set') {
			// Set notifications to a new list
			set(notificationAtom, action.notifications);
		} else if (action.type === 'read') {
			// Mark a notification as read
			set(
				notificationAtom,
				current.map((n) =>
					n.id === action.id ? { ...n, isRead: true } : n
				)
			);
		} else if (action.type === 'clear') {
			// Clear all notifications
			set(notificationAtom, []);
		} else if (action.type === 'read-all') {
			// Mark all notifications as read
			set(
				notificationAtom,
				current.map((n) => ({ ...n, isRead: true }))
			);
		}
	}
);

export const activityAtom = atom<NotiAction[]>([]);

