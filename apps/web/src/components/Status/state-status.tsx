import React from 'react';
import { cn } from '@lib/tailwind-merge.ts';

type StateStatusProps = {
	state: 'success' | 'pending' | 'error' | 1 | 0 | 2 | 3 | string | number;
	customText?: {
		success?: string;
		pending?: string;
		error?: string;
		1?: string;
		0?: string;
		2?: string;
		3?: string;
		[key: string]: string | undefined;
	};
	customColor?: {
		success?: string;
		pending?: string;
		error?: string;
		1?: string;
		0?: string;
		2?: string;
		3?: string;
		[key: string]: string | undefined;
	}
};

const defaultText: Required<StateStatusProps['customText']> = {
	success: 'Thành công',
	pending: 'Đang xử lý',
	error: 'Lỗi',
	1: 'Kinh doanh',
	0: 'Ngưng kinh doanh',
	2: 'Chờ xác nhận',
	3: 'Đã hủy',
};

function StateStatus({ state, customText = {}, customColor }: StateStatusProps) {
	const text = { ...defaultText, ...customText }[state];

	const getStateColor = (state: StateStatusProps['state']) => {
		if (customColor && state in customColor) {
			return customColor[state];
		}

		switch (state) {
			case 'success':
			case 1:
				return 'bg-teal-500/10 text-teal-500';
			case 'pending':
			case 2:
				return 'bg-yellow-500/10 text-yellow-500';
			case 'error':
			case 3:
				return 'bg-red-500/10 text-red-500';
			default:
				return 'bg-gray-500/10 text-gray-500';
		}
	};

	return (
		<span
			className={cn(
				'px-2 py-1 rounded-md text-sm whitespace-nowrap',
				getStateColor(state)
			)}
		>
      {text}
    </span>
	);
}

export default StateStatus;

