import React, { useEffect, useState } from 'react';
import { useSearch } from '@hook/common/use-search.ts';
import { getProviders } from '@api/provider.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import AutocompleteSearch from '@component/Autocomplete/base.tsx';
import { getConsumerList } from '@api/consumer.ts';
import { getDoctors } from '@api/doctor.ts';
import { AddNewDoctorModal } from '@component/Modal/add-new-doctor.tsx';
import { DoctorSchema } from '@schema/doctor-schema.ts';
import { ActionIcon, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Typography } from '@component/Typography';
import { Plus } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

type DoctorAutocompletePropTypes = {
	makeOptional?: boolean;
	setValue?: (value: DoctorSchema) => void;
	clearField?: boolean;
	defaultValue?: string,
	value?: string;
};

type ProverState = {
	name: string;
	id: string;
}

function DoctorAutocomplete({makeOptional, setValue, clearField, defaultValue, value}:DoctorAutocompletePropTypes) {
	const {branchId} = useDashboard();

	const [doctor, setDoctor] = useState<ProverState | null>(null);
	const [doctorDetail, setDoctorDetail] = useState<DoctorSchema | null>(null);
	const [doctorList, setDoctorList] = useState<DoctorSchema[]>([]);
	const [openedModal, { open, close: closeModal }] = useDisclosure(false);

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
		getDoctors({
			search: '',
			branchId: branchId,
			page: 1,
			limit: 1000,
			orderBy: 'doctor_id:DESC',
		})
			.then((data) => {
				setDoctorList(data.data);
				setProviderData(data.data.map((item) => ({
					name: item.ten_bac_si,
					id: item.id,
				})))
			})
			.catch((error) => {
				console.error(error);
			});
	}, [branchId]);

	useEffect(() => {
		if (doctor) {
			const doctorDetail = doctorList.find((item) => item.id === doctor.id);
			doctorDetail && setDoctorDetail(doctorDetail);
		}
	}, [doctor]);

	useEffect(() => {
		if (doctorDetail) setValue && setValue(doctorDetail);
	}, [doctorDetail]);

	return (
		<>
			<div className={"hidden"}>
				<AddNewDoctorModal
					setSelectedValue={setDoctorDetail}
					opened={openedModal}
					close={closeModal}
				/>
			</div>
			<AutocompleteSearch<DoctorSchema>
				// label="Nhà cung cấp"
				placeholder="Nhập tên bác sĩ"
				onSearch={async term => {
					const searchTerm = `'${term.trim().split(' ').join(' \'')}`;
					console.log(searchTerm);
					const query = providerQuery(searchTerm);
					return query;
				}}
				data={providerStore}
				getItemValue={item => item.name}
				onSelect={item => setDoctor(item)}
				renderItem={item => (
					<div className={"py-2 px-2 border-b w-full"}>
						<Typography weight={"semibold"}>
							{item.name}
						</Typography>
					</div>
				)}
				inputProps={{
					required: true,
					label: 'Bác sĩ kê đơn',
					rightSection: <ActionIcon color={"var(--main-color)"}><IconSearch size={16} /></ActionIcon>,
					// ...(defaultValue && { defaultValue: defaultValue}),
					// ...(value && { value: value}),
				}}
				createNewItemComponent={
					<Button
						color={"var(--main-color)"}
						className="text-sm text-blue-600 w-full"
						onClick={open}
						w={"100%"}
						m={5}
					>
						<Plus className={"w-5 h- mr-2"} /> Thêm bác sĩ mới
					</Button>
				}
				popoverClassNames={{
					dropdown: "!max-w-[300px] min-w-[300px]",
				}}
				defaultValue={defaultValue}
			/>
		</>
	);
}

export default DoctorAutocomplete;