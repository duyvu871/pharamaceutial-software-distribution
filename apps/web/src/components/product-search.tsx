import { useState, useEffect, ChangeEventHandler, ChangeEvent, memo } from 'react';
import { Autocomplete, Box, Divider, List, Loader, Popover, TextInput } from '@mantine/core';
import { useDebounce } from "@uidotdev/usehooks";
import { autocomplete } from '@api/autocomplete.ts';
import { SearchProductType } from '@schema/autocomplete.ts';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { Typography } from '@component/Typography';
import { useUID } from '@hook/common/useUID';
import { parseJson } from '@util/parse-json.ts';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';

const ListItems =({item, onClick}: {item: SearchProductType, onClick: () => void}) => {
	return (
		<List.Item
			key={item.drug_code}
			onClick={onClick} // Close on select
			w={'100%'}
			className={'rounded-md cursor-pointer hover:bg-teal-600/20 transition-colors'}
		>
			<Box className={'p-2 relative flex justify-start items-center gap-2'}>
				<Image alt={item.drug_name} src={'/images/placeholder.png'} width={100} height={100}
							 className={'w-10 object-cover'} />
				<Typography weight={'semibold'}>{item.drug_name}</Typography>
			</Box>
		</List.Item>
	)
}

const ProductAutocomplete = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selected, setSelected] = useState<string>("");
	const [results, setResults] =useState<SearchProductType[]>([]);
	const [recentResults, setRecentResults] = useState<SearchProductType[]>([]);

	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [shouldSearch, setShouldSearch] = useState<boolean>(true);
	const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

	const [, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab] = useAtom(invoiceActiveTabActionAtom);

	// const [dropdownOpened, { toggle, open, close }] = useDisclosure();
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	// const {generateUID} = useUID();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setShouldSearch(true);
	};

	const selectItem = (item: SearchProductType) => {
		// setSelected(item);
		if (!activeTab) {
			// console.error("No active tab selected");
			return;
		}
		const addedItemInvoice = {
			productName: item.drug_name,
			quantity: 1,
			price: 10000,
			total: 10000,
			note: "",
			id: item.drug_code,
		}
		invoiceDispatch({
			type: 'add-item',
			id: activeTab,
			item: addedItemInvoice
		});
		// close();
		setShouldSearch(false);
	}

	useEffect(() => {
		const searchHN = async () => {
			setIsSearching(true);
			try { // Add try/catch for error handling
				// close();
				if (!debouncedSearchTerm) {
					setResults([]);
					return;
				}
				const data = await autocomplete(debouncedSearchTerm, 5);
				setResults(data);
				console.log("Search results:", data);
			} catch (error) {
				console.error("Search error:", error);
				setResults([]); // Clear results on error
			} finally {
				setIsSearching(false);
				// open();
			}
		};

		if (shouldSearch && debouncedSearchTerm) { // Only call API if there's a search term
			searchHN();
		} else {
			// setResults([]);  // Clear results if search term is empty
		}

	}, [debouncedSearchTerm, shouldSearch]);

	useEffect(() => {  // This useEffect updates localStorage
		localStorage.setItem("recentSearches", JSON.stringify(recentResults.slice(0, 5))); // Store up to 5 recent searches
	}, [recentResults]);

	useEffect(() => {
		const recentSearches = localStorage.getItem("recentSearches");
		if (recentSearches) {
			setRecentResults(parseJson(recentSearches));
		}
		console.log('rerender');
	}, []);

	return (
		<div className="w-96 relative"> {/* relative for Popover positioning */}
			<Popover
				opened={popoverOpened}
				onClose={() => setPopoverOpened(false)}
				position="bottom"
				withArrow
				shadow="md"
			>
				<Popover.Target>
					<TextInput
						value={searchTerm}
						onChange={handleChange}
						placeholder="Tìm sản phẩm"
						onFocus={() => setPopoverOpened(true)} // Open on focus
						onBlur={() => setTimeout(() => setPopoverOpened(false), 200)} // Close on blur with delay
						rightSection={isSearching && <Loader size="xs" />}
					/>
				</Popover.Target>
				<Popover.Dropdown className={'!w-96'}>
					<List className={'w-full max-w-md'}>
						{results.map((item) =>
							<ListItems
								key={`${item.drug_code}-1`}
								item={item}
								onClick={() => {
									selectItem(item);
									setPopoverOpened(false);
									setResults([]);
									const updatedRecentResults = [item, ...recentResults.filter(i => i.drug_code !== item.drug_code)].slice(0,5);
									setRecentResults(updatedRecentResults);
								}}
							/>
						)}
						{!isSearching && results.length === 0 && searchTerm && (
							<Typography size="sm" color="text">No results found</Typography>
						)}
						{recentResults.length > 0 &&
							<>
								<Divider size="xs" label="Tìm kiếm gần đây" />
								{recentResults.map((item) =>
									<ListItems
										key={`${item.drug_code}-2`}
										item={item}
										onClick={() => {
											selectItem(item);
											setPopoverOpened(false);
											setResults([]);
											const updatedRecentResults = [item, ...recentResults.filter(i => i.drug_code !== item.drug_code)].slice(0,5);
											setRecentResults(updatedRecentResults);
										}}
									/>)}
							</>
						}
					</List>
				</Popover.Dropdown>
			</Popover>

		</div>
	);
};

export default ProductAutocomplete;