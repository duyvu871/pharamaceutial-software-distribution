import * as React from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from '@lib/tailwind-variants.ts';
import { cn } from '@lib/tailwind-merge.ts';

const v = tv({
	base: 'w-full',
	variants: {
		size: {
			'xs': 'max-w-xs',
			'sm': 'max-w-sm',
			'content': 'max-w-md',
			'lg': 'max-w-lg',
			'xl': 'max-w-xl',
			'2xl': 'max-w-2xl',
			'3xl': 'max-w-3xl',
			'4xl': 'max-w-4xl',
			'5xl': 'max-w-5xl',
		},
	},
});

type ClassNames = {
	wrapper?: React.ComponentProps<'div'>['className'];
	inner?: React.ComponentProps<'div'>['className'];
}

type Variants = VariantProps<typeof v>;
type Props = Variants & React.PropsWithChildren & {
	classNames?: ClassNames;
};

const defaultClassNames: ClassNames = {
	wrapper: 'w-full flex justify-center',
	inner: '',
}

export function CenterBox({
														size = 'content',
														className,
														classNames = defaultClassNames,
														...props
													 }: Props & React.ComponentProps<'div'>) {
	return (
		<div className={cn(defaultClassNames.wrapper, classNames?.wrapper || '', className)}>
			<div
				className={
				cn(
					v(
						{ size }
					),
					classNames.inner,
					classNames?.inner || '',
				)
			}
				{...props}
			/>
		</div>
	);
}