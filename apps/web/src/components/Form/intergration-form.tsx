import { Button, Stack, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Typography } from '@component/Typography';

interface IntegrationFormValues {
	integrationCode: string;
	integrationAccount: string;
	integrationPassword: string;
}

export default function IntegrationForm() {
	const form = useForm<IntegrationFormValues>({
		initialValues: {
			integrationCode: '',
			integrationAccount: '',
			integrationPassword: '',
		},
	});

	const handleSubmit = (values: IntegrationFormValues) => {
		console.log(values);
		// Handle form submission
	};

	return (
		<Stack maw={"70vw"}>
			<Typography size={"h3"} weight={"semibold"} className={"border-b-[3px] border-teal-500 w-fit"}>Thông tin liên thông</Typography>
			<form onSubmit={form.onSubmit(handleSubmit)} className={"p-5 pt-3"}>
				<Stack gap="md">
					<TextInput
						label="Mã liên thông"
						placeholder="Nhập mã liên thông"
						{...form.getInputProps('integrationCode')}
					/>

					<TextInput
						label="Tài khoản liên thông"
						placeholder="Nhập tài khoản liên thông"
						{...form.getInputProps('integrationAccount')}
					/>

					<PasswordInput
						label="Mật khẩu liên thông"
						placeholder="Nhập mật khẩu liên thông"
						{...form.getInputProps('integrationPassword')}
					/>

					<Button
						type="submit"
						color="teal"
						mt="sm"
						maw={200}
					>
						Lưu
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}

