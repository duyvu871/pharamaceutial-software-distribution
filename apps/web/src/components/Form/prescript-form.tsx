'use client'

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
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconPlus } from '@tabler/icons-react'

const prescriptionSchema = z.object({
	prescriptionId: z.string(),
	prescriptionDate: z.date({ required_error: 'Ngày kê đơn là bắt buộc' }),
	doctor: z.string().min(1, { message: 'Bác sĩ kê đơn là bắt buộc' }),
	facility: z.string().min(1, { message: 'Cơ sở khám bệnh là bắt buộc' }),
	diagnosis: z.string(),
	patientName: z.string().min(1, { message: 'Tên bệnh nhân là bắt buộc' }),
	birthDate: z.date({ required_error: 'Ngày sinh là bắt buộc' }),
	age: z.number().min(0),
	ageMonths: z.number().min(0),
	weight: z.number().positive({ message: 'Cân nặng phải lớn hơn 0' }),
	gender: z.string().min(1, { message: 'Giới tính là bắt buộc' }),
	address: z.string().min(1, { message: 'Địa chỉ là bắt buộc' }),
	insuranceCard: z.string(),
	phone: z.string(),
	guardianInfo: z.string(),
})

type PrescriptionFormData = z.infer<typeof prescriptionSchema>

export default function PrescriptionForm() {
	const { control, handleSubmit, formState: { errors } } = useForm<PrescriptionFormData>({
		resolver: zodResolver(prescriptionSchema),
	})

	const onSubmit = (data: PrescriptionFormData) => {
		console.log(data)
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

	return (
		<Paper maw={1200} mx="auto">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap="md">
					<Grid grow>
						<Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
							<Controller
								name="prescriptionId"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Mã Đơn Thuốc"
										placeholder="Tìm kiếm mã đơn thuốc"
										error={errors.prescriptionId?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
							<Controller
								name="prescriptionDate"
								control={control}
								render={({ field }) => (
									<DateInput

										label="Ngày Kê Đơn"
										placeholder="DD/MM/YYYY"
										required
										error={errors.prescriptionDate?.message}
										locale="vi"
										{...field}
									/>
								)}
							/>
						</Grid.Col>

					</Grid>

					<Grid grow>
						<Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
							<Group align="flex-end" >
								<Controller
									name="doctor"
									control={control}
									render={({ field }) => (
										<Select
											label="Bác sĩ kê đơn"
											placeholder="Chọn bác sĩ"
											style={{ flexGrow: 1 }}
											data={[
												{ value: 'doctor1', label: 'Bác sĩ 1' },
												{ value: 'doctor2', label: 'Bác sĩ 2' },
											]}
											required
											error={errors.doctor?.message}
											{...field}
										/>
									)}
								/>
								<Button w={60} variant="filled" color="teal" style={{ flexShrink: 0 }}>
									<IconPlus size={16} />
								</Button>
							</Group>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
							<Group align="flex-end" >
								<Controller
									name="facility"
									control={control}
									render={({ field }) => (
										<Select
											label="Cơ sở khám bệnh"
											placeholder="Chọn cơ sở"
											style={{ flexGrow: 1 }}
											data={[
												{ value: 'facility1', label: 'Cơ sở 1' },
												{ value: 'facility2', label: 'Cơ sở 2' },
											]}
											required
											error={errors.facility?.message}
											{...field}
										/>
									)}
								/>
								<Button w={60} variant="filled" color="teal" style={{ flexShrink: 0 }}>
									<IconPlus size={16} />
								</Button>
							</Group>
						</Grid.Col>
					</Grid>

					<Controller
						name="diagnosis"
						control={control}
						render={({ field }) => (
							<Textarea
								label="Chẩn Đoán"
								error={errors.diagnosis?.message}
								{...field}
							/>
						)}
					/>

					<Grid>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="patientName"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Tên bệnh nhân"
										required
										error={errors.patientName?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="birthDate"
								control={control}
								render={({ field }) => (
									<DateInput
										label="Ngày Sinh"
										required
										error={errors.birthDate?.message}
										locale="vi"
										{...field}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Group grow>
								<Controller
									name="age"
									control={control}
									render={({ field }) => (
										<NumberInput
											label="Tuổi"
											allowNegative={false}
											error={errors.age?.message}
											{...field}
										/>
									)}
								/>
								<Controller
									name="ageMonths"
									control={control}
									render={({ field }) => (
										<NumberInput
											label="Tháng Tuổi"
											allowNegative={false}
											error={errors.ageMonths?.message}
											{...field}
										/>
									)}
								/>
							</Group>
						</Grid.Col>
					</Grid>

					<Grid grow>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="weight"
								control={control}
								render={({ field }) => (
									<NumberInput
										label="Cân Nặng"
										allowNegative={false}
										error={errors.weight?.message}
										{...field}
										{...rightSectionLabel('kg')}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="gender"
								control={control}
								render={({ field }) => (
									<Select
										label="Giới tính"
										required
										data={[
											{ value: 'male', label: 'Nam' },
											{ value: 'female', label: 'Nữ' },
											{ value: 'other', label: 'Khác' },
										]}
										error={errors.gender?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
					</Grid>

					<Grid grow>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="insuranceCard"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Thẻ BHYT"
										error={errors.insuranceCard?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="phone"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Số điện thoại"
										required
										error={errors.phone?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
					</Grid>

					<Grid grow>
						<Grid.Col span={12}>
							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Địa Chỉ"
										required
										error={errors.address?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
					</Grid>

					<Controller
						name="guardianInfo"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Thông tin người giám hộ"
								required
								error={errors.guardianInfo?.message}
								{...field}
							/>
						)}
					/>

					<Group justify="flex-end" pt="md" className="border-t">
						<Button variant="outline" type="button" color="teal">
							Hủy bỏ
						</Button>
						<Button type="submit" color="teal">
							Đồng ý
						</Button>
					</Group>
				</Stack>
			</form>
		</Paper>
	)
}

