'use client'

import { Modal, TextInput, Radio, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ConsumerCreationAttributes, ConsumerZodSchema } from '@schema/consumer-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export function AddCustomerModal(
	{ children, branchId, data }:
	{ children: React.ReactNode; branchId?: string; data?: ConsumerCreationAttributes; }
) {
	const [opened, { open, close }] = useDisclosure(false);
	const [loading, setLoading] = useState(false);

	// Khởi tạo useForm với Zod resolver
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<ConsumerCreationAttributes>({
		resolver: zodResolver(ConsumerZodSchema),
	});

	const onSubmit: SubmitHandler<ConsumerCreationAttributes> = (data) => {
		setLoading(true);
		console.log(data);
		setTimeout(() => {
			setLoading(false);
			close();
		}, 1000);
	};

	const updateConsumer = (data: ConsumerCreationAttributes) => {

	}

	const serRegionValue = (value: {tinh?: string; huyen?: string; xa?: string}) => {
		console.log('region', value);
	}

	useLayoutEffect(() => {
		if (data) {
			console.log('data', data);
			// setValue('consumer_name', data.consumer_name);
			Object.keys(data).forEach((key) => {
				const keyName = key as keyof ConsumerCreationAttributes;
				// console.log('keyName', keyName);
				setValue(keyName, data[keyName]);
			});
		}
	}, [data]);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={'h6'} weight={'semibold'}>Thêm khách hàng</Typography>
				}
				size="lg"
			>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<TextInput
							value={getValues('consumer_name')}
							label="Tên khách hàng"
							placeholder="Nhập tên khách hàng"
							required
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.consumer_name?.message}
							onChange={(event) => setValue('consumer_name', event.currentTarget.value)}
						/>

						<TextInput
							value={getValues('tax_code') || ''}
							label="Mã số thuế"
							placeholder="Nhập mã số thuế"
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.tax_code?.message}
							onChange={(event) => setValue('tax_code', event.currentTarget.value)}
						/>

						<TextInput
							value={getValues('phone_number')}
							label="Điện thoại"
							placeholder="Nhập số điện thoại"
							required
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.phone_number?.message}
							onChange={(event) => setValue('phone_number', event.currentTarget.value)}
						/>

						<div>
							<label className="text-sm font-medium text-gray-700 mb-1 block">
								Giới tính
							</label>
							<Radio.Group
								value={getValues('gender')}
								error={errors?.consumer_name?.message}
								onChange={(event) => {
									console.log('gener', event);
									setValue('consumer_name', event)
								}}
							>
								<div className="flex gap-4">
									<Radio value="male" label="Nam" />
									<Radio value="female" label="Nữ" />
								</div>
							</Radio.Group>
						</div>

						<DateInput
							// value={getValues('date_of_birth') || new Date()}
							label="Ngày sinh"
							placeholder="DD/MM/YYYY"
							valueFormat="DD/MM/YYYY"
							locale="vi"
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.date_of_birth?.message}
							onChange={(event) => {
								setValue('date_of_birth', event)
							}}
						/>

						<TextInput
							value={getValues('consumer_email') || ''}
							label="Email"
							placeholder="Nhập email"
							type="email"
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.consumer_email?.message}
							onChange={(event) => {
								setValue('consumer_email', event.currentTarget.value)
							}}
						/>

						<TextInput
							value={getValues('company_name') || ''}
							label="Công ty"
							placeholder="Nhập tên công ty"
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.company_name?.message}
							onChange={(event) => {
								setValue('company_name', event.currentTarget.value)
							}}
						/>

						<TextInput
							value={getValues('facebook') || ''}
							label="Facebook"
							placeholder="Nhập link Facebook"
							classNames={{
								label: 'text-sm font-medium text-gray-700',
								input: 'mt-1',
							}}
							error={errors?.facebook?.message}
							onChange={(event) => {
								setValue('facebook', event.currentTarget.value)
							}}
						/>
					</div>

					<Textarea
						value={getValues('address') || ''}
						label="Địa chỉ"
						placeholder="Nhập địa chỉ"
						classNames={{
							label: 'text-sm font-medium text-gray-700',
							input: 'mt-1',
						}}
						error={errors?.address?.message}
						onChange={(event) => {
							setValue('address', event.currentTarget.value)
						}}
					/>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<RegionAutocomplete setValue={serRegionValue}/>
					</div>

					<Textarea
						value={getValues('notes') || ''}
						label="Ghi chú"
						placeholder="Nhập ghi chú"
						classNames={{
							label: 'text-sm font-medium text-gray-700',
							input: 'mt-1',
						}}
						error={errors?.notes?.message}
						onChange={(event) => {
							setValue('notes', event.currentTarget.value)
						}}
					/>

					<div className="flex justify-end gap-2 pt-4">
						<button
							type="button"
							onClick={close}
							className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Bỏ qua
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600"
						>
							Lưu
						</button>
					</div>
				</form>
			</Modal>
			<div className={'cursor-pointer flex justify-center items-center'} onClick={open}>
				{children}
			</div>
		</>
	)
}

