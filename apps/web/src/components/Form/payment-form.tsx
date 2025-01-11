import { Button, Stack, NumberInput, Checkbox, Group, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { z } from 'zod';
import { Label } from '@component/label';
import { PaymentFormValues, paymentSchema } from '@schema/branch-schema.ts';
import { getBranchPayment, upsertBranchPayment } from '@api/branch.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard';
import useToast from '@hook/client/use-toast-notification.ts';
import { useEffect } from 'react';



export default function PaymentForm() {
	const {branchId} = useDashboard();

	const {showErrorToast, showSuccessToast} = useToast();

	const form = useForm<PaymentFormValues>({
		validate: zodResolver(paymentSchema),
		initialValues: {
			bankName: '',
			bankAccount: '',
			bankOwner: '',
		},
	});

	const handleSubmit = (values: PaymentFormValues) => {
		console.log(values);
		// Handle form submission
		upsertBranchPayment(
			branchId,
			{
				...values
			}
		)
			.then(response => {
				console.log(response);
				showSuccessToast("Lưu thông tin thanh toán thành công")
			})
			.catch(error => {
				console.log(error);
				showErrorToast(error.message || 'Lỗi khi lưu thông tin thanh toán \n vui lòng thử lại')
			});
	};

	useEffect(() => {
		getBranchPayment(branchId)
			.then(response => {
				if (!response) return;
				form.setFieldValue("bankName", response.payment_bank);
				form.setFieldValue("bankAccount", response.payment_account_number);
				form.setFieldValue("bankOwner", response.payment_account_owner);
			})
	}, []);


	return (
		<Stack>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				Thiết lập thanh toán
			</Typography>

			<form onSubmit={form.onSubmit(handleSubmit)} className="p-5 pt-3">
				<Stack gap="md" maw={500}>
					<TextInput
						label="Tên ngân hàng"
						placeholder="Ngân hàng"
						min={0}
						step={1000}
						{...form.getInputProps('bankName')}
						rightSectionWidth={50}
					/>

					<TextInput
						label="Số tài khoản"
						placeholder="Nhập số tài khoản"
						min={0}
						step={1000}
						{...form.getInputProps('bankAccount')}
						rightSectionWidth={50}
					/>

					<TextInput
						label="Chủ tài khoản"
						placeholder="Nhập tên chủ tài khoản"
						min={0}
						step={1000}
						{...form.getInputProps('bankOwner')}
						rightSectionWidth={50}
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

