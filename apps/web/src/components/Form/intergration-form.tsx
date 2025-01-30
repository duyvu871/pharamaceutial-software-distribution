import { Button, Stack, TextInput, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { useEffect } from 'react';
import { BranchIntegration, branchIntegrationSchema, IntegrationFormValues } from '@schema/branch-schema.ts';
import { getBranchIntegration, upsertBranchIntegration } from '@api/branch.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard';
import useToast from '@hook/client/use-toast-notification.ts';



export default function IntegrationForm() {
	const {branchId} = useDashboard();

	const {showErrorToast, showSuccessToast} = useToast();

	const form = useForm<BranchIntegration>({
		validate: zodResolver(branchIntegrationSchema),
		initialValues: {
			// integrationCode: '',
			// integrationAccount: '',
			// integrationPassword: '',
			integration_id: '',
			integration_password: '',
			integration_account: '',
		},
	});

	const handleSubmit = (values: BranchIntegration) => {
		console.log(values);
		// Handle form submission
		if (!branchId) {
			return;
		}
		upsertBranchIntegration(branchId, values)
			.then(response => {
				if (response && 'id' in response) {
					showSuccessToast("Lưu thông tin liên thông thành công")
				} else if (response && 'errorCode' in response) {
					showErrorToast(response.errorDescription)
				}
			})
			.catch(error => {
				showErrorToast(error.errorDescription)
			});
	};

	useEffect(() => {
		getBranchIntegration(branchId)
			.then(response => {
				if (!response) return;
				form.setFieldValue("integrationCode", response.integration_id);
				form.setFieldValue("integrationAccount", response.integration_account);
				form.setFieldValue("integrationPassword", response.integration_password);
			})
			.catch(error => {
				showErrorToast(error.message)
			})
	}, []);

	return (
		<Stack maw={"800px"}>
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

