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
    Group,
} from '@mantine/core'
import ProviderAutocomplete from '@component/Autocomplete/provider-autocomplete.tsx';
import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
import { Provider } from '@schema/provider-schema'
import { useEffect } from 'react'

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

export type ProviderFormProps = {
	onSubmit?: (data: FormData) => boolean;
	modalProps?: {
		opened?: boolean;
		onClose?: () => void;
	}
	data?: Provider;
}

export function ProviderForm({ onSubmit, modalProps, data }: ProviderFormProps) {
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

	const clearForm = () => {
		setValue('name', '')
		setValue('phone', '')
		setValue('email', '')
		setValue('address', '')
		setValue('province', '')
		setValue('district', '')
		setValue('ward', '')
		setValue('taxId', '')
	}

	const submit = (data: FormData) => {
		const isValid = onSubmit && onSubmit(data);
		if (isValid) {
			clearForm();
		}
		console.log(data)
	}

	useEffect(() => {
		if (data) {
			setValue('name', data.companyName)
			setValue('phone', data.phoneNumber || '')
			setValue('email', data.email || '')
			setValue('address', data.address || '')
			setValue('province', data.city || '')
			setValue('district', data.district || '')
			setValue('ward', data.wards || '')
			setValue('taxId', data.taxCode || '')
		}
	}, [data]);

	return (
		<Box maw={800} mx="auto" p="md">
			<form onSubmit={handleSubmit(submit)}>
				<Stack gap="md">
					<Group wrap={"nowrap"} w={"100%"} className={"flex-shrink-0"}>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Tên nhà phân phối"
									placeholder="Nhập tên nhà phân phối"
									withAsterisk
									w={"100%"}
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
									w={"100%"}
									error={errors.phone?.message}
									{...field}
								/>
							)}
						/>
					</Group>

					<Group wrap={"nowrap"} w={"100%"} className={"flex-shrink-0"}>

						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Email"
									placeholder="Nhập email"
									error={errors.email?.message}
									w={"100%"}
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
									w={"100%"}
									{...field}
								/>
							)}
						/>

					</Group>
					<Group wrap={"nowrap"}>
						<RegionAutocomplete setValue={(data) => {
							setValue('province', data.tinh)
							setValue('district', data.huyen)
							setValue('ward', data.xa)
						}}/>
					</Group>

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
						color="var(--main-color)"
						mt="md"
					>
						{data ? 'Cập nhật' : 'Tạo mới'}
						{/*Tạo*/}
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

