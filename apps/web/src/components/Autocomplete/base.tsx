import React, { useState, useEffect, ChangeEvent } from 'react';
import { Popover, TextInput, List, Loader, Divider, TextInputProps, ScrollArea } from '@mantine/core';
import { useDebounce } from "@uidotdev/usehooks";
import { cva, type VariantProps } from "class-variance-authority";
import { tv } from '@lib/tailwind-variants.ts';

// Define Tailwind variants
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

interface AutocompleteSearchProps<T> extends VariantProps<typeof autocompleteVariants> {
	placeholder?: string;
	label?: React.ReactNode;
	data?: T[];
	valueKey?: string;
	onSearch: (term: string) => Promise<T[]>;
	onSelect: (item: T) => void;
	renderItem: (item: T) => React.ReactNode;
	getItemValue: (item: T) => string;
	debounceMs?: number;
	recent?: boolean;
	recentKey?: string;
	recentLabel?: string;
	inputProps?: TextInputProps;
}

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
															 }: AutocompleteSearchProps<T>) {
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

		searchItems();
	}, [debouncedSearchTerm, onSearch]);

	useEffect(() => {
		if (!recent) {
			return;
		}
		const recentSearches = localStorage.getItem(recentKey);
		if (recentSearches) {
			setRecentResults(JSON.parse(recentSearches));
		}
	}, [recent]);

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

