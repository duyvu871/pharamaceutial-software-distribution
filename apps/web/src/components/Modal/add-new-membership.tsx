'use client'

import { useEffect, useState } from 'react'
import { TextInput, PasswordInput, Textarea, Modal, Group, LoadingOverlay } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User } from 'lucide-react'
import 'dayjs/locale/vi'
import { Typography } from '@component/Typography';
import { useDisclosure } from '@mantine/hooks'
import { CreationMembershipSchema, membershipSchema, PayloadMembershipSchema } from '@schema/membership-schema.ts';
import Image from 'next/image';
import { upsertMembership } from '@api/membership.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { uploadImage } from '@api/upload.ts';
import { cn } from '@lib/tailwind-merge.ts';

type EmployeeFormProps = {
	children: React.ReactNode
	data?: CreationMembershipSchema & {memberId: string}
	onSubmitted?: (data: PayloadMembershipSchema) => void
}

export default function EmployeeForm({children, data, onSubmitted}: EmployeeFormProps) {
	const {branchId} = useDashboard();
	const {showSuccessToast, showErrorToast} = useToast();

	const [opened, { open, close }] = useDisclosure(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [visible, { toggle, open: openOverlay, close: closeOverlay }] = useDisclosure(false)

	const [avatar, setAvatar] = useState<string | null>(null)
	const [avatarUploading, setAvatarUploading] = useState<boolean>(false);

	const { register, handleSubmit, formState: { errors }, setValue, getValues } =
		useForm<CreationMembershipSchema>({
			resolver: zodResolver(membershipSchema),
			defaultValues: {
				avatar: '',
				last_name: '',
				first_name: '',
				username: '',
				password: '',
				email: '',
				phone_number: '',
				hire_date: new Date().toISOString(),
				notes: '',
			}
		});

	const onSubmit = (data: CreationMembershipSchema) => {
		console.log(data);
		setLoading(true);
		openOverlay();
		upsertMembership(branchId, data)
			.then((res) => {
				showSuccessToast('Thêm nhân viên thành công');
				onSubmitted && onSubmitted(res);
				setTimeout(() => {
					close();
				}, 1000);
			})
			.catch((err) => {
				showErrorToast(err.message);
			})
			.finally(() => {
				closeOverlay();
				setLoading(false);
			});
	}

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return;
		setAvatarUploading(true);
		const upload = await uploadImage(file, branchId, 'avatar');
		if (upload) {
			setValue('avatar', upload.url);
			setAvatarUploading(false);
		}

		// if (file) {
		// 	const reader = new FileReader()
		// 	reader.onloadend = () => {
		// 		setValue('avatar', reader.result as string)
		// 	}
		// 	reader.readAsDataURL(file)
		// }
	}

	useEffect(() => {
		if (data) {
			Object.keys(data).forEach(key => {
				const keyName = key as keyof CreationMembershipSchema
				setValue(keyName, data[keyName]);
			})
		}
	}, [data]);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={'h6'} weight={'semibold'}>Thêm nhân viên</Typography>
				}
				size="60vw"
			>
				<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className={"flex flex-nowrap"}>
						{/* Avatar Upload */}
						<div className="flex flex-col items-center gap-4 mb-8 mx-10 my-10">
							<div
								className={cn(
									"w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center overflow-hidden",
									{
										'bg-gray-200/50': avatarUploading,
									}
								)}>
								{getValues('avatar') ? (
									<Image unoptimized src={getValues('avatar') || '/images/example-avatar.png'} width={200} height={200} alt="Avatar" className=" w-full h-full object-cover" />
								) : (
									<User className="w-16 h-16 text-gray-400" />
								)}
							</div>
							<label className="px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
								Chọn ảnh
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageUpload}
								/>
							</label>
						</div>

						{/* Employee Information Form */}
						<div className="flex-grow-[7] grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-10">
							<TextInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={getValues('last_name')}
								label="Họ"
								placeholder="Nhập họ"
								required
								error={errors.last_name?.message}
								onChange={(event) => setValue('last_name', event.currentTarget.value)}
							/>

							<TextInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={getValues('first_name')}
								label="Tên"
								placeholder="Nhập tên"
								required
								error={errors.first_name?.message}
								onChange={(event) => setValue('first_name', event.currentTarget.value)}
							/>

							<TextInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={getValues('username')}
								label="Tên đăng nhập"
								placeholder="Nhập tên đăng nhập"
								required
								error={errors.username?.message}
								onChange={(event) => setValue('username', event.currentTarget.value)}
							/>

							<PasswordInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={getValues('password')}
								label="Mật khẩu"
								placeholder="Nhập mật khẩu"
								// required
								error={errors.password?.message}
								onChange={(event) => setValue('password', event.currentTarget.value)}
							/>

							<TextInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={getValues('email')}
								label="Email"
								placeholder="Nhập email"
								required
								error={errors.email?.message}
								onChange={(event) => setValue('email', event.currentTarget.value)}
							/>

							<TextInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={getValues('phone_number')}
								label="Số điện thoại"
								placeholder="Nhập số điện thoại"
								required
								error={errors.phone_number?.message}
								onChange={(event) => setValue('phone_number', event.currentTarget.value)}
							/>

							<DateInput
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								defaultValue={new Date(getValues('hire_date') || new Date().toISOString())}
								label="Ngày tuyển dụng"
								placeholder="DD/MM/YYYY"
								valueFormat="DD/MM/YYYY"
								locale="vi"
								required
								error={errors.hire_date?.message}
								onChange={(date) => {
									setValue('hire_date', (date ?? new Date()).toISOString())
								}}
							/>

							<div className="col-span-2">
								<Textarea
									autoCorrect="off"
									autoComplete="off"
									autoCapitalize="off"
									defaultValue={getValues('notes')}
									label="Ghi chú"
									placeholder="Nhập ghi chú"
									error={errors.notes?.message}
									onChange={(event) => setValue('notes', event.currentTarget.value)}
								/>
							</div>
						</div>
					</div>

					{/* Form Actions */}
					<div className="flex justify-end gap-4 pt-6">
						<button
							type="button"
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

