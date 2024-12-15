import { z } from 'zod';
import { phoneRegex } from 'utils/regex';

export class BranchValidation {
	public static createBranchBody = z.object({

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

	public static getBranchesQuery = z.object({
		branch_id: z.string({
			invalid_type_error: 'ID chi nhánh không hợp lệ',
			required_error: 'ID chi nhánh không được để trống'
		})
	});

	public static branchIdParam = z.object({
		branchId: z.string({
			invalid_type_error: 'ID chi nhán không hợp lệ',
			required_error: 'ID chi nhán không được để trống'
		})
	})
}

export type CreateBranchBody = z.infer<typeof BranchValidation.createBranchBody>;
export type GetBranchesQuery = z.infer<typeof BranchValidation.getBranchesQuery>;
export type BranchIdParam = z.infer<typeof BranchValidation.branchIdParam>;