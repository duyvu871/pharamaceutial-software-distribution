import { Typography } from '@component/Typography';
import { Label } from '@component/label';
import useToast from '@hook/client/use-toast-notification';
import { useDashboard } from '@hook/dashboard/use-dasboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Group, NumberInput, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { UserSettingPayloadType, userSettingSchema } from '@schema/user-schema.ts';
import { Loader2, Upload } from 'lucide-react';
import { useAuth } from '@hook/auth';
import { getUserProfile } from '@api/user.ts';
import { useProfile } from '@hook/dashboard/use-profile.ts';
import { Image } from '@mantine/core';
import UploadButton from '../../Button/upload-button.tsx';

export default function UserSettingForm() {
	const {profile} = useProfile();
	const {showErrorToast, showSuccessToast} = useToast();

	if (!profile) {
		return null;
	}

	const [file, setFile] = useState<File | null>(null)
	const [imageURL, setImageURL] = useState<string | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);

	const [submitting, setSubmitting] = useState<boolean>(false);
	const form = useForm<UserSettingPayloadType>({
		resolver: zodResolver(userSettingSchema),
		defaultValues: {
			email: '',
			phone_number: '',
			username: '',
			avatar: '',
			age: undefined,
			address: '',
			password: '',
		}
	});

	const handleSubmit = (values: UserSettingPayloadType) => {
		setSubmitting(true);
		console.log(values);
		// Xử lý submit form ở đây
		setTimeout(() => {
			setSubmitting(false);
		}, 2000);
	};

	useEffect(() => {
		form.reset(profile);
	}, [profile]);

	return (
		<Stack>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				Thiết lập người dùng
			</Typography>

			<form onSubmit={form.handleSubmit(handleSubmit)} className="p-5 pt-3">
				<Stack gap="xl" maw={1000}>
					<Group grow align={"start"}>
						<Stack gap="sm" maw={500}>
							<TextInput
								label="Email"
								placeholder="example@email.com"
								{...form.register('email')}
								error={form.formState.errors.email?.message}
							/>

							<TextInput
								label="Số điện thoại"
								placeholder="0123456789"
								{...form.register('phone_number')}
								error={form.formState.errors.phone_number?.message}
							/>

							<TextInput
								label="Tên người dùng"
								placeholder="Nhập tên người dùng"
								{...form.register('username')}
								error={form.formState.errors.username?.message}
							/>

							{/*<TextInput*/}
							{/*	label="Ảnh đại diện (URL)"*/}
							{/*	placeholder="https://example.com/avatar.jpg"*/}
							{/*	{...form.register('avatar')}*/}
							{/*	error={form.formState.errors.avatar?.message}*/}
							{/*/>*/}

							<Controller
								name="age"
								control={form.control}
								render={({ field }) => (
									<NumberInput
										label="Tuổi"
										placeholder="Nhập tuổi"
										{...field}
										onChange={(value) => field.onChange(value)}
										error={form.formState.errors.age?.message}
									/>
								)}
							/>

							<TextInput
								label="Địa chỉ"
								placeholder="Nhập địa chỉ"
								{...form.register('address')}
								error={form.formState.errors.address?.message}
							/>

							{/*<PasswordInput*/}
							{/*	label="Mật khẩu"*/}
							{/*	placeholder="Nhập mật khẩu mới"*/}
							{/*	{...form.register('password')}*/}
							{/*	error={form.formState.errors.password?.message}*/}
							{/*/>*/}
						</Stack>
						<Stack gap="md" maw={500} justify={"start"} align={"center"}>
							<Box>
								<div
									className={'w-[200px] h-[200px] flex justify-center items-center aspect-square relative group rounded-full overflow-hidden border border-gray-200'}>
									{imageURL && (
										<Image
											src={imageURL}
											onLoad={() => (file && imageURL) && URL.revokeObjectURL(imageURL)}

											height={200}
											width={200}
											style={{objectFit: 'cover'}}
											className="rounded-full"
											alt="avatar hồ sơ"
										/>
									)}
								</div>
							</Box>

							<Group grow>

								<UploadButton
									color="teal"
									mt="sm"
									maw={200}
									accept={'image/*'}
									onFileSelect={(file) => file && setFile(file)}
									disabled={uploading}
								>
									<Box
										className={"flex items-center justify-center gap-2"}
									>
										<Upload className="w-4 h-4" />	Tải lên
									</Box>
								</UploadButton>
							</Group>
						</Stack>
					</Group>

					<Button
						type="submit"
						color="teal"
						maw={200}
						disabled={submitting}
					>
						{submitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Đang lưu...
							</>
						) : 'Lưu thay đổi'}
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}

