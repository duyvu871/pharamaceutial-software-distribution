'use client'

import { Modal, TextInput, Radio, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import ProductForm from '@component/Form/product-form.tsx';
import ProductFormV2 from '@component/Form/product-form-v2.tsx';
import PrescriptionForm from '@component/Form/prescript-form.tsx';
import { ProviderForm } from '@component/Form/provider-form.tsx';
import { Provider } from '@schema/provider-schema.ts';

export function ProviderModal(
	{ children, branchId, data }:
		{ children: React.ReactNode; branchId?: string; data?: Provider; }
) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={'h6'} weight={'semibold'}>
						Thêm nhà phân phối - nhà cung cấp - nhà sản xuất - Đối tác
					</Typography>
				}
				size="xl"
			>
				<ProviderForm data={data} />
			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children}
			</div>
		</>
	)
}

