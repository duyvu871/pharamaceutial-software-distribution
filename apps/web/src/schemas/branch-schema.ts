import { z } from "zod"
import { phoneRegex } from '@util/validator.ts';

export interface Branch {
	branch_id: string
	branch_name: string
	address: string
	phone_number: string
	branch_status: string
	owner_id: string
	createdAt: string
	updatedAt: string
}

export const branchSchema = z.object({
	branch_id: z.string(),
	branch_name: z.string(),
	address: z.string(),
	phone_number: z.string(),
	branch_status: z.enum(['active', 'inactive']),
	owner_id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type BranchType = z.infer<typeof branchSchema>;

export const createBranchSchema = z.object({
	branch_name: z.string({
		invalid_type_error: 'Tên chi nhánh không hợp lệ',
		required_error: 'Tên chi nhánh không được để trống'
	})
		.min(3, 'Tên chi nhánh phải có ít nhất 3 ký tự')
		.max(255, 'Tên chi nhánh không được quá 255 ký tự'),
	address: z.string({
		invalid_type_error: 'Địa chỉ không hợp lệ',
		required_error: 'Địa chỉ không được để trống'
	})
		.min(3, 'Địa chỉ phải có ít nhất 3 ký tự')
		.max(255, 'Địa chỉ không được quá 255 ký tự'),
	phone_number: z.string({
		invalid_type_error: 'Số điện thoại không hợp lệ',
		required_error: 'Số điện thoại không được để trống'
	})
		.min(10, 'Số điện thoại phải có ít nhất 10 ký tự')
		.max(12, 'Số điện thoại không được quá 12 ký tự')
		.regex(phoneRegex, 'Số điện thoại không hợp lệ'),
	branch_status: z.enum(['active', 'inactive'], {
		invalid_type_error: 'Trạng thái chi nhánh không hợp lệ',
		required_error: 'Trạng thái chi nhánh không được để trống'
	}),
});

export type CreateBranchType = z.infer<typeof createBranchSchema>;

export type CreatedBranchResponse = {
	branch_id: string; // UUID
	branch_name: string; // Name of the branch
	address: string; // Physical address of the branch
	phone_number: string; // Contact number of the branch
	branch_status: 'active' | 'inactive'; // Status of the branch
	owner_id: string; // UUID of the owner of the branch

	createdAt: Date | null;
	updatedAt: Date;
}