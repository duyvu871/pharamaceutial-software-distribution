import { readNotification } from '@api/notification.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { notificationsActionsAtom } from '@store/state/overview/notifocation.ts';
import { useAtom } from 'jotai';
import { Notification } from '@schema/noti-schema.ts';

export default function useNotification() {
	const toast = useToast();
	const [, notiDispatch] = useAtom(notificationsActionsAtom)

	const readNoti = async (notiId: string): Promise<boolean> => {
		if (!notiId) {
			toast.showWarningToast('Không tìm thấy thông báo');
			return false;
		}
		const resposne = await readNotification(notiId);
		if (typeof resposne === 'boolean') {
			// toast.showSuccessToast('Đã đọc thông báo');
			notiDispatch({ type: 'read', id: notiId });
			return true;
		} else {
			toast.showErrorToast(resposne.errorMessage);
			return false;
		}
	}

	const addNoti = (noti: Notification): boolean => {
		if (!noti) {
			toast.showWarningToast('Không tìm thấy thông báo');
			return false;
		}
		notiDispatch({ type: 'add', notification: noti });
		return true;
	}

	const removeNoti = (notiId: string): boolean => {
		if (!notiId) {
			toast.showWarningToast('Không tìm thấy thông báo');
			return false;
		}
		notiDispatch({ type: 'remove', id: notiId });
		return true;
	}

	const readAllNoti = (): boolean => {
		notiDispatch({ type: 'read-all' });
		return true;
	}

	return {
		readNoti,
		addNoti,
		removeNoti,
		readAllNoti
	}
}