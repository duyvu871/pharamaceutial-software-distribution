'use client'

import { Modal, TextInput, Radio, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import ProductForm from '@component/Form/product-form.tsx';
import ProductFormV2 from '@component/Form/product-form-v2.tsx';

export function TableDetailModal(
	{ children, title, detail}:
		{ children: React.ReactNode; title: React.ReactNode, detail: React.ReactNode }
) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={title}
				size="xl"
			>
				{detail}
			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children}
			</div>
		</>
	)
}

