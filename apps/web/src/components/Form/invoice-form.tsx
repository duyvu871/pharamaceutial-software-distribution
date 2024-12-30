import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput, NumberInput, Checkbox, Textarea, Button, Group, Stack, Grid } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';

// Define the schema for the invoice
const invoiceSchema = z.object({
	id: z.string().uuid(),
	branchId: z.string().uuid(),
	saleDate: z.date(),
	saleTime: z.string(),
	customerName: z.string().nullable(),
	customerId: z.string().uuid().nullable(),
	priceList: z.string().nullable(),
	isPrescriptionSale: z.boolean().nullable(),
	totalPrice: z.number(),
	discount: z.number(),
	amountDue: z.number(),
	amountPaid: z.number(),
	debit: z.number(),
	notes: z.string().nullable(),
	autoPrintInvoice: z.boolean().nullable(),
	printBatchNumber: z.boolean().nullable(),
	userType: z.enum(['user', 'membership', 'admin']).nullable(),
	userId: z.string().nullable(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
	initialData?: Partial<InvoiceFormData>;
	onSubmit: (data: InvoiceFormData) => void;
}

export function InvoiceForm({ initialData, onSubmit }: InvoiceFormProps) {
	const { control, handleSubmit, setValue, watch } = useForm<InvoiceFormData>({
		resolver: zodResolver(invoiceSchema),
		defaultValues: {
			id: initialData?.id || '',
			branchId: initialData?.branchId || '',
			saleDate: initialData?.saleDate || new Date(),
			saleTime: initialData?.saleTime || '',
			customerName: initialData?.customerName || null,
			customerId: initialData?.customerId || null,
			priceList: initialData?.priceList || null,
			isPrescriptionSale: initialData?.isPrescriptionSale || false,
			totalPrice: initialData?.totalPrice || 0,
			discount: initialData?.discount || 0,
			amountDue: initialData?.amountDue || 0,
			amountPaid: initialData?.amountPaid || 0,
			debit: initialData?.debit || 0,
			notes: initialData?.notes || null,
			autoPrintInvoice: initialData?.autoPrintInvoice || false,
			printBatchNumber: initialData?.printBatchNumber || false,
			userType: initialData?.userType || null,
			userId: initialData?.userId || null,
		},
	});

	const watchTotalPrice = watch('totalPrice');
	const watchDiscount = watch('discount');

	React.useEffect(() => {
		const amountDue = watchTotalPrice - watchDiscount;
		setValue('amountDue', amountDue);
	}, [watchTotalPrice, watchDiscount, setValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack gap="md">
				<Grid>
					<Grid.Col span={6}>
						<Controller
							name="saleDate"
							control={control}
							render={({ field }) => (
								<DatePickerInput
									label="Sale Date"
									placeholder="Select date"
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="saleTime"
							control={control}
							render={({ field }) => (
								<TimeInput
									label="Sale Time"
									placeholder="Enter time"
									{...field}
								/>
							)}
						/>
					</Grid.Col>
				</Grid>

				<Controller
					name="priceList"
					control={control}
					render={({ field }) => (
						<TextInput
							label="Price List"
							placeholder="Enter price list"
							{...field}
							value={field.value || ''}
						/>
					)}
				/>

				<Controller
					name="isPrescriptionSale"
					control={control}
					render={({ field }) => (
						<Checkbox
							label="Prescription Sale"
							onChange={(event) => field.onChange(event.currentTarget.checked)}
							checked={field.value || false}
						/>
					)}
				/>

				<Grid>
					<Grid.Col span={4}>
						<Controller
							name="totalPrice"
							control={control}
							render={({ field }) => (
								<NumberInput
									label="Total Price"
									placeholder="Enter total price"
									min={0}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={4}>
						<Controller
							name="discount"
							control={control}
							render={({ field }) => (
								<NumberInput
									label="Discount"
									placeholder="Enter discount"
									min={0}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={4}>
						<Controller
							name="amountDue"
							control={control}
							render={({ field }) => (
								<NumberInput
									label="Amount Due"
									placeholder="Amount due"
									min={0}
									{...field}
									disabled
								/>
							)}
						/>
					</Grid.Col>
				</Grid>

				<Grid>
					<Grid.Col span={6}>
						<Controller
							name="amountPaid"
							control={control}
							render={({ field }) => (
								<NumberInput
									label="Amount Paid"
									placeholder="Enter amount paid"
									min={0}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="debit"
							control={control}
							render={({ field }) => (
								<NumberInput
									label="Debit"
									placeholder="Enter debit"
									min={0}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
				</Grid>

				<Controller
					name="notes"
					control={control}
					render={({ field }) => (
						<Textarea
							label="Notes"
							placeholder="Enter notes"
							{...field}
							value={field.value || ''}
						/>
					)}
				/>

				<Group>
					<Controller
						name="autoPrintInvoice"
						control={control}
						render={({ field }) => (
							<Checkbox
								label="Auto Print Invoice"
								checked={field.value || false}
								onChange={(event) => field.onChange(event.currentTarget.checked)}
							/>
						)}
					/>
					<Controller
						name="printBatchNumber"
						control={control}
						render={({ field }) => (
							<Checkbox
								label="Print Batch Number"
								checked={field.value || false}
								onChange={(event) => field.onChange(event.currentTarget.checked)}
							/>
						)}
					/>
				</Group>

				<Button type="submit">Save Invoice</Button>
			</Stack>
		</form>
	);
}

