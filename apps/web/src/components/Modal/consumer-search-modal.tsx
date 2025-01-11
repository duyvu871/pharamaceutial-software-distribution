'use client'

import { Modal, TextInput, Radio, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import ProductForm from '@component/Form/product-form.tsx';
import ProductFormV2 from '@component/Form/product-form-v2.tsx';
import { useState } from 'react';
import ConsumerSearch from '@component/Search/consumer-search.tsx';

export function ConsumerSearchModal(
	{ children, setSelectedConsumer, label }:
		{ children?: React.ReactNode; setSelectedConsumer: (value: { name: string; id: string }) => void; label?: string }
) {
	const [opened, { open, close }] = useDisclosure(false);
	const [consumerSelected, setConsumerSelected] = useState<{ name: string; id: string }>({ name: '', id: '' });
	const setValue = (value: { name: string; id: string }) => {
		setConsumerSelected(value);
		setSelectedConsumer(value);
		close();
	}
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={'h6'} weight={'semibold'}>
						Tìm kiếm khách hàng
					</Typography>
				}
				size="70vw"
			>
				<ConsumerSearch setValue={setValue} />
			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children ? children : <TextInput
					// label={label || "Tìm kiếm khách hàng"}
					readOnly
					placeholder="Nhấn để chọn khách hàng"
					value={consumerSelected.name}
					className={'w-full'}
				/>}
			</div>
		</>
	)
}

