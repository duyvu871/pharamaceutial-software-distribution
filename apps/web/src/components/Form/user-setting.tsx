import { Typography } from '@component/Typography';
import { Label } from '@component/label';
import useToast from '@hook/client/use-toast-notification';
import { useDashboard } from '@hook/dashboard/use-dasboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, NumberInput, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { UserSettingPayloadType, userSettingSchema } from '@schema/user-schema.ts';
import { Loader2 } from 'lucide-react';

export default function UserSetting() {
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

	return (
		<Stack>
			<h2 className="text-2xl font-semibold border-b-[3px] border-teal-500 pb-2 w-fit">
				Thiết lập người dùng
			</h2>

			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-w-md">
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

				<TextInput
					label="Ảnh đại diện (URL)"
					placeholder="https://example.com/avatar.jpg"
					{...form.register('avatar')}
					error={form.formState.errors.avatar?.message}
				/>

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

				<PasswordInput
					label="Mật khẩu"
					placeholder="Nhập mật khẩu mới"
					{...form.register('password')}
					error={form.formState.errors.password?.message}
				/>

				<Button
					type="submit"
					color="teal"
					fullWidth
					disabled={submitting}
				>
					{submitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Đang lưu...
						</>
					) : 'Lưu thay đổi'}
				</Button>
			</form>
		</Stack>
	);
}

