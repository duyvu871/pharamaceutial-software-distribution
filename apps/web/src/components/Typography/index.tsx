import * as React from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from '@lib/tailwind-variants.ts';
import { cn } from '@lib/tailwind-merge.ts';

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

export function Typography({
														 size = 'content',
														 color = 'text',
														 weight,
														 className,
														 ...props
													 }: Props & React.ComponentProps<'p'>) {
	return (
		<p
			className={cn(v({ color, size, weight }), className)}
			{...props}
		/>
	);
}