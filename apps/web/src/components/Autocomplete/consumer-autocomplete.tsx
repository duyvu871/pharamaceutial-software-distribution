import React, { useEffect, useState } from 'react';
import { useSearch } from '@hook/common/use-search.ts';
import { getProviders } from '@api/provider.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import AutocompleteSearch from '@component/Autocomplete/base.tsx';
import { getConsumerList } from '@api/consumer.ts';

type ConsumerAutocompletePropTypes = {
	makeOptional?: boolean;
	setValue?: (value: { name: string; id: string }) => void;
};

type ProverState = {
	name: string;
	id: string;
}

function ConsumerAutocomplete({makeOptional, setValue}: ConsumerAutocompletePropTypes) {
	const [consumer, setConsumer] = useState<ProverState>({ name: '', id: '' });
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

	useEffect(() => {
		getConsumerList({
			search: '',
			branchId: branchId,
			page: 1,
			limit: 10,
			orderBy: 'createdAt:ASC',
		}).then((data) => {
			setProviderData(data.map((item) => ({
				name: item.consumer_name,
				id: item.id,
			})))
		})
	}, [branchId]);

	useEffect(() => {
		setValue && setValue(consumer);
	}, [consumer]);

	return (
		<AutocompleteSearch<ProverState>
			// label="Nhà cung cấp"
			placeholder="Nhập tên khách hàng"
			onSearch={async term => {
				const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
				console.log(searchTerm);
				return providerQuery(searchTerm);
			}}
			data={providerStore}
			getItemValue={item => item.name}
			onSelect={item => setConsumer(item)}
			renderItem={item => item.name}
			inputProps={{
				classNames: {
					label: 'text-sm font-medium text-gray-700',
					input: 'mt-1',
				},
			}}
		/>
	);
}

export default ConsumerAutocomplete;