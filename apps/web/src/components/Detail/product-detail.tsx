'use client'

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	TextInput,
	NumberInput,
	Grid,
	Button,
	Group,
	Box,
	Stack,
	Textarea,
	Select,
	CloseButton
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { creationProductSchema, CreationProductSchema, Product } from '@schema/product-schema.ts';
import { MoneyInput } from '@component/money-input.tsx';
import { Label } from '@component/label';

export default function MedicineForm({detail, type, onSubmit}: {detail: Product; type: string; onSubmit?: (data: CreationProductSchema) => void}) {
	const { control, handleSubmit } = useForm<CreationProductSchema>({
		resolver: zodResolver(creationProductSchema),
		defaultValues: {
			barcode: detail.barcode || '',
			register_no: detail.register_no || '',
			product_name: detail.product_name || '',
			original_price: detail.original_price || 0,
			sell_price: detail.sell_price || 0,
			weight: detail.weight || 0,
			base_unit: detail.base_unit || '',
			status: detail.status || 1,
			import_date: new Date(detail.import_date) || new Date(),
			expire_date: new Date(detail.expire_date) || new Date(),
			description: detail.description || '',
			usage: detail.usage || '',
			ingredient: detail.ingredients || '',
			packing: detail.packing || '',
			active_ingredient: detail.active_ingredient || '',
			content: detail.content || '',
			note: detail.note || '',
			manufacturer: detail.manufacturer || '',
			made_in: detail.made_in || '',
		}
	});

	const submit = (data: CreationProductSchema) => {
		console.log(data);
		onSubmit && onSubmit({
			...data,
			id: detail.id,
		});
	};

	const isNotThuoc = type !== 'thuoc';

	return (
		<Box my={10}>
			<form onSubmit={handleSubmit(submit)}>
				<Stack >
					<Grid>
						{/* Basic Information */}
						<Grid.Col span={3}>
							<Controller
								name="product_name"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<TextInput
										label="Tên thuốc *"
										placeholder="Nhập tên thuốc"
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="barcode"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<TextInput
										label="Mã vạch"
										placeholder="Nhập mã vạch"
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						{/* Pricing and Stock */}
						<Grid.Col span={3}>
							<Controller
								name="original_price"
								control={control}
								render={({ field, fieldState: { error } }) => (
									// <NumberInput
									// 	label="Giá nhập *"
									// 	placeholder="0.00"
									// 	min={0}
									// 	error={error?.message}
									// 	{...field}
									// />
									<Label label={"Giá nhập *"} position={"top"}>
										<MoneyInput
											className="font-medium"
											{...field}
										/>
									</Label>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="sell_price"
								control={control}
								render={({ field, fieldState: { error } }) => (
									// <NumberInput
									// 	label="Giá bán *"
									// 	placeholder="0.00"
									// 	min={0}
									// 	error={error?.message}
									// 	{...field}
									// />
									<Label label={"Giá bán *"} position={"top"}>
										<MoneyInput
											className="font-medium"
											{...field}
										/>
									</Label>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="base_unit"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<TextInput
										label="Đơn vị cơ bản *"
										placeholder="Nhập đơn vị"
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>


						<Grid.Col span={3}>
							<Controller
								name="weight"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<NumberInput
										label="Trọng lượng"
										placeholder="0.00"

										min={0}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="status"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Select
										label="Trạng thái"
										placeholder="Chọn trạng thái"
										data={[
											{ value: '1', label: 'Kinh Doanh' },
											{ value: '0', label: 'Ngừng kinh Doanh' }
										]}
										error={error?.message}
										{...field}
										value={String(field.value)}
										onChange={(value) => field.onChange(parseInt(value || '1', 10))}
									/>
								)}
							/>
						</Grid.Col>

						{/* Dates */}
						<Grid.Col span={3}>
							<Controller
								name="import_date"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DatePickerInput
										label="Ngày nhập"
										placeholder="DD/MM/YYYY"
										locale="vi"
										rightSection={<IconCalendar size={16} color="#666" />}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="expire_date"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DatePickerInput
										label="Ngày hết hạn"
										placeholder="DD/MM/YYYY"
										locale="vi"
										rightSection={<IconCalendar size={16} color="#666" />}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						{/* Additional Information */}
						<Grid.Col span={3}>
							<Controller
								name="manufacturer"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<TextInput
										label="Nhà sản xuất"
										placeholder="Nhập tên nhà sản xuất"
										hidden={isNotThuoc}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="made_in"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<TextInput
										label="Nước sản xuất"
										placeholder="Nhập nước sản xuất"
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						{/* Details */}
						<Grid.Col span={3}>
							<Controller
								name="active_ingredient"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Textarea
										label="Hoạt chất"
										placeholder="Nhập hoạt chất"
										disabled={isNotThuoc}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="ingredient"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Textarea
										label="Thành phần"
										placeholder="Nhập thành phần"
										disabled={isNotThuoc}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="usage"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Textarea
										label="Cách dùng"
										placeholder="Nhập cách dùng"
										disabled={isNotThuoc}
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="description"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Textarea
										label="Mô tả"
										placeholder="Nhập mô tả"
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={3}>
							<Controller
								name="note"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<Textarea
										label="Ghi chú"
										placeholder="Nhập ghi chú"
										error={error?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
					</Grid>

					<Group gap="sm" mt="xl">
						<Button
							type="submit"
							color="var(--main-color)"
							w={80}
							radius={"md"}
						>
							Lưu
						</Button>
						<Button
							variant="default"
							radius={"md"}
							color="var(--main-color)"
						>
							Hủy
						</Button>
					</Group>
				</Stack>
			</form>
		</Box>
	);
}

