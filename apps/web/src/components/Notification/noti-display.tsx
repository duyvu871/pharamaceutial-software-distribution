import { Bell, Check, X } from 'lucide-react'
import { Typography } from '@component/Typography';
import { Notification } from '@schema/noti-schema';
import { cn } from '@lib/tailwind-merge.ts';
// import { notificationAtom } from '@store/state/overview/notifocation.ts';
// import { useAtom } from 'jotai';

type NotificationListProps = {
	notifications: Notification[];
	onReaded: (id: string) => void;
	onRemove: (id: string) => void;
}

export function NotificationList({notifications, onReaded, onRemove}: NotificationListProps) {

	const NotificationItem = ({ notification }: { notification: Notification }) => {
		const typeColors = {
			info: 'bg-blue-500',
			success: 'bg-green-500',
			warning: 'bg-yellow-500',
			error: 'bg-red-500',
		}

		return (
			<li className={`flex items-start p-4 ${notification.isRead ? 'bg-gray-50' : 'bg-white'}`}>
				<span className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${typeColors[notification.type]}`} />
				<div className="ml-4 flex-grow min-w-0">
					<Typography size={'xs'} weight={'semibold'} className=" text-gray-900">
						{notification.title}
					</Typography>
					<Typography size={'xs'} className=" text-gray-500 truncate">
						{notification.description}
					</Typography>
				</div>
				<div className="ml-4 flex-shrink-0 flex space-x-2">
					<button
						disabled={notification.isRead}
						onClick={() => onReaded(notification.id)}
						className={cn("p-1 rounded-full  transition duration-200", {
							'hover:bg-gray-100': !notification.isRead,
						})}
						aria-label="Mark as read">
						<Check className="h-4 w-4 text-gray-500" />
					</button>
					<button
						onClick={() => onRemove(notification.id)}
						className="p-1 rounded-full hover:bg-gray-100 transition duration-200"
						aria-label="Dismiss">
						<X className="h-4 w-4 text-gray-500" />
					</button>
				</div>
			</li>
		)
	}

	return (
		<div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="p-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<Typography size={'content'} className="font-semibold flex items-center">
						<Bell className="mr-2 h-4 w-4" />
						Thông báo
					</Typography>
					{/*<button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition duration-200">*/}
					{/*	Mark all as read*/}
					{/*</button>*/}
				</div>
				<Typography size={'xs'} className="text-gray-600">
					Bạn có {notifications.filter(n => !n.isRead).length} thông báo chưa đọc
				</Typography>
			</div>
			<div className="max-h-96 overflow-auto">
				<ul className="divide-y divide-gray-200">
					{notifications.map((notification) => (
						<NotificationItem key={notification.id} notification={notification} />
					))}
				</ul>
			</div>
		</div>
	)
}



