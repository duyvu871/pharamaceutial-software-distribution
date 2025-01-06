import * as React from 'react';
import { cn } from '@lib/tailwind-merge.ts';
import { VariantProps } from 'tailwind-variants';
import { tv } from '@lib/tailwind-variants.ts';

const v = tv({
	base: 'text-md',
	variants: {
		size: {
			h1: `text-[48px]`,
			h2: `text-[48px]`,
			h3: `text-[30px]`,
			h4: `text-[34px]`,
			h5: `text-[20px]`,
			h6: `text-[18px]`,
			content: `text-[16px]`,
			sm: `text-[14px]`,
			xs: `text-[12px]`,
		},
		weight: {
			bold: 'font-bold',
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			thin: 'font-thin',
		},
		color: {
			primary: 'text-teal-500',
			text: 'text-zinc-700',
			alert: 'text-red-500',
			warning: 'text-amber-500',
			white: 'text-white',
			black: 'text-black',
		}
	},
});

type Variants = VariantProps<typeof v>;
type Props = Variants & React.PropsWithChildren;

type LabelProps = {
	children: React.ReactNode;
	label: React.ReactNode;
	position?: 'left' | 'right' | 'top' | 'bottom';
	className?: string;
	classNames?: {
		wrapper?: string;
		label?: string;
	};
};

const defaultClassNames = {
	wrapper: 'w-full flex justify-start',
	label: 'text-md text-zinc-700 flex-shirk-0 whitespace-nowrap',
}

export function Label({
												children,
												label,
												position = 'left',
												className,
												classNames = defaultClassNames,
												color = 'text',
												size = 'content',
												weight = 'semibold',
												...props
											}: LabelProps & Props & React.ComponentProps<'div'>) {

	const labelPosition = (position: LabelProps['position']): {
		wrapper: string;
		label: string;
	} => {
		switch (position) {
			case 'left': {
				return {
					wrapper: 'flex items-center',
					label: 'mr-2',
				}
			}
			case 'right': {
				return {
					wrapper: 'flex items-center',
					label: 'ml-2',
				}
			}
			case 'top': {
				return {
					wrapper: 'flex flex-col items-start',
					label: '',
				}
			}
			case 'bottom': {
				return {
					wrapper: 'flex flex-col items-start',
					label: '',
				}
			}
			default: {
				return {
					wrapper: 'flex items-center',
					label: 'ml-4',
				}
			}
		}
	}

	const { wrapper, label: labelClass } = labelPosition(position);

	const labelComponent =
		<span
			className={
				cn(
					v({ color, size, weight }),
					defaultClassNames.label,
					labelClass,
					classNames?.label
				)
			}
		>{label}</span>;

	return (
		<div className={cn('flex items-center', wrapper, className, classNames?.wrapper)} {...props}>
			{(position === 'left' || position === 'top') && labelComponent}
			{children}
			{(position === 'right' || position === 'bottom') && labelComponent}
		</div>
	);
}