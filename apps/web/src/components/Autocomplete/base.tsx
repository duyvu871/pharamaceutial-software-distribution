import React, { useState, useEffect, ChangeEvent } from 'react';
import { Popover, TextInput, List, Loader, Divider, TextInputProps, ScrollArea } from '@mantine/core';
import { useDebounce } from "@uidotdev/usehooks";
import { cva, type VariantProps } from "class-variance-authority";
import { tv } from '@lib/tailwind-variants.ts';

/**
 * Defines the available sizes for the autocomplete component.
 */
type AutocompleteSize = 'none' | 'xs' | 'sm' | 'md' | 'lg';

/**
 * Defines the available themes for the autocomplete component.
 */
type AutocompleteTheme = 'light' | 'dark';

// Define Tailwind variants
/**
 * Defines the Tailwind variants for the autocomplete container.
 */
const autocompleteVariants = tv(
	{
		base: "w-full relative",
		variants: {
			size: {
				none: "",
				xs: "w-48",
				sm: "w-64",
				md: "w-96",
				lg: "w-128",
			},
			theme: {
				light: "bg-white text-gray-900",
				dark: "bg-gray-800 text-white",
			},
		},
		defaultVariants: {
			size: "none",
			theme: "light",
		},
	}
);

/**
 * Defines the Tailwind variants for the list items.
 */
const listItemVariants = cva(
	"w-full rounded-md cursor-pointer transition-colors",
	{
		variants: {
			theme: {
				light: "hover:bg-gray-100",
				dark: "hover:bg-gray-700",
			},
		},
		defaultVariants: {
			theme: "light",
		},
	}
);

/**
 * Defines the props for the AutocompleteSearch component.
 * @template T The type of data being searched.
 */
interface AutocompleteSearchProps<T> extends VariantProps<typeof autocompleteVariants> {
	/** Placeholder text for the input field. Defaults to "Search...". */
	placeholder?: string;
	/** Label for the input field. */
	label?: React.ReactNode;
	/** Array of data to render in the list if no search term is entered. */
	data?: T[];
	/** Key to access a value from the item for setting the input field. */
	valueKey?: string;
	/** Function to perform the search. Should return a Promise that resolves with an array of the results. */
	onSearch: (term: string) => Promise<T[]>;
	/** Function called when an item is selected. */
	onSelect: (item: T) => void;
	/** Function to render each item in the list. */
	renderItem: (item: T) => React.ReactNode;
	/** Function to get the displayed text value from an item. */
	getItemValue: (item: T) => string;
	/** Debounce time (in milliseconds) before performing a search. Defaults to 300. */
	debounceMs?: number;
	/** If true, display recent searches. Defaults to false. */
	recent?: boolean;
	/** Key used for storing recent searches in local storage. Defaults to "recentSearches". */
	recentKey?: string;
	/** Label for the recent searches section. Defaults to "Recent searches". */
	recentLabel?: string;
	/** Additional props to pass down to the TextInput component. */
	inputProps?: TextInputProps;
	/** The size of the autocomplete component, can be `none`, `xs`, `sm`, `md`, or `lg`. */
	size?: AutocompleteSize;
	/** The theme of the autocomplete component, can be `light` or `dark`. */
	theme?: AutocompleteTheme;

}

/**
 * A generic autocomplete search component with debounced search, recent searches, and various customization options.
 * @template T The type of data being searched.
 * @param {AutocompleteSearchProps<T>} props - The props for the component.
 * @returns {React.ReactNode} The AutocompleteSearch component.
 */
function AutocompleteSearch<T>({
																 placeholder = "Search...",
																 label,
																 valueKey,
																 data = [],
																 onSearch,
																 onSelect,
																 renderItem,
																 getItemValue,
																 size,
																 theme,
																 debounceMs = 300,
																 recent = false,
																 recentKey = "recentSearches",
																 recentLabel = "Recent searches",
																 inputProps,
															 }: AutocompleteSearchProps<T>): React.ReactNode {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [results, setResults] = useState<T[]>([]);
	const [recentResults, setRecentResults] = useState<T[]>([]);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

	const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const selectItem = (item: T) => {
		onSelect(item);
		setPopoverOpened(false);
		setResults([]);
		setSearchTerm(valueKey ? (item as any)[valueKey] : getItemValue(item));
		if (!recent) {
			return;
		}
		const updatedRecentResults = [
			item,
			...recentResults.filter(i => getItemValue(i) !== getItemValue(item))
		].slice(0, 5);
		setRecentResults(updatedRecentResults);

		localStorage.setItem(recentKey, JSON.stringify(updatedRecentResults));
	};

	useEffect(() => {
		const searchItems = async () => {
			if (!debouncedSearchTerm) {
				setResults([]);
				return;
			}
			setIsSearching(true);
			try {
				const data = await onSearch(debouncedSearchTerm);
				setResults(data);
			} catch (error) {
				console.error("Search error:", error);
				setResults([]);
			} finally {
				setIsSearching(false);
			}
		};

		void searchItems();
	}, [debouncedSearchTerm, onSearch]);

	useEffect(() => {
		if (!recent) {
			return;
		}
		const recentSearches = localStorage.getItem(recentKey);
		if (recentSearches) {
			setRecentResults(JSON.parse(recentSearches));
		}
	}, [recent, recentKey]);

	return (
		<div className={autocompleteVariants({ size, theme })}>
			<Popover
				opened={popoverOpened}
				onClose={() => setPopoverOpened(false)}
				position="top-start"
				withArrow
				shadow="md"
			>
				<Popover.Target>
					<TextInput
						label={label}
						value={searchTerm}
						onChange={handleChange}
						placeholder={placeholder}
						onFocus={() => setPopoverOpened(true)}
						onBlur={() => setTimeout(() => setPopoverOpened(false), 200)}
						rightSection={isSearching && <Loader size="xs" />}
						{...inputProps}
					/>
				</Popover.Target>
				<Popover.Dropdown w={200} p={0}  className={`w-full !max-h-[300px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
					<ScrollArea.Autosize mah={250} mih={100} mx="auto">
						<List className="w-full" p={10}>
							{results.map((item, index) => (
								<List.Item
									key={`result-${index}`}
									onClick={() => selectItem(item)}
									className={listItemVariants({ theme })}
								>
									{renderItem(item)}
								</List.Item>
							))}
							{searchTerm.length === 0
								&& data
								&& data.map((item, index) => (
									<List.Item
										key={`result-${index}`}
										onClick={() => selectItem(item)}
										className={listItemVariants({ theme })}
									>
										{renderItem(item)}
									</List.Item>
								))
							}
							{!isSearching && results.length === 0 && searchTerm && (
								<div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
									No results found
								</div>
							)}
						</List>
					</ScrollArea.Autosize>

					{(recent && recentResults.length > 0) && (
						<>
							<Divider
								size="xs"
								label={recentLabel}
								className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
							/>
							<List>
								{recentResults.map((item, index) => (
									<List.Item
										key={`recent-${index}`}
										onClick={() => selectItem(item)}
										className={listItemVariants({ theme })}
									>
										{renderItem(item)}
									</List.Item>
								))}
							</List>
						</>
					)}
				</Popover.Dropdown>
			</Popover>
		</div>
	);
}

export default AutocompleteSearch;