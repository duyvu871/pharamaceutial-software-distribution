'use client'

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	TextInput,
	NumberInput,
	Select,
	Textarea,
	Button,
	Group,
	Stack,
	Box,
	CloseButton,
    Radio
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import {
	CreationFinancialLedger,
	CreationFinancialLedgerSchema,
	FinancialLedgerSchema,
} from '@schema/financial-schema';
import { useEffect, useState } from 'react';
import { financialLedgerLabels } from '@type/enum/financal.ts';

type FinancialReceiptFormProps = {
	detail?: FinancialLedgerSchema;
	onSubmit?: (data: CreationFinancialLedger) => void;
}


export default function FinancialReceiptForm({detail, onSubmit}: FinancialReceiptFormProps) {
	const { control, handleSubmit, setValue, getValues, watch } = useForm<CreationFinancialLedger>({
		resolver: zodResolver(CreationFinancialLedgerSchema),
		defaultValues: {
			phuong_thuc_thanh_toan: 0,
			gia_tri: 0,
			ghi_chu: null,
			ngay_thu_chi: new Date(),
			loai: 0
		}
	});

	const form = watch();

	const [type, setType] = useState<string>("Thu");

	const submit = (data: CreationFinancialLedger) => {
		console.log(data);
		onSubmit && onSubmit(data);
	};

	useEffect(() => {
		console.log("finan detail", detail);
		if (detail) {
			const { ngay_thu_chi, loai_thu_chi, ten_nguoi_nop_nhan, gia_tri, phuong_thuc_thanh_toan, ghi_chu,  } = detail;
			setValue('ngay_thu_chi', new Date(ngay_thu_chi));
			setValue('loai_thu_chi', loai_thu_chi);
			setValue('loai', loai_thu_chi);
			setValue('ten_nguoi_nop_nhan', ten_nguoi_nop_nhan);
			setValue('gia_tri', gia_tri);
			setValue('phuong_thuc_thanh_toan', phuong_thuc_thanh_toan);
			setValue('ghi_chu', ghi_chu);
		}
	}, [detail]);

	useEffect(() => {
		setType(financialLedgerLabels[getValues('loai') as keyof typeof financialLedgerLabels] || "Thu");
	}, [form])

	return (
		<Box >
			<Group  mb="md">
				<h2 style={{ margin: 0 }}>Tạo phiếu thu</h2>
				<CloseButton size="lg" />
			</Group>

			<form onSubmit={handleSubmit(submit)}>
				<Stack gap="md">


					<Controller
						name="ngay_thu_chi"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<DatePickerInput
								label="Ngày tạo *"
								placeholder="DD/MM/YYYY"
								locale="vi"
								rightSection={<IconCalendar size={16} color="#666" />}
								error={error?.message}
								{...field}
								value={new Date(field.value || new Date().toLocaleDateString())}
								onChange={(value) => field.onChange(value)}
							/>
						)}
					/>

					<Controller
						name="loai_thu_chi"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<Select
								label={`Loại ${type}*`}
								placeholder={`Chọn loại ${type}`}
								data={[
									{ value: '0', label: `${type} tiền trả khách` },
									{ value: '1', label: `${type} tiền trả nhà cung cấp` },
									{ value: '2', label: `${type} tiền nhân viên nộp` },
									{ value: '3', label: 'Khác' },
								]}
								error={error?.message}
								{...field}
								value={String(field.value)}
								onChange={(value) => field.onChange(parseInt(value || '0', 10))}
							/>
						)}
					/>

					{/*trả khách*/}
					{/*trả nhà cung cấp*/}
					{/*thu tiền nhân viên nộp*/}
					{/*khác*/}

					<Controller
						name="loai"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<Radio.Group
								{...field}
								label="Loại *"
								value={String(field.value)}
								// onChange={(value) => field.onChange(parseInt(value, 10))}
								onChange={(e) => {
									const value = parseInt(e, 10)
									setValue('loai', value)
								}}>
								<Group>
									<Radio color={"var(--main-color)"} value="0" label="Thu" />
									<Radio color={"var(--main-color)"} value="1" label="Chi" />
								</Group>
							</Radio.Group>
						)}
					/>

					<Controller
						name="ten_nguoi_nop_nhan"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<TextInput
								label="Tên người nộp *"
								placeholder="Nhập tên người nộp"
								error={error?.message}
								{...field}
							/>
						)}
					/>

					<Group grow>
						<Controller
							name="gia_tri"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<NumberInput
									label="Giá trị *"
									placeholder="0.00"
									step={0.1}
									allowDecimal
									allowNegative={false}
									min={0}
									error={error?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							name="phuong_thuc_thanh_toan"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<Select
									label="Phương thức thanh toán"
									placeholder="Chọn phương thức"
									data={[
										{ value: '0', label: 'Tiền mặt' },
										{ value: '1', label: 'Chuyển khoản' }
									]}
									defaultValue="0"
									error={error?.message}
									{...field}
									value={String(field.value)}
									onChange={(value) => field.onChange(parseInt(value || '0', 10))}
								/>
							)}
						/>
					</Group>

					<Controller
						name="ghi_chu"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<Textarea
								label="Ghi chú"
								placeholder="Nhập ghi chú"
								minRows={3}
								error={error?.message}
								{...field}
								value={field.value || ''}
								onChange={(event) => field.onChange(event.target.value)}
							/>
						)}
					/>

					<Group gap={10}>
						<Button
							type="submit"
							color="var(--main-color)"
						>
							LƯU (F9)
						</Button>
						<Button
							variant="default"
						>
							LƯU & IN (CTRL+F9)
						</Button>
					</Group>
				</Stack>
			</form>
		</Box>
	);
}

