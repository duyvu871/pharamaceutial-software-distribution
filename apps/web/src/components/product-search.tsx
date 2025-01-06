import { useState, useEffect, ChangeEventHandler, ChangeEvent, memo, forwardRef } from 'react';
import { Autocomplete, Box, Divider, InputProps, List, Loader, Popover, Stack, TextInput } from '@mantine/core';
import { useDebounce } from "@uidotdev/usehooks";
import { autocomplete, autoCompleteSearchStoreProduct } from '@api/autocomplete.ts';
// import { SearchProductType } from '@schema/autocomplete.ts';
// import { useDisclosure } from '@mantine/hooks';
// import Image from 'next/image';
import { Typography } from '@component/Typography';
import { useUID } from '@hook/common/useUID';
import { parseJson } from '@util/parse-json.ts';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Product } from '@schema/product-schema.ts';
import { Label } from '@component/label';
import { ImageWithFallback } from '@component/Image/image-with-fallback.tsx';
import dayjs from 'dayjs';
import { TextInputProps } from '@mantine/core';

export type ProductAutocompleteProps = TextInputProps & {
	onSelectProduct?: (product: Product) => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ListItems =({item, onClick}: {item: Product, onClick: () => void}) => {
	return (
		<List.Item
			key={item.barcode}
			onClick={onClick} // Close on select
			w={'100%'}
			className={'rounded-md cursor-pointer hover:bg-teal-600/20 transition-colors'}
		>
			<Box className={'p-2 relative flex justify-start items-start gap-5'}>
				<div className={"w-[50px] h-[50px] flex-shrink-0"}>
					<ImageWithFallback
						unoptimized
						alt={item.product_name}
						src={item.default_image || '/images/placeholder.png'}
						width={100} height={100}
						className={'w-[50px] object-cover'}
					/>
				</div>
				<Stack gap={2}>
					<Typography size={"content"} weight={'semibold'}>{item.product_name}</Typography>
					<Label classNames={{label: ""}} label={"HSD:"}>
						<Typography size={'content'} weight={"normal"}>{item.created_at ? dayjs(item.created_at).format("DD/MM/YYYY") : ""}</Typography>
					</Label>
					<Label label={"Số lô:"}>
						<Typography size={'content'} weight={"normal"}>{item.product_no}</Typography>
					</Label>
					<Label label={"Số lượng:"}>
						<Typography size={'content'} weight={"normal"}>{item.quantity_of_stock}</Typography>
					</Label>
				</Stack>
			</Box>
		</List.Item>
	)
}

const ProductAutocomplete = forwardRef<HTMLInputElement, ProductAutocompleteProps>(({onSelectProduct, onChange, onBlur, onFocus, ...inputProps}, ref) => {
	const {branchId} = useDashboard();

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selected, setSelected] = useState<string>("");
	const [results, setResults] =useState<Product[]>([]);
	const [recentResults, setRecentResults] = useState<Product[]>([]);

	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [shouldSearch, setShouldSearch] = useState<boolean>(true);
	const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

	// const [dropdownOpened, { toggle, open, close }] = useDisclosure();
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	// const {generateUID} = useUID();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setShouldSearch(true);
		onChange && onChange(e);
	};

	const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
		// console.log('blur');
		// setPopoverOpened(false)
		setTimeout(() => setPopoverOpened(false), 200)
		onBlur && onBlur(e);
	}

	const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
		// console.log('focus');
		setPopoverOpened(true)
		onFocus && onFocus(e);
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
				const data = await autoCompleteSearchStoreProduct({
					query: debouncedSearchTerm,
					branchId: branchId,
				});
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
			setRecentResults(parseJson<Product[]>(recentSearches) || []);
		}
		console.log('rerender');
	}, []);

	return (
		// <div className="w-96 relative"> {/* relative for Popover positioning */}
			<Popover
				opened={popoverOpened}
				onClose={() => setPopoverOpened(false)}
				position="bottom"
				withArrow
				shadow="md"
				closeOnClickOutside={true}
				// clickOutsideEvents={['mouseup', 'touchend']}
			>
				<Popover.Target>
					<TextInput
						// value={searchTerm}
						onChange={handleChange}
						placeholder="Tìm sản phẩm"
						onFocus={handleFocus} // Open on focus
						onBlur={handleBlur} // Close on blur with delay
						rightSection={isSearching && <Loader size="xs" />}
						{...inputProps}
						ref={ref}
					/>
				</Popover.Target>
				<Popover.Dropdown className={'!z-[150] !w-full max-w-md overflow-y-auto sm:max-h-[600px]'}>
					<List className={'w-full max-w-md'}>
						{results.slice(0, 5).map(item => (
							<ListItems
								key={item.id}
								item={item}
								onClick={() => {
									onSelectProduct && onSelectProduct(item);
									setShouldSearch(false);
									setPopoverOpened(false);
									setResults([]);
									const updatedRecentResults = [
										item,
										...recentResults.filter(i =>
											i.product_no !== item.product_no
										)
									].slice(0,5);
									setRecentResults(updatedRecentResults);
								}}
							/>
						))}
						{!isSearching && results.length === 0 && searchTerm && (
							<Typography size="sm" color="text">No results found</Typography>
						)}
						{recentResults.length > 0 &&
							<>
								<Divider size="xs" label="Tìm kiếm gần đây" />
								{recentResults.map((item) =>
									<ListItems
										key={`${item.product_no}-2`}
										item={item}
										onClick={() => {
											onSelectProduct && onSelectProduct(item);
											setShouldSearch(false);
											setPopoverOpened(false);
											setResults([]);
											const updatedRecentResults = [
												item,
												...recentResults.filter(i =>
													i.product_no !== item.product_no
												)
											].slice(0,5);
											setRecentResults(updatedRecentResults);
										}}
									/>)}
							</>
						}
					</List>
				</Popover.Dropdown>
			</Popover>

		// </div>
	);
});
ProductAutocomplete.displayName = "ProductAutocomplete";

export default ProductAutocomplete;