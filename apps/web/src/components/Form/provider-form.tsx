"use client"

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	TextInput,
	Select,
	Button,
	Box,
	Title,
	Grid,
	Stack,
} from '@mantine/core'
import ProviderAutocomplete from '@component/Autocomplete/provider-autocomplete.tsx';

// Mock data for dropdowns - replace with your actual data
const provinces = [
	{ value: "hanoi", label: "Hà Nội" },
	{ value: "hcm", label: "TP. Hồ Chí Minh" },
]

const districts = [
	{ value: "district1", label: "Quận 1" },
	{ value: "district2", label: "Quận 2" },
]

const wards = [
	{ value: "ward1", label: "Phường 1" },
	{ value: "ward2", label: "Phường 2" },
]

const schema = z.object({
	name: z.string().min(2, { message: 'Tên nhà phân phối phải có ít nhất 2 ký tự' }),
	phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
	email: z.string().email({ message: 'Email không hợp lệ' }).optional().or(z.literal('')),
	address: z.string().min(5, { message: 'Địa chỉ phải có ít nhất 5 ký tự' }),
	province: z.string().min(1, { message: 'Vui lòng chọn Tỉnh/Thành phố' }),
	district: z.string().min(1, { message: 'Vui lòng chọn Quận/Huyện' }),
	ward: z.string().min(1, { message: 'Vui lòng chọn Phường/Thị trấn' }),
	taxId: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ProviderForm() {
	const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			address: '',
			province: '',
			district: '',
			ward: '',
			taxId: '',
		},
	})

	const onSubmit = (data: FormData) => {
		console.log(data)
	}

	return (
		<Box maw={800} mx="auto" p="md">
			<Title order={1} mb="lg">THÊM NHÀ PHÂN PHỐI</Title>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap="md">
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Tên nhà phân phối"
								placeholder="Nhập tên nhà phân phối"
								withAsterisk
								error={errors.name?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Số điện thoại"
								placeholder="Nhập số điện thoại"
								withAsterisk
								error={errors.phone?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Email"
								placeholder="Nhập email"
								error={errors.email?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name="address"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Địa chỉ"
								placeholder="Nhập địa chỉ"
								error={errors.address?.message}
								{...field}
							/>
						)}
					/>

					<Grid>
						<Grid.Col span={{ base: 12, md: 4 }}>
							<Controller
								name="province"
								control={control}
								render={({ field }) => (
									<Select
										label="Tỉnh, thành phố"
										placeholder="Chọn tỉnh/thành phố"
										data={provinces}
										error={errors.province?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={{ base: 12, md: 4 }}>
							<Controller
								name="district"
								control={control}
								render={({ field }) => (
									<Select
										label="Quận, huyện"
										placeholder="Chọn quận/huyện"
										data={districts}
										error={errors.district?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>

						<Grid.Col span={{ base: 12, md: 4 }}>
							<Controller
								name="ward"
								control={control}
								render={({ field }) => (
									<Select
										label="Phường, thị trấn"
										placeholder="Chọn phường/thị trấn"
										data={wards}
										error={errors.ward?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
					</Grid>

					<Controller
						name="taxId"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Mã số thuế"
								placeholder="Nhập mã số thuế"
								error={errors.taxId?.message}
								{...field}
							/>
						)}
					/>

					<Button
						type="submit"
						color="teal"
						mt="md"
					>
						Tạo
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

