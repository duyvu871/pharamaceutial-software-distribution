import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearch } from '@hook/common/use-search.ts';
import { SearchRegionResponseType } from '@schema/autocomplete.ts';
import { Provider } from '@schema/provider-schema.ts';
import { getProviders } from '@api/provider.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import AutocompleteSearch from '@component/Autocomplete/base.tsx';
import { Label } from '@component/label';
import { Typography } from '@component/Typography';

type ProviderAutocompletePropTypes = {
	makeOptional?: boolean;
	setValue?: (value: { name: string; id: string }) => void;
};

type ProverState = {
	name: string;
	id: string;
}

function ProviderAutocomplete({makeOptional, setValue}: ProviderAutocompletePropTypes) {
	const [provider, setProvider] = useState<ProverState>({ name: '', id: '' });
	const [providers, setProviders] = useState<Provider[]>([]);
	const {branchId} = useDashboard();
	const {
		query: providerQuery,
		setData: setProviderData,
		store: providerStore,
	} = useSearch<ProverState>({
		keys: ['name'],
		threshold: 0.35,
		useExtendedSearch: true,
		isCaseSensitive: true,
		minMatchCharLength: 0,
	});

	const findProvider = (id: string) => {
		return providers.find((item) => item.id === id);
	}

	useEffect(() => {
		getProviders({
			branchId: branchId,
			page: 1,
			perPage: 10,
			limit: 10,

		}).then((data) => {
			setProviderData(data.map((item) => ({
				name: item.companyName,
				id: item.id,
			})))
			setProviders(data);
		})
	}, [branchId]);

	useEffect(() => {
		setValue && setValue(provider);
	}, [provider, setValue]);

	return (
		<AutocompleteSearch<ProverState>
			// label="Nhà cung cấp"

			placeholder="Nhập tên nhà cung cấp"
			onSearch={async term => {
				const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
				console.log(searchTerm);
				return providerQuery(searchTerm);
			}}
			data={providerStore}
			getItemValue={item => item.name}
			onSelect={item => setProvider(item)}
			renderItem={item => {
				const provider = findProvider(item.id);
				if (!provider) {
					return item.name;
				}
				return (
					<div className={"px-3 py-2"}>
						<Typography weight={"semibold"}>{provider.companyName}</Typography>
						<Label label={"SĐT:"} className="text-sm text-gray-500">{provider.phoneNumber}</Label>
						<Label label={"Mã số thuế:"} className="text-sm text-gray-500">{provider.taxCode}</Label>
						<Label label={"Email:"} className="text-sm text-gray-500">{provider.email}</Label>
					</div>
				)
			}}
			inputProps={{
				classNames: {
					label: 'text-sm font-medium text-gray-700',
					input: 'mt-1',
				},
			}}
		/>
	);
}

export default ProviderAutocomplete;