import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

// Context
const DropdownContext = createContext<{
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	toggleDropdown: () => void;
} | null>(null);

// Hook để sử dụng context
const useDropdownContext = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('Dropdown components must be used within a Dropdown');
	}
	return context;
};

// Main Dropdown component
interface DropdownProps {
	children: ReactNode;
	className?: string;
}

export const Dropdown = ({ children, className = '' }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<DropdownContext.Provider value={{ isOpen, setIsOpen, toggleDropdown }}>
			<div className={`relative inline-block ${className}`} ref={dropdownRef}>
				{children}
			</div>
		</DropdownContext.Provider>
	);
};

// Dropdown.Trigger component
interface TriggerProps {
	children: ReactNode;
	className?: string;
}

Dropdown.Trigger = ({ children, className = '' }: TriggerProps) => {
	const { toggleDropdown } = useDropdownContext();
	return (
		<div onClick={toggleDropdown} className={className}>
			{children}
		</div>
	);
};

// Dropdown.Content component
interface ContentProps {
	children: ReactNode;
	className?: string;
}

Dropdown.Content = ({ children, className = '' }: ContentProps) => {
	const { isOpen } = useDropdownContext();
	if (!isOpen) return null;

	return (
		<div
			className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${className}`}
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			{children}
		</div>
	);
};

// Dropdown.Item component
interface ItemProps {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}

Dropdown.Item = ({ children, onClick, className = '' }: ItemProps) => {
	const { setIsOpen } = useDropdownContext();
	const handleClick = () => {
		onClick?.();
		setIsOpen(false);
	};

	return (
		<button
			className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
			role="menuitem"
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

