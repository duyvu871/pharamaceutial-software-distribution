// import { useAtom } from 'jotai';
// import React, { forwardRef, LegacyRef, useLayoutEffect, useState } from 'react';
// import { notificationAtom } from '@store/state/overview/notifocation.ts';
// import { Typography } from '@component/Typography';
// import { Button, Indicator } from '@mantine/core';
// import { BiBell } from 'react-icons/bi';
//
// type NotiIndicatorProps = {
//
// }
//
// const NotiIndicator = () => {
// 	const [notis] = useAtom(notificationAtom);
// 	const [totalNoti, setTotalNoti] = useState<number>(2);
// 	const [displayNotiNumber, setDisplayNotiNumber] = useState<string>('');
// 	const [isProcessing, setIsProcessing] = useState<boolean>(false);
// 	useLayoutEffect(() => {
// 		console.log('notis', notis);
// 		const total_noti = notis.filter(n => !n.isRead).length;
// 		setTotalNoti(total_noti);
// 		if (total_noti === 0) {
// 			setIsProcessing(false);
// 			setDisplayNotiNumber('');
// 		} else if (total_noti > 9) {
// 			setIsProcessing(true);
// 			setDisplayNotiNumber('9+');
// 		} else {
// 			setIsProcessing(true);
// 			setDisplayNotiNumber(total_noti.toString());
// 		}
// 	}, [notis]);
//
// 	return (
// 		<div>
// 			<Indicator
// 				// component={Button}
// 				// ref={ref}
// 				label={
// 					<Typography className={'text-white text-[10px]'}>{displayNotiNumber}</Typography>
// 				}
// 				classNames={{
// 					indicator: !!totalNoti ? '' : '!hidden'
// 				}}
// 				offset={2}
// 				withBorder
// 				processing={isProcessing}
// 				inline
// 				size={20}
// 				color={'green'}
// 			>
// 				<Button className={"!p-2 !bg-white hover-button-with-primary "}>
// 					<BiBell className={"text-xl text-emerald-600"} />
// 				</Button>
// 			</Indicator>
// 		</div>
// 	);
// }
//
// export default NotiIndicator;