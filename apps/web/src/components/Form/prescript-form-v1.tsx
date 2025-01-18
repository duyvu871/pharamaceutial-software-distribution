"use client"

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	TextInput,
	Select,
	Button,
	Paper,
	Stack,
	Grid,
	Group,
	Box,
	NumberInput,
	Textarea,
	Text,
    Radio,
    ActionIcon,
} from '@mantine/core'
import { DateInput, DatePickerInput, DateValue } from '@mantine/dates'
import { IconCalendar, IconPlus, IconSearch } from '@tabler/icons-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
	invoiceActionAtom,
	invoiceActiveTabAtom,
	prescriptionActionAtom,
	prescriptionDoctorAtom,
	prescriptionSaleAtom,
} from '@store/state/overview/invoice.ts';
import {useAtom, useAtomValue, useSetAtom} from "jotai"
import {
	PrescriptionCreationSchema,
	prescriptionCreationSchema,
	PrescriptionFormData,
	prescriptionSchema,
} from '@schema/invoice-schema.ts';
import { Label } from '@component/label'
import { Typography } from '@component/Typography';
import { useHotkeys } from '@mantine/hooks'
import DoctorAutocomplete from '@component/Autocomplete/doctor-autocomplete.tsx';

export type PrescriptionFormProps = {
	onSubmit?: (data: PrescriptionCreationSchema) => void;
	modalProps?: {
		opened?: boolean;
		onClose?: () => void;
	};
}

export default function PrescriptionFormV1({onSubmit, modalProps}: PrescriptionFormProps) {
	const { control, handleSubmit, formState: { errors }, setValue } = useForm<PrescriptionCreationSchema>({
		resolver: zodResolver(prescriptionCreationSchema),
		defaultValues: {
			ma_don_thuoc: '',
			ngay_ke: new Date(),
			bac_si_id: '',
			co_so_kham: '',
			chuan_doan: '',
			benh_nhan: '',
			nam_sinh: 0,
			tuoi: 0,
			thang_tuoi: 0,
			can_nang: 0,
			gioi_tinh: 0,
			dia_chi: '',
			nguoi_giam_ho: '',
			cmnd: '',
			dien_thoai: '',
			the_bhyt: '',
		}
	})
	// const setPrescriptionSale = useSetAtom(prescriptionSaleAtom)
	// const setDoctor = useSetAtom(prescriptionDoctorAtom)
	const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);

	const invoiceActiveTab = useAtomValue(invoiceActiveTabAtom)
	const prescriptionAction = useSetAtom(prescriptionActionAtom)
	const prescriptions = useAtomValue(prescriptionSaleAtom)
	const prescriptionDoctor = useAtomValue(prescriptionDoctorAtom)

	const formRef = useRef<HTMLFormElement>(null)

	const [doctorName, setDoctorName] = useState<string | null>(null)

	const formReset = () => {
		formRef.current?.reset()
		// prescriptionAction({
		// 	type: "update-doctor",
		// 	data: null
		// });
		// prescriptionAction({
		// 	type: "update",
		// 	data: null
		// });
		// setDoctor(null)
		// setPrescriptionSale(null)
	}

	const submit = (data: PrescriptionCreationSchema) => {
		// setPrescriptionSale(data)
		prescriptionAction({
			type: "update",
			data: data
		});

		invoiceDispatch({
			type: "update",
			id: invoiceActiveTab,
			invoice: {
				isPrescriptionSale: true,
			}
		})
		onSubmit && onSubmit(data)
		console.log(data);
	}

	const rightSectionLabel = (section: React.ReactNode|string) => ({
		styles:{
			section: {
				width: 50,
				backgroundColor: 'rgba(128,128,128,0.1)'
			},
		},
		rightSection:(
			typeof section === "string" ? <Text color={'dark'} size={'sm'} span>{section}</Text> : section
		)
	})

	useHotkeys([
		['F9', () => formRef.current?.requestSubmit()],
	]);

	useEffect(() => {
		console.log("Active Tab", invoiceActiveTab);
		console.log("Prescriptions", prescriptions);
		console.log("Doctor", prescriptionDoctor[invoiceActiveTab]?.ten_bac_si);
			const prescription = prescriptions[invoiceActiveTab]
			setValue('ma_don_thuoc', prescription?.ma_don_thuoc || '')
			setValue('ngay_ke', prescription?.ngay_ke || new Date())
			setValue('bac_si_id', prescription?.bac_si_id || '')
			setValue('co_so_kham', prescription?.co_so_kham || '')
			setValue('chuan_doan', prescription?.chuan_doan || '')
			setValue('benh_nhan', prescription?.benh_nhan || '')
			setValue('nam_sinh', prescription?.nam_sinh || 0)
			setValue('tuoi', prescription?.tuoi || 0)
			setValue('thang_tuoi', prescription?.thang_tuoi || 0)
			setValue('can_nang', prescription?.can_nang || 0)
			setValue('gioi_tinh', prescription?.gioi_tinh || 0)
			setValue('dia_chi', prescription?.dia_chi || '')
			setValue('nguoi_giam_ho', prescription?.nguoi_giam_ho || '')
			setValue('cmnd', prescription?.cmnd || '')
			setValue('dien_thoai', prescription?.dien_thoai || '')
			setValue('the_bhyt', prescription?.the_bhyt || '')
			setDoctorName(prescriptionDoctor[invoiceActiveTab]?.ten_bac_si || "")
	}, [invoiceActiveTab])

	return (
		<Box mx="auto" p={10} pb={20} pt={60} pos={"relative"}>
			<form ref={formRef} onSubmit={handleSubmit(submit)}>
				<Grid gutter={"xs"}>
					{/* First Row */}
					<Grid.Col span={3}>
						<Controller
							name="ma_don_thuoc"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Mã đơn thuốc"
									placeholder="Nhập mã đơn thuốc"
									error={error?.message}
									rightSection={<ActionIcon color={"var(--main-color)"} ><IconSearch size={16} /></ActionIcon>}
									{...field}
									onChange={(e) => {
										setValue('ma_don_thuoc', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												ma_don_thuoc: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={3}>
						<Controller
							name="ngay_ke"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<DatePickerInput
									label="Ngày kê"
									placeholder="Chọn ngày kê đơn"
									error={error?.message}
									required
									locale="vi"
									rightSection={<IconCalendar size={16} color="#666" />}
									{...field}
									onChange={(e) => {
										setValue('ngay_ke', e as Date || new Date())
										prescriptionAction({
											type: "update",
											data: {
												ngay_ke: e as Date || new Date()
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={3}>
						<Controller
							name="bac_si_id"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<DoctorAutocomplete
									setValue={(doctor) => {
										prescriptionAction({
											type: "update-doctor",
											data: doctor
										});
										prescriptionAction({
											type: "update",
											data: {
												bac_si_id: doctor.id,
												co_so_kham: doctor.noi_cong_tac
											}
										})
										console.log("Doctor", doctor);
										setDoctorName(doctor.ten_bac_si)
										setValue('bac_si_id', doctor.id)
										setValue('co_so_kham', doctor.noi_cong_tac)
									}}
									value={doctorName || ""}
									defaultValue={prescriptionDoctor[invoiceActiveTab]?.ten_bac_si || ""}
								/>
							)}
						/>

					</Grid.Col>

					<Grid.Col span={3} style={{ position: 'relative' }}>
						<Controller
							name="co_so_kham"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Cơ sở khám bệnh"
									placeholder="Nhập cơ sở khám"
									required
									error={error?.message}
									{...field}
									defaultValue={prescriptionDoctor[invoiceActiveTab]?.noi_cong_tac || ""}
									onChange={(e) => {
										setValue('co_so_kham', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												co_so_kham: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					{/* Second Row */}
					<Grid.Col span={6}>
						<Controller
							name="chuan_doan"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Chẩn đoán"
									placeholder="Nhập chẩn đoán"
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('chuan_doan', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												chuan_doan: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={6}>
						<Controller
							name="benh_nhan"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Bệnh nhân"
									required
									placeholder="Nhập tên bệnh nhân"
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('benh_nhan', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												benh_nhan: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					{/* Third Row */}
					<Grid.Col span={2}>
						<Controller
							name="ngay_sinh"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<DatePickerInput
									label="Ngày sinh"
									placeholder="dd/MM/yyyy"
									error={error?.message}
									rightSection={<IconCalendar size={16} color="#666" />}
									{...field}
									onChange={(e) => {
										setValue('ngay_sinh', e as Date || new Date())
										prescriptionAction({
											type: "update",
											data: {
												ngay_sinh: e as Date || new Date()
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="nam_sinh"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<NumberInput
									label="Năm sinh"
									placeholder="Năm sinh"
									required
									error={error?.message}
									{...field}
									onChange={(e) => {
										const value = parseInt(String(e))
										setValue('nam_sinh', value)
										prescriptionAction({
											type: "update",
											data: {
												nam_sinh: value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="tuoi"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<NumberInput
									label="Tuổi"
									error={error?.message}
									min={0}
									{...field}
									onChange={(e) => {
										const value = parseInt(String(e))
										setValue('tuoi', value)
										prescriptionAction({
											type: "update",
											data: {
												tuoi: value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="thang_tuoi"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<NumberInput
									label="Tháng tuổi"
									error={error?.message}
									min={0}
									{...field}
									onChange={(e) => {
										const value = parseInt(String(e))
										setValue('thang_tuoi', value)
										prescriptionAction({
											type: "update",
											data: {
												thang_tuoi: value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="can_nang"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<NumberInput
									label="Cân nặng (kg)"
									placeholder="0.00"
									error={error?.message}
									step={0.1}
									min={0}
									{...field}
									{...rightSectionLabel('kg')}
									onChange={(e) => {
										const value = parseFloat(String(e))
										setValue('can_nang', value)
										prescriptionAction({
											type: "update",
											data: {
												can_nang: value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="gioi_tinh"
							control={control}
							render={({ field, fieldState: { error } }) => (
									<Radio.Group
										{...field}
										label="Giới tính"
										value={String(field.value)}
										// onChange={(value) => field.onChange(parseInt(value, 10))}
										onChange={(e) => {
											const value = parseInt(e, 10)
											setValue('gioi_tinh', value)
											prescriptionAction({
												type: "update",
												data: {
													gioi_tinh: value
												}
											})
										}}
									>
										<Group>
											<Radio color={"var(--main-color)"} value="0" label="Nam" />
											<Radio color={"var(--main-color)"} value="1" label="Nữ" />
										</Group>
									</Radio.Group>
							)}
						/>
					</Grid.Col>

					{/* Fourth Row */}
					<Grid.Col span={4}>
						<Controller
							name="dia_chi"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Địa chỉ"
									placeholder="Nhập địa chỉ"
									required
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('dia_chi', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												dia_chi: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="nguoi_giam_ho"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Người giám hộ"
									placeholder="Nhập tên người giám hộ"
									required
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('nguoi_giam_ho', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												nguoi_giam_ho: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="cmnd"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="CMND"
									placeholder="Nhập số CMND"
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('cmnd', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												cmnd: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="dien_thoai"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Điện thoại"
									placeholder="Nhập số điện thoại"
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('dien_thoai', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												dien_thoai: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<Controller
							name="the_bhyt"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Thẻ BHYT"
									placeholder="Nhập số thẻ BHYT"
									error={error?.message}
									{...field}
									onChange={(e) => {
										setValue('the_bhyt', e.target.value)
										prescriptionAction({
											type: "update",
											data: {
												the_bhyt: e.target.value
											}
										})
									}}
								/>
							)}
						/>
					</Grid.Col>
				</Grid>

				<Box pos={"absolute"} top={0} left={"50%"} style={{transform: "translateX(-50%)"}}>
					<Typography weight={"semibold"} color={"white"} className={"p-[5px] bg-teal-500 rounded-b-md"}>
						Thông tin đơn thuốc
					</Typography>
				</Box>
				<Button
					type="submit"
					color={"var(--main-color)"}
					pos={"absolute"}
					style={{ right:0, top:0,  }}
					className={"!rounded-r-none !rounded-tl-none"}
				>
					Áp dụng (F9)
				</Button>
			</form>
		</Box>
	)
}

