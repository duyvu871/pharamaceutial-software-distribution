import { Button, Indicator, Popover } from '@mantine/core';
import React, { useLayoutEffect, useState } from 'react';
import '@style/button.css';
import { NotificationList } from '@component/Notification/noti-display.tsx';
import { Typography } from '@component/Typography';
import { BiBell } from 'react-icons/bi';
import { notificationAtom, notificationsActionsAtom } from '@store/state/overview/notifocation.ts';
import { useAtom } from 'jotai';
import useNotification from '@hook/dashboard/use-noti.ts';

function RingNoti() {
	const [notis] = useAtom(notificationAtom);
	// const [, notiDispatch] = useAtom(notificationsActionsAtom)
	const {readNoti, removeNoti} = useNotification();
	const [totalNoti, setTotalNoti] = useState<number>(2);
	const [displayNotiNumber, setDisplayNotiNumber] = useState<string>('');
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	useLayoutEffect(() => {
		// console.log('notis', notis);
		const total_noti = notis.filter(n => !n.isRead).length;
		setTotalNoti(total_noti);
		if (total_noti === 0) {
			setIsProcessing(false);
			setDisplayNotiNumber('');
		} else if (total_noti > 9) {
			setIsProcessing(true);
			setDisplayNotiNumber('9+');
		} else {
			setIsProcessing(true);
			setDisplayNotiNumber(total_noti.toString());
		}
	}, [notis]);

	// const onReaded = (id: string) => {
	// 	notiDispatch({ type: 'read', id });
	// }
	//
	// const onRemove = (id: string) => {
	// 	notiDispatch({ type: 'remove', id });
	// }

	return (
		<Popover width={400} position="bottom" offset={0} withArrow shadow='xs'>
			<Popover.Target>
				<Indicator
					// component={Button}
					// ref={ref}
					label={
						<Typography className={'text-white text-[10px]'}>{displayNotiNumber}</Typography>
					}
					classNames={{
						indicator: !!totalNoti ? '' : '!hidden'
					}}
					offset={2}
					withBorder
					processing={isProcessing}
					inline
					size={20}
					color={'green'}
				>
					<Button className={"!p-2 !bg-white hover-button-with-primary "}>
						<BiBell className={"text-xl text-emerald-600"} />
					</Button>
				</Indicator>
			</Popover.Target>
			<Popover.Dropdown p={0} className={'!rounded-lg'}>
				{/*<Typography size="xs">This is uncontrolled popover, it is opened when button is clicked</Typography>*/}
				<NotificationList notifications={notis} onReaded={readNoti} onRemove={removeNoti}/>
			</Popover.Dropdown>
		</Popover>
	);
}

export default RingNoti;