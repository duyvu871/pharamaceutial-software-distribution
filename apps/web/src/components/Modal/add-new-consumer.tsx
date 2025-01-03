'use client'

import { Modal, TextInput, Radio, Textarea, LoadingOverlay } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks';
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ConsumerCreationAttributes, ConsumerZodSchema } from '@schema/consumer-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { type } from 'os';
import useToast from '@hook/client/use-toast-notification.ts';

export function AddCustomerModal(
	{ children, branchId, data }:
		{ children: React.ReactNode; branchId?: string; data?: ConsumerCreationAttributes; }
) {
	const [opened, { open, close }] = useDisclosure(false);
	const [visible, { toggle, open: openOverlay, close: closeOverlay }] = useDisclosure(false)
	const [loading, setLoading] = useState(false);

	const {showErrorToast, showSuccessToast} = useToast();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
		setValue,
	} = useForm<ConsumerCreationAttributes>({
		resolver: zodResolver(ConsumerZodSchema),
		defaultValues: {
			consumer_name: '',
			tax_code: '',
			phone_number: '',
		}
	});

	const clearForm = () => {
		reset();
	}

	const onSubmit: SubmitHandler<ConsumerCreationAttributes> = (data) => {
		setLoading(true);
		openOverlay();
		console.log(data);
		setTimeout(() => {
			setLoading(false);
			showSuccessToast('Thêm khách hàng thành công');

			setTimeout(() => {
				clearForm();
				closeOverlay();
				close();
			}, 1000)
		}, 2000);
	};


	const serRegionValue = (value: {tinh?: string; huyen?: string; xa?: string}) => {
		console.log('region', value);
		setValue('province_city', value.tinh || '');
		setValue('district', value.huyen || '');
		setValue('ward', value.xa || '');
	}

	useLayoutEffect(() => {
		if (data) {
			console.log('data', data);
			// setValue('consumer_name', data.consumer_name);
			Object.keys(data).forEach((key) => {
				const keyName = key as keyof ConsumerCreationAttributes;
				// console.log('keyName', keyName);
				setValue(keyName, data[keyName] ? data[keyName] : '');
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
				size="xl"
				pos={"relative"}
			>
				<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
				<form className="space-y-4 relative" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Controller
							name="consumer_name"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Tên khách hàng"
									placeholder="Nhập tên khách hàng"
									required
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.consumer_name?.message}
									{...field}
								/>
							)}
						/>
						<Controller
							name="tax_code"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Mã số thuế"
									placeholder="Nhập mã số thuế"
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.tax_code?.message}
									{...field}
								/>
							)}
						/>


						<Controller
							name="phone_number"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Điện thoại"
									placeholder="Nhập số điện thoại"
									required
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.phone_number?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<div>
									<label className="text-sm font-medium text-gray-700 mb-1 block">
										Giới tính
									</label>
									<Radio.Group
										error={errors?.gender?.message}
										{...field}
									>
										<div className="flex gap-4">
											<Radio value="male" label="Nam" />
											<Radio value="female" label="Nữ" />
											<Radio value="other" label="Khác" />
										</div>
									</Radio.Group>
								</div>
							)}
						/>
						<Controller
							name="date_of_birth"
							control={control}
							render={({ field }) => (
								<DateInput
									label="Ngày sinh"
									placeholder="DD/MM/YYYY"
									valueFormat="DD/MM/YYYY"
									locale="vi"
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.date_of_birth?.message}
									{...field}
									onChange={(value) =>
										setValue('date_of_birth', value ? value.toString() : '')
									}
									value={field.value ? new Date(field.value) : null}
								/>
							)}
						/>

						<Controller
							name="consumer_email"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Email"
									placeholder="Nhập email"
									type="email"
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.consumer_email?.message}
									{...field}
								/>
							)}
						/>


						<Controller
							name="company_name"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Công ty"
									placeholder="Nhập tên công ty"
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.company_name?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							name="facebook"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Facebook"
									placeholder="Nhập link Facebook"
									classNames={{
										label: 'text-sm font-medium text-gray-700',
										input: 'mt-1',
									}}
									error={errors?.facebook?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<Controller
						name="address"
						control={control}
						render={({ field }) => (
							<Textarea
								label="Địa chỉ"
								placeholder="Nhập địa chỉ"
								classNames={{
									label: 'text-sm font-medium text-gray-700',
									input: 'mt-1',
								}}
								error={errors?.address?.message}
								{...field}
							/>
						)}
					/>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<RegionAutocomplete setValue={serRegionValue}/>
					</div>

					<Controller
						name="notes"
						control={control}
						render={({ field }) => (
							<Textarea
								label="Ghi chú"
								placeholder="Nhập ghi chú"
								classNames={{
									label: 'text-sm font-medium text-gray-700',
									input: 'mt-1',
								}}
								error={errors?.notes?.message}
								{...field}
							/>
						)}
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