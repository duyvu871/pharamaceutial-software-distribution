'use client'

import { Modal, TextInput, Radio, Textarea, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import ProductForm from '@component/Form/product-form.tsx';
import ProductFormV2 from '@component/Form/product-form-v2.tsx';
import PrescriptionForm from '@component/Form/prescript-form.tsx';

export function PrescriptModal(
	{ children, branchId, data }:
		{ children: React.ReactNode; branchId?: string; data?: any; }
) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={'h6'} weight={'semibold'}>
						Bán thuốc theo đơn
					</Typography>
				}
				size="xl"
			>
				<PrescriptionForm onSubmit={(data) => {
					console.log(data)
				}}/>

			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children}
			</div>
		</>
	)
}

