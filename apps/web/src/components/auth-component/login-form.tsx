'use client';
import { upperFirst } from '@mantine/hooks';
import {
	Box, Center, Container, Flex,
	Input,
	PaperProps, Select,
} from '@mantine/core';
import {
	Anchor,
	Button,
	Checkbox,
	Divider,
	Group,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Image
} from '@mantine/core';
// import { GoogleButton } from './GoogleButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginPayloadType, loginSchema } from '@schema/user-schema';
import useToast from '@hook/client/use-toast-notification.ts';
import { useAuth } from '@hook/auth';
import NextImage from 'next/image';
import { cn } from '@lib/tailwind-merge.ts';
import { Typography } from '@component/Typography';
import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";

export function LoginForm(props: PaperProps) {
	const {className, ...others} = props;

	const toast = useToast();
	const searchParams = useSearchParams();
	const direct = searchParams?.get('direct');
	const router = useRouter();
	const { loginAction } = useAuth();
	const {
		getValues,
		handleSubmit,
		formState,
		setValue,
		setError,
	} = useForm<LoginPayloadType>({
		resolver: zodResolver(loginSchema),
	});

	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = () => {
		// handle form submission
		return handleSubmit((value, e) => {
			e?.preventDefault();
			// call login function
			setLoading(true);
			loginAction(value, direct || '/dashboard').then(() => {
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

	const backToMain = () => {
		router.push('/');
	};

	const handleLogin = () => {
		router.push('/auth/method?type=login');
	};
	const handleRegister = () => {
		router.push('/auth/method?type=register');
	};
	const handleForgotPassword = () => {
		router.push('/auth/method?type=forgot-password');
	};

	useEffect(() => {
		console.log('LoginForm');
	}, []);

	return (
		<Flex w={"100%"} h={"100%"} p={0} m={0} className={"flex-row items-center justify-center sm:justify-between"}>
			<div className={"flex justify-center w-full sm:max-w-[50%] !p-10"}>
				<Paper radius="md" className={cn('w-full max-w-sm', className)} {...others}>
					<Center w={"100%"} className={"mb-8"}>
						<Image component={NextImage} src={"/images/logo-PM-thuoc-1.png"} alt={"logo"} width={600} height={600} className={"!w-36"} />
					</Center>
					{/*<Group grow mb="md" mt="md">*/}
					{/*	<GoogleButton className="bg-opacity-0" radius="xl">Google</GoogleButton>*/}
					{/*</Group>*/}

					{/*<Divider label="Or continue with email" labelPosition="center" my="lg" />*/}

					<form className={""} onSubmit={onSubmit()}>
						<Stack>
							<Select
								// label="Loại tài khoản"
								label={
									<span className={"font-normal text-zinc-600"}>Loại tài khoản</span>
								}
								placeholder="Chọn loại tài khoản"
								data={[
									{ value: 'membership', label: 'Nhân viên' },
									{ value: 'user', label: 'Quản lý' },
								]}
								// defaultValue="user"
								radius="sm"
								size="md"
								onChange={(event) => setValue('role', event as any)}
								onKeyDown={handleEnter}
							/>
							<TextInput
								autoCapitalize="off"
								autoComplete="off"
								autoCorrect="off"
								error={formState.errors?.username?.message}
								label={
									<span className={"font-normal text-zinc-600"}>Tên đăng nhập</span>
								}
								onChange={(event) => setValue('username', event.currentTarget.value)}
								onKeyDown={handleEnter}
								// placeholder="contract@connectedbrain.com"
								radius="sm"
								size="md"
								className={"[]"}
								required
							/>

							<PasswordInput
								autoCapitalize="off"
								autoComplete="off"
								autoCorrect="off"
								error={formState.errors?.password?.message}
								label={
									<span className={"font-normal text-zinc-600"}>Mật khẩu</span>
								}
								onChange={(event) => setValue('password', event.currentTarget.value)}
								// placeholder="Your password"
								radius="sm"
								size="md"
								required
							/>

						</Stack>
						<Group justify="space-between" mt="lg">
							<Checkbox label="Lưu thông tin đăng nhập" />
						</Group>
						<Group justify="space-between" mt="xl">
							<Button w={"100%"} radius="sm" size={"md"} type="submit" className={"!bg-teal-600"}>
								{loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Đang đăng nhập...
									</>
								) : upperFirst('Đăng nhập') ?? 'Đăng nhập'}
							</Button>
						</Group>

						<Divider label={<div className={"bg-zinc-300 rounded-full w-2 aspect-square"} />} className={"my-6"} labelPosition="center" my="lg" />

						<Center w={"100%"}>
							<Typography color={"primary"} size={"sm"} weight={"medium"} onClick={handleForgotPassword} className={"cursor-pointer hover:text-zinc-500 hover:underline transition-colors"}>
								Quên mật khẩu?
							</Typography>
						</Center>
					</form>
				</Paper>
			</div>
			<Paper className={"!hidden sm:!block"}>
				<Center w={"100%"} h={"100%"} className={"relative"}>
					<NextImage src={"/images/pharmacy-store.png"} alt={"logo"} width={1500} height={1000} className={"h-svh w-[inherit] object-left object-cover"} />
				</Center>
			</Paper>
		</Flex>
	);
}