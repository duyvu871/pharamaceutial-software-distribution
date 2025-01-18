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
import { getUserProfile, resetPassword } from '@api/user.ts';
import { useProfile } from '@hook/dashboard/use-profile.ts';
import { Image } from '@mantine/core';
import UploadButton from '@component/Button/upload-button.tsx';
import { z } from 'zod';

const userPasswordSchema = z.object({
	// old_password: z.string().min(6, 'Mật khẩu cũ phải có ít nhất 6 ký tự'),
	new_password: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
	confirm_password: z.string().min(6, 'Mật khẩu xác nhận phải có ít nhất 6 ký tự'),
})
	.refine(data => data.new_password === data.confirm_password, {
		message: 'Mật khẩu xác nhận không khớp',
		path: ['confirm_password'],
	})

type UserPasswordPayload = z.infer<typeof userPasswordSchema>;

export default function UserSettingPasswordForm() {
	const {profile} = useProfile();
	const {userSessionInfo} = useAuth();
	const {showErrorToast, showSuccessToast} = useToast();

	if (!profile) return null;
	if (!userSessionInfo) return null;

	const [submitting, setSubmitting] = useState<boolean>(false);
	const form = useForm<UserPasswordPayload>({
		resolver: zodResolver(userPasswordSchema),
		defaultValues: {
			// old_password: '',
			new_password: '',
			confirm_password: '',
		}
	});

	const handleSubmit = (values: UserPasswordPayload) => {
		console.log(values);
		setSubmitting(true);
		resetPassword(profile.id, userSessionInfo.role, {
			password: values.new_password,
			confirmedPassword: values.confirm_password,
		})
			.then(() => {
				setTimeout(() => {
					showSuccessToast('Thay đổi mật khẩu thành công');
					form.reset();
					setSubmitting(false);
				}, 1000)
			})
			.catch((error) => {
				showErrorToast(error.message);
				setSubmitting(false);
			})
	};

	return (
		<Stack>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				Thay đổi mật khẩu
			</Typography>

			<form onSubmit={form.handleSubmit(handleSubmit)} className="p-5 pt-3">
				<Stack gap="xl" maw={1000}>
					<Stack gap="sm" maw={500}>
						{/*<TextInput*/}
						{/*	label="Mật khẩu cũ"*/}
						{/*	placeholder="Nhập mật khẩu cũ"*/}
						{/*	{...form.register('old_password')}*/}
						{/*/>*/}
						<PasswordInput
							label="Mật khẩu mới"
							placeholder="Nhập mật khẩu mới"
							{...form.register('new_password')}
						/>
						<PasswordInput
							label="Xác nhận mật khẩu"
							placeholder="Nhập lại mật khẩu mới"
							{...form.register('confirm_password')}
						/>
					</Stack>

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

