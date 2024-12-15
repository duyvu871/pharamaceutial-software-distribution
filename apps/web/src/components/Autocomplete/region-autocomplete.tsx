import { TextInput } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutocompleteSearch from '@component/Autocomplete/base.tsx';
import { SearchRegionResponseType } from '@schema/autocomplete.ts';
import { autoCompleteSearchRegion } from '@api/autocomplete.ts';
import { useSearch } from '@hook/common/use-search.ts';

type RegionAutocompleteProps = {
	makeOptional?: boolean | { tinh?: boolean, huyen?: boolean, xa?: boolean };
	setValue?: (value: { tinh: string, huyen: string, xa: string }) => void;
};

type RegionState = {
	value: string;
	ref?: string;
	id: string;
}

const searchConfig = {
	keys: ['value'],
	threshold: 0.35,
	useExtendedSearch: true,
	isCaseSensitive: true,
	minMatchCharLength: 0,
}

function RegionAutocomplete({ makeOptional, setValue}: RegionAutocompleteProps) {
	const [tinh, setTinh] = useState<RegionState>({ value: '', ref: '', id: '', });
	const [huyen, setHuyen] = useState<RegionState>({ value: '', ref: '', id: '', });
	const [xa, setXa] = useState<RegionState>({ value: '', id: '', });
	// const [huyenOptions, setHuyenOptions] = useState([]);
	// const [xaOptions, setXaOptions] = useState([]);
	const {
		query: tinhQuery,
		setData: setTinhData,
		store: tinhStore,
	} = useSearch<SearchRegionResponseType['result'][number]>({
		keys: ['value'],
		threshold: 0.35,
		useExtendedSearch: true,
		isCaseSensitive: true,
		minMatchCharLength: 0,
	});

	const {
		query: huyenQuery,
		setData: setHuyenData,
		store: huyenStore,
	} = useSearch<SearchRegionResponseType['result'][number]>({
		keys: ['value'],
		threshold: 0.35,
		useExtendedSearch: true,
		isCaseSensitive: true,
		minMatchCharLength: 0,
	});

	const {
		query: xaQuery,
		setData: setXaData,
		store: xaStore,
	} = useSearch<SearchRegionResponseType['result'][number]>({
		keys: ['value'],
		threshold: 0.35,
		useExtendedSearch: true,
		isCaseSensitive: true,
		minMatchCharLength: 0,
	});

	useEffect(() => {
		// if (tinh) {
			autoCompleteSearchRegion('tinh').then((response) => {
					setTinhData(response?.result || []);
			});
		// }
	}, []);

	useEffect(() => {
		if (tinh.id) {
			autoCompleteSearchRegion('huyen', tinh.id).then((response) => {
				setHuyenData(response?.result || []);
			});
		}
	}, [tinh]);

	useEffect(() => {
		if (huyen.id) {
			autoCompleteSearchRegion('xa', huyen.id).then((response) => {
				setXaData(response?.result || []);
			});
		}
	}, [huyen]);

	useEffect(() => {
		setValue && setValue({
			tinh: tinh.value,
			huyen: huyen.value,
			xa: xa.value,
		});
	}, [tinh, huyen, xa]);

	return (
		<>
			<AutocompleteSearch<SearchRegionResponseType['result'][number]>
				label="Tỉnh/Thành phố"
				placeholder="Chọn Tỉnh/Thành phố"
				onSearch={async term => {
					const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
					console.log(searchTerm);
					return tinhQuery(searchTerm);
				}}
				data={tinhStore}
				getItemValue={item => item.value}
				onSelect={item => setTinh(item)}
				renderItem={item => item.value}
				inputProps={{
					classNames: {
						label: 'text-sm font-medium text-gray-700',
						input: 'mt-1',
					}
				}}
			/>
			<AutocompleteSearch<SearchRegionResponseType['result'][number]>
				label="Quận/Huyện"
				placeholder="Chọn Quận/Huyện"
				onSearch={async term => {
					const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
					console.log(searchTerm);
					return huyenQuery(searchTerm);
				}}
				data={huyenStore}
				getItemValue={item => item.value}
				onSelect={item => setHuyen(item)}
				renderItem={item => item.value}
				inputProps={{
					classNames: {
						label: 'text-sm font-medium text-gray-700',
						input: 'mt-1',
					}
				}}
			/>
			<AutocompleteSearch<SearchRegionResponseType['result'][number]>
				label="Phường/Xã"
				placeholder="Chọn Phường/Xã"
				onSearch={async term => {
					const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
					console.log(searchTerm);
					return xaQuery(searchTerm);
				}}
				data={xaStore}
				getItemValue={item => item.value}
				onSelect={item => setXa(item)}
				renderItem={item => item.value}
				inputProps={{
					classNames: {
						label: 'text-sm font-medium text-gray-700',
						input: 'mt-1',
					}
				}}
			/>
		</>
	);
}

export default RegionAutocomplete;