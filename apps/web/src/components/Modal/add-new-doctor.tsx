'use client'

import { Modal, TextInput, Radio, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import { useState } from 'react';
import ConsumerSearch from '@component/Search/consumer-search.tsx';
import DoctorCreationForm from '@component/Form/doctor-form.tsx';
import { DoctorCreationSchema, DoctorSchema } from '@schema/doctor-schema.ts';
import { upsertDoctor } from '@api/doctor.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import useToast from '@hook/client/use-toast-notification.ts';

export function AddNewDoctorModal(
	{ children, label, setSelectedValue, opened, close }:
		{
			children?: React.ReactNode;
			label?: string;
			setSelectedValue: (value: DoctorSchema) => void
			opened?: boolean;
			close?: () => void;
		}
) {
	const {branchId} = useDashboard();
	const {showErrorToast, showSuccessToast} = useToast();
	const [openedModal, { open, close: closeModal }] = useDisclosure(false);
	const [selected, setSelected] = useState<DoctorSchema | null>(null);

	const createDoctor = (data: DoctorCreationSchema) => {
		upsertDoctor(branchId, data)
			.then((doctor) => {
				showSuccessToast('Thêm bác sĩ thành công');
				setSelected(doctor);
				setSelectedValue(doctor);
				closeModal();
			})
			.catch((error) => {
				showErrorToast('Thêm bác sĩ thất bại');
			});
	}

	return (
		<>
			<Modal
				opened={opened === undefined ? openedModal : opened}
				onClose={close === undefined ? closeModal : close}
				title={
					<Typography size={'h6'} weight={'semibold'}>
						{label || "Thêm bác sĩ"}
					</Typography>
				}
				size="70vw"
			>
				<DoctorCreationForm submit={createDoctor} />
			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children ? children : <TextInput
					readOnly
					placeholder="Nhấn để tạo bác sĩ"
					value={selected?.ten_bac_si || ''}
					className={'w-full'}
				/>}
			</div>
		</>
	)
}

