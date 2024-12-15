'use client'

import { Modal, TextInput, Radio, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import ProductForm from '@component/Form/product-form.tsx';

export function ProductModal(
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
						Thêm sản phẩm
					</Typography>
				}
				size="lg"
			>
				<ProductForm />
			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children}
			</div>
		</>
	)
}

