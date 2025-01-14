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
import { getUserProfile, updateUserProfile } from '@api/user.ts';
import { useProfile } from '@hook/dashboard/use-profile.ts';
import { Image } from '@mantine/core';
import UploadButton from '../../Button/upload-button.tsx';
import { uploadImage } from '@api/upload.ts';

export default function UserSettingForm() {
	const {branchId} = useDashboard();
	const {profile} = useProfile();
	const {userSessionInfo} = useAuth();
	const {showErrorToast, showSuccessToast} = useToast();

	const [file, setFile] = useState<File | null>(null);
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

	useEffect(() => {
		if (profile) {
			form.reset(profile);
			setImageURL(profile.avatar);
		}
	}, [profile]);

	useEffect(() => {
		if (file) {
			const url = URL.createObjectURL(file);
			setImageURL(url);
		}
	}, [file]);

	if (!profile) return null;
	if (!userSessionInfo) return null;

	const handleSubmit = async (values: UserSettingPayloadType) => {
		setSubmitting(true);
		console.log(values);
		updateUserProfile(profile.id, userSessionInfo.role as "membership"|"user", {
			username: values.username || profile.username || undefined,
			email: values.email || profile.email || undefined,
			phone_number: values.phone_number || profile.phone_number || undefined,
			age: values.age || profile.age || undefined,
			address: values.address || profile.address || undefined,
			avatar: values.avatar || profile.avatar || undefined,
		})
			.then(() => {
				setTimeout(() => {
					showSuccessToast('Cập nhật thông tin người dùng thành công');
					setSubmitting(false);
				}, 1000);
			})
			.catch((error) => {
				showErrorToast(error.message);
				setSubmitting(false);
			});

	};

	const handleUpload = async () => {
		if (!file) {
			return;
		}

		setUploading(true);
		const uploadAvatar = await uploadImage(file, branchId, 'avatar');
		if (uploadAvatar) {
			form.setValue('avatar', uploadAvatar.url);
			setImageURL(uploadAvatar.url);
			const avatarUpdate = await updateUserProfile(profile.id, userSessionInfo.role as "membership"|"user", {
				avatar: uploadAvatar.url
			});
			setTimeout(() => {
				showSuccessToast('Cập nhật ảnh đại diện thành công');
				setUploading(false);
			}, 1000);
		} else {
			showErrorToast('Cập nhật ảnh đại diện thất bại');
			setUploading(false);
		}
	}

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
								label="Tên người dùng"
								placeholder="Nhập tên người dùng"
								defaultValue={profile.username}
								{...form.register('username')}
								error={form.formState.errors.username?.message}
							/>

							<TextInput
								label="Email"
								placeholder="example@email.com"
								defaultValue={profile.email}
								{...form.register('email')}
								error={form.formState.errors.email?.message}
							/>

							<Group grow wrap={"nowrap"}>
								<TextInput
									label="Số điện thoại"
									placeholder="0123456789"
									defaultValue={profile.phone_number}
									{...form.register('phone_number')}
									error={form.formState.errors.phone_number?.message}
								/>

								<Controller
									name="age"
									control={form.control}
									render={({ field }) => (
										<NumberInput
											label="Tuổi"
											defaultValue={profile.age}
											placeholder="Nhập tuổi"
											{...field}
											onChange={(value) => field.onChange(Number(value))}
											value={field.value || '0'}
											error={form.formState.errors.age?.message}
										/>
									)}
								/>

							</Group>

							<TextInput
								label="Địa chỉ"
								placeholder="Nhập địa chỉ"
								defaultValue={profile.address}
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
							<Typography size="content" weight={"semibold"} color="black">
								Ảnh đại diện
							</Typography>
							{/*<Label label={"Ảnh đại diện"} position={"top"} classNames={{wrapper: "w-fit"}}>*/}
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
							{/*</Label>*/}

							<Group grow>
								<UploadButton
									color="var(--main-color)"
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
								{file && (
									<Button
										color="var(--main-color)"
										mt="sm"
										maw={200}
										onClick={handleUpload}
									>
										{uploading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Đang lưu...
											</>
										) : 'Lưu'}
									</Button>
								)}
							</Group>
						</Stack>
					</Group>

					<Button
						type="submit"
						color="var(--main-color)"
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

