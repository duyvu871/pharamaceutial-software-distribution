"use client";

import { useState } from "react";
import { TextInput, PasswordInput, Button, Box, Title, Paper, Stack, Center } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthLayout from '@layout/auth-layout.tsx';
import { useAuth } from '@hook/auth';
import useToast from '@hook/client/use-toast-notification.ts';
import { useRouter, useSearchParams } from '@route/hooks';

const loginSchema = z.object({
	username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
	password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginForm() {
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const { loginAction } = useAuth();
	const toast = useToast();
	const searchParams = useSearchParams();
	const direct = searchParams?.get('direct');
	const router = useRouter();
	const onSubmit = () => {
		// handle form submission
		return handleSubmit((value, e) => {
			e?.preventDefault();
			// call login function
			setLoading(true);
			loginAction({
				...value,
				role: 'admin',
			}, direct || '/admin/dashboard')
				.then(() => {
					setLoading(false);
				});
			console.log(value);
		}, (errors) => {
			console.log(errors);
			toast.showErrorToast(Object.values(errors).map(item => {
				return item.message;
			}).join(', '));
		});
	};

	const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onSubmit();
		}
	}

	return (
		<AuthLayout>
			<Center mx="auto" w={"100%"} h={"100%"}>
				<Paper withBorder shadow="md" p={30} radius="md">
					<Title order={2} mb="md">
						Đăng nhập vào hệ thống quản trị
					</Title>
					<form onSubmit={onSubmit()}>
						<Stack>
							<Controller
								name="username"
								control={control}
								render={({ field }) => (
									<TextInput
										required
										label="Tên đăng nhập"
										placeholder="Nhập tên đăng nhập"
										error={errors.username?.message}
										onKeyDown={handleEnter}
										{...field}
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<PasswordInput
										required
										label="Mật khẩu"
										placeholder="Nhập mật khẩu của bạn"
										error={errors.password?.message}
										onKeyDown={handleEnter}
										{...field}
									/>
								)}
							/>
							<Button type="submit" loading={loading}>
								Đăng nhập
							</Button>
						</Stack>
					</form>
				</Paper>
			</Center>
		</AuthLayout>
	);
}