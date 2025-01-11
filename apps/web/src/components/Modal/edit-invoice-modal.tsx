// import React from 'react';
// import { Modal, TextInput, NumberInput, Checkbox, Textarea, Button, Group, Stack } from '@mantine/core';
// import { DatePicker, TimeInput } from '@mantine/dates';
// import { useForm } from '@mantine/form';
//
// interface Invoice {
// 	id: string;
// 	saleDate: Date;
// 	saleTime: string;
// 	customerName: string | null;
// 	totalPrice: number;
// 	discount: number;
// 	amountDue: number;
// 	amountPaid: number;
// 	debit: number;
// 	notes: string | null;
// 	isPrescriptionSale: boolean | null;
// 	autoPrintInvoice: boolean | null;
// 	printBatchNumber: boolean | null;
// }
//
// interface EditInvoiceModalProps {
// 	invoice: Invoice | null;
// 	opened: boolean;
// 	onClose: () => void;
// 	onSave: (invoice: Invoice) => void;
// }
//
// export function EditInvoiceModal({ invoice, opened, onClose, onSave }: EditInvoiceModalProps) {
// 	const form = useForm<Invoice>({
// 		initialValues: invoice || {
// 			id: '',
// 			saleDate: new Date(),
// 			saleTime: '',
// 			customerName: '',
// 			totalPrice: 0,
// 			discount: 0,
// 			amountDue: 0,
// 			amountPaid: 0,
// 			debit: 0,
// 			notes: '',
// 			isPrescriptionSale: false,
// 			autoPrintInvoice: false,
// 			printBatchNumber: false,
// 		},
// 	});
//
// 	const handleSubmit = (values: Invoice) => {
// 		onSave(values);
// 		onClose();
// 	};
//
// 	return (
// 		<Modal opened={opened} onClose={onClose} title="Edit Invoice" size="lg">
// 			<form onSubmit={form.onSubmit(handleSubmit)}>
// 				<Stack gap="md">
// 					<Group grow>
// 						<DatePicker
// 							label="Sale Date"
// 							placeholder="Select date"
// 							{...form.getInputProps('saleDate')}
// 						/>
// 						<TimeInput
// 							label="Sale Time"
// 							placeholder="Enter time"
// 							{...form.getInputProps('saleTime')}
// 						/>
// 					</Group>
// 					<TextInput
// 						label="Customer Name"
// 						placeholder="Enter customer name"
// 						{...form.getInputProps('customerName')}
// 					/>
// 					<Group grow>
// 						<NumberInput
// 							label="Total Price"
// 							placeholder="Enter total price"
// 							min={0}
// 							{...form.getInputProps('totalPrice')}
// 						/>
// 						<NumberInput
// 							label="Discount"
// 							placeholder="Enter discount"
// 							min={0}
// 							{...form.getInputProps('discount')}
// 						/>
// 					</Group>
// 					<Group grow>
// 						<NumberInput
// 							label="Amount Due"
// 							placeholder="Enter amount due"
// 							precision={2}
// 							min={0}
// 							{...form.getInputProps('amountDue')}
// 						/>
// 						<NumberInput
// 							label="Amount Paid"
// 							placeholder="Enter amount paid"
// 							precision={2}
// 							min={0}
// 							{...form.getInputProps('amountPaid')}
// 						/>
// 					</Group>
// 					<NumberInput
// 						label="Debit"
// 						placeholder="Enter debit"
// 						precision={2}
// 						min={0}
// 						{...form.getInputProps('debit')}
// 					/>
// 					<Textarea
// 						label="Notes"
// 						placeholder="Enter notes"
// 						{...form.getInputProps('notes')}
// 					/>
// 					<Group>
// 						<Checkbox
// 							label="Prescription Sale"
// 							{...form.getInputProps('isPrescriptionSale', { type: 'checkbox' })}
// 						/>
// 						<Checkbox
// 							label="Auto Print Invoice"
// 							{...form.getInputProps('autoPrintInvoice', { type: 'checkbox' })}
// 						/>
// 						<Checkbox
// 							label="Print Batch Number"
// 							{...form.getInputProps('printBatchNumber', { type: 'checkbox' })}
// 						/>
// 					</Group>
// 					<Group position="right" mt="md">
// 						<Button type="submit">Save Changes</Button>
// 					</Group>
// 				</Stack>
// 			</form>
// 		</Modal>
// 	);
// }
//
