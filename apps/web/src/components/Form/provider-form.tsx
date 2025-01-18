"use client"

import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form'
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
import { CreateProviderSchema, CreateProviderType, Provider } from '@schema/provider-schema';
import { useEffect, useRef, useState } from 'react'
import { upsertProvider } from '@api/provider.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import useToast from '@hook/client/use-toast-notification.ts';



export type ProviderFormProps = {
	onSubmit?: (data: Provider) => void;
	modalProps?: {
		opened?: boolean;
		onClose?: () => void;
	}
	data?: Provider;
}

export function ProviderForm({ onSubmit, modalProps, data }: ProviderFormProps) {
	const {branchId} = useDashboard();
	const {showErrorToast, showSuccessToast} = useToast();
	const [providerId, setProviderId] = useState<string | null>(null);

	const [clearField, setClearField] = useState({
		tinh: false,
		huyen: false,
		xa: false
	});

	const formRef = useRef<HTMLFormElement>(null);

	const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<CreateProviderType>({
		resolver: zodResolver(CreateProviderSchema),
		defaultValues: {
			companyName: '',
			phoneNumber: '',
			email: '',
			address: '',
			city: '',
			district: '',
			wards: '',
			taxCode: '',
		},
	})

	const clearForm = () => {
		setValue('companyName', '')
		setValue('phoneNumber', '')
		setValue('email', '')
		setValue('address', '')
		setValue('city', '')
		setValue('district', '')
		setValue('wards', '')
		setValue('taxCode', '')
		setProviderId(null)
		setClearField({
			tinh: true,
			huyen: true,
			xa: true
		})
	}

	const submit = (data: CreateProviderType) => {
		console.log(data);
		upsertProvider(branchId, {...data, id: providerId})
			.then(res => {
				if (res) {
					onSubmit && onSubmit(res)
					showSuccessToast(data.companyName ? 'Cập nhật nhà phân phối thành công' : 'Tạo mới nhà phân phối thành công')
					!providerId && clearForm()
				}
			})
			.catch(err => {
				showErrorToast(err.message || err.errorDescription || 'Có lỗi xảy ra')
			})
	}

	const onValid = (data: SubmitErrorHandler<CreateProviderType> | undefined) => {
		if (data) {
		}
	}

	useEffect(() => {
		if (data) {
			setProviderId(data.id)
			setValue('companyName', data.companyName || '')
			setValue('phoneNumber', data.phoneNumber || '')
			setValue('email', data.email || '')
			setValue('address', data.address || '')
			setValue('city', data.city || '')
			setValue('district', data.district || '')
			setValue('wards', data.wards || '')
			setValue('taxCode', data.taxCode || '')
		}
	}, [data]);

	return (
		<Box maw={800} mx="auto" p="md">
			<form ref={formRef} noValidate onSubmit={handleSubmit(submit, (e) => console.log(e))}>
				<Stack gap="md">
					<Group wrap={"nowrap"} w={"100%"} className={"flex-shrink-0"}>
						<Controller
							name="companyName"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Tên nhà phân phối"
									placeholder="Nhập tên nhà phân phối"
									withAsterisk
									w={"100%"}
									error={errors.companyName?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							name="phoneNumber"
							control={control}
							render={({ field }) => (
								<TextInput
									label="Số điện thoại"
									placeholder="Nhập số điện thoại"
									withAsterisk
									w={"100%"}
									error={errors.phoneNumber?.message}
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
									required
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
						<RegionAutocomplete
							setValue={(data) => {
								setValue('city', data.tinh)
								setValue('district', data.huyen)
								setValue('wards', data.xa)
							}}
							clearField={clearField}
						/>
					</Group>

					<Controller
						name="taxCode"
						control={control}
						render={({ field }) => (
							<TextInput
								label="Mã số thuế"
								placeholder="Nhập mã số thuế"
								error={errors.taxCode?.message}
								{...field}
							/>
						)}
					/>

					<Button
						type="submit"
						color="var(--main-color)"
						mt="md"
						onClick={() => {
							console.log('submit');
							const values = getValues();
							console.log('values', values);
						}}
					>
						{data ? 'Cập nhật' : 'Tạo mới'}
						{/*Tạo*/}
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

