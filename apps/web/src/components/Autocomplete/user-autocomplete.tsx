import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearch } from '@hook/common/use-search.ts';
import { SearchRegionResponseType } from '@schema/autocomplete.ts';
import { Provider } from '@schema/provider-schema.ts';
import { getProviders } from '@api/provider.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import AutocompleteSearch from '@component/Autocomplete/base.tsx';
import { Label } from '@component/label';
import { Typography } from '@component/Typography';
import { getUserSlaveList } from '@api/admin/admin-curd.ts';
import { UserSchema } from '@schema/user-schema.ts';
import { useFilterString } from '@hook/client/use-filter-string.ts';
import { MantineSize } from '@mantine/core';

type AutocompletePropTypes = {
	makeOptional?: boolean;
	required?: boolean;
	setValue?: (value: { name: string; id: string }) => void;
	size?: MantineSize
};

type ProverState = {
	name: string;
	id: string;
}

type Schema = UserSchema;

function UserAutocomplete(
	{
		required = false,
		makeOptional,
		setValue,
		size
	}: AutocompletePropTypes) {
	const search = useFilterString<Schema>("");
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(20);
	const [user, setUser] = useState<ProverState>({ name: '', id: '' });
	const [searchResult, setSearchResult] = useState<UserSchema[]>([]);

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

	const findSearchResult = (id: string) => {
		return searchResult.find((item) => item.id === id);
	}

	const prevRef = useRef<ProverState | null>(null);

	const update = ({ page, limit, search }: {
		page: number;
		limit: number;
		search: string;
	}) => {
		getUserSlaveList({
			page: page,
			limit: limit,
			search: search
		})
			.then((data) => {
				setProviderData(data.data.map((item) => ({
					name: item.username,
					id: item.id,
				})))
				setSearchResult(data.data);
			})
			.catch((error) => {
				// console.error(error);
				return [];
			})
	}

	useEffect(() => {
		update({ page: 1, limit: 20, search: '' })
	}, []);

	useEffect(() => {
		// setValue && setValue(provider);
		if (prevRef.current?.id !== user.id && user.id) {
			setValue && setValue(user);
			prevRef.current = user;
		}
	}, [user, setValue]);

	useEffect(() => {
		if (search.filter) {
			update({ page, limit, search: search.filter });
		}
	}, [page, limit, search.filter]);

	return (
		<AutocompleteSearch<ProverState>
			onFocus={() => {
				// update({ page: 1, limit: 20, search: '' })
				search.editMultipleFilter({
					username: '',
					first_name: '',
					last_name: '',
				})
			}}
			placeholder="Nhập tên đại lý"
			onSearch={async term => {
				const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
				// updateProvider({ brachId: branchId, page: 1, perPage: 10, limit: 10, search: term });
				// console.log(searchTerm);
				return providerQuery(searchTerm);
			}}
			data={providerStore}
			getItemValue={item => {
				// console.log(item);
				return item.name;
			}}
			onSelect={item => setUser(item)}
			renderItem={item => {
				const provider = findSearchResult(item.id);
				if (!provider) {
					return item.name;
				}
				return (
					<div className={"px-3 py-2"}>
						<Typography weight={"semibold"}>{provider.username}</Typography>
						<Label label={"SĐT:"} className="text-sm text-gray-500">{provider.phone_number}</Label>
						{/*<Label label={"Mã số thuế:"} className="text-sm text-gray-500">{provider.email}</Label>*/}
						<Label label={"Email:"} className="text-sm text-gray-500">{provider.email}</Label>
					</div>
				)
			}}
			inputProps={{
				classNames: {
					label: 'text-sm font-medium text-gray-700',
					input: 'mt-1',
				},
				size: size,
				required: required,
			}}
		/>
	);
}

export default UserAutocomplete;