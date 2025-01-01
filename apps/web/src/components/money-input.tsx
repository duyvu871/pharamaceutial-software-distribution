import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@lib/tailwind-merge.ts';

interface MoneyInputComponentPropsExtend
	extends
		Omit<React.ComponentProps<'input'>, keyof MoneyInputProps>,
		MoneyInputProps {}

interface MoneyInputProps {
	value: number;
	onChange: (value: number) => void;
	onBlur?: (value: number) => void;
	currency?: string;
	className?: string;
}

export interface MoneyInputRef {
	focus: () => void;
	blur: () => void;
}

export const MoneyInput = forwardRef<MoneyInputRef, MoneyInputComponentPropsExtend>(
	({ value, onChange, currency = 'VND', className, ...props }, ref) => {
		const [displayValue, setDisplayValue] = useState('');
		const [isEditing, setIsEditing] = useState(false);
		const inputRef = useRef<HTMLInputElement>(null);

		const formatter = new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		useEffect(() => {
			if (!isEditing) {
				setDisplayValue(formatter.format(value));
			}
		}, [value, isEditing, formatter]);

		useImperativeHandle(ref, () => ({
			focus: () => inputRef.current?.focus(),
			blur: () => inputRef.current?.blur(),
		}));

		const handleFocus = () => {
			setIsEditing(true);
			setDisplayValue(value.toString());
			setTimeout(() => inputRef.current?.select(), 0);
		};

		const handleBlur = () => {
			if (!isEditing) {
				return;
			}
			setIsEditing(false);
			// const numericValue = parseFloat(displayValue.replace(/[^\d.-]/g, ''));
			const numericValue = parseFloat(displayValue.replace(/[^\d]/g, ''));
			if (!isNaN(numericValue)) {
				onChange(numericValue);
			} else {
				setDisplayValue(formatter.format(value));
			}
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			const numericValue = inputValue.replace(/[^\d]/g, '');
			setDisplayValue(numericValue);
			// onChange(parseFloat(numericValue));
		};

		const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				handleBlur();
			}
		}

		return (
			<input
				ref={inputRef}
				type="text"
				{...props}
				value={displayValue}
				onChange={handleChange}
				onKeyDown={handleEnter}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={cn("w-full h-[36px] px-3 py-2 text-gray-700 border border-zinc-300 rounded-md focus:outline-none focus:border-blue-500", className)}
			/>
		);
	}
);

MoneyInput.displayName = 'MoneyInput';

