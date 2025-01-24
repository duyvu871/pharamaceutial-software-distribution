import React from 'react';
import { FormBuilder, FormField } from '@component/Form/form-builder.tsx';
import { z } from 'zod';
import { phoneRegex } from '@util/validator.ts';
import { AdminGettingBranches } from '@schema/branch-schema.ts';

const creationSchema = z.object({
	branch_name: z.string({
		invalid_type_error: 'Tên chi nhánh không hợp lệ',
		required_error: 'Tên chi nhánh không được để trống'
	})
		.min(3, 'Tên chi nhánh phải có ít nhất 3 ký tự'),
	address: z.string({
		invalid_type_error: 'Địa chỉ không hợp lệ',
		required_error: 'Địa chỉ không được để trống'
	}),
	phone_number: z.string({
		invalid_type_error: 'Số điện thoại không hợp lệ',
		required_error: 'Số điện thoại không được để trống'
	})
		.min(10, 'Số điện thoại phải có ít nhất 10 ký tự')
		.max(12, 'Số điện thoại không được quá 12 ký tự')
		.regex(phoneRegex, 'Số điện thoại không hợp lệ'),
	branch_status: z.enum(['inactive', 'active']),
})

type FormFieldCreation = z.infer<typeof creationSchema>;

type FormProps = {
	onSubmit?: (value: AdminGettingBranches) => void;
	defaultValue?: AdminGettingBranches;
}

function AdminBranchUpsertForm({ defaultValue, onSubmit }: FormProps) {
	const fields: FormField<typeof creationSchema>[] = [
		{
			type: 'text',
			name: 'branch_name',
			label: 'Tên chi nhánh',
			placeholder: 'Nhập tên chi nhánh',
			defaultValue: defaultValue?.branch_name,
		},
		{
			type: 'text',
			name: 'address',
			label: 'Địa chỉ',
			placeholder: 'Nhập địa chỉ',
			defaultValue: defaultValue?.address,
		},
		{
			type: 'text',
			name: 'phone_number',
			label: 'Số điện thoại',
			placeholder: 'Nhập số điện thoại',
			defaultValue: defaultValue?.phone_number,
		},
		{
			type: 'select',
			name: 'branch_status',
			label: 'Trạng thái',
			defaultValue: defaultValue?.branch_status,
			options: [
				{
					label: 'Ngưng hoạt động',
					value: 'inactive'
				},
				{
					label: 'Hoạt động',
					value: 'active'
				}
			]
		},
	]

	return (
		<FormBuilder
			gap={0}
			color={"var(--main-color)"}
			fields={fields}
			schema={creationSchema}
			submitText={defaultValue ? 'Cập nhật' : 'Tạo mới'}
			cancelText={'Hủy'}
			onSubmit={(value) => {
				onSubmit && onSubmit({
					...value,
					branch_id: defaultValue?.branch_id,
				});
				console.log('Submit', {
					...defaultValue,
					...value,
				});
			}}
		/>
	);
}

export default AdminBranchUpsertForm;