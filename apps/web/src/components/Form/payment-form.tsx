import { Button, Stack, NumberInput, Checkbox, Group, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { z } from 'zod';
import { Label } from '@component/label';

// Define Zod schema for form validation
const paymentSchema = z.object({
	bankName: z.string().min(1, 'Tên ngân hàng là bắt buộc'),
	bankAccount: z.string().min(1, 'Số tài khoản là bắt buộc'),
	bankOwner: z.string().min(1, 'Chủ tài khoản là bắt buộc'),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
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
	};


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
						placeholder="Nhập số tiền"
						min={0}
						step={1000}
						{...form.getInputProps('bankAccount')}
						rightSectionWidth={50}
					/>

					<TextInput
						label="Chủ tài khoản"
						placeholder="Nhập số tiền"
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

