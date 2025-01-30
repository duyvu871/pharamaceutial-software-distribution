import { z } from 'zod';
import { phoneRegex } from 'utils/regex';

export class BranchValidation {
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
		}).uuid({
			message: 'ID chi nhán không hợp lệ'
		})
	});

	public static upsertBranchIntegrationBody = z.object({
		integration_id: z.string({
			invalid_type_error: 'ID liên thông không hợp lệ',
			required_error: 'ID liên thông không được để trống'
		}),
		integration_password: z.string({
			invalid_type_error: 'Mật khẩu liên thông không hợp lệ',
			required_error: 'Mật khẩu liên thông không được để trống'
		}),
		integration_account: z.string({
			invalid_type_error: 'Tài khoản liên thông không hợp lệ',
			required_error: 'Tài khoản liên thông không được để trống'
		}),
	});

	public static upsertPaymentBody = z.object({
		payment_account: z.string({
			invalid_type_error: 'Tài khoản thanh toán không hợp lệ',
			required_error: 'Tài khoản thanh toán không được để trống'
		}),
		payment_bank: z.string({
			invalid_type_error: 'Ngân hàng thanh toán không hợp lệ',
			required_error: 'Ngân hàng thanh toán không được để trống'
		}),
		payment_owner: z.string({
			invalid_type_error: 'Chủ tài khoản không hợp lệ',
			required_error: 'Chủ tài khoản không được để trống'
		}),
	});

	public static upsertBranchRewardPointBody = z.object({
		conversionRate: z.number().min(1, 'Tỷ lệ quy đổi phải lớn hơn 0'),
		pointValue: z.number().min(1, 'Giá trị điểm phải lớn hơn 0'),
		applyPoints: z.boolean(),
	});

	public static upsertPharmacyDetailBody = z.object({
		so_dang_ky: z.string({
			message: 'Số đăng ký không hợp lệ'
		}),
		ten_nha_thuoc: z.string({
			message: 'Tên nhà thuốc không hợp lệ'
		}),
		loai_hinh: z.string({
			message: 'Loại hình không hợp lệ'
		}),
		tinh: z.string({
			message: 'Tỉnh không hợp lệ'
		}),
		huyen: z.string({
			message: 'Huyện không hợp lệ'
		}),
		dia_chi: z.string({
			message: 'Địa chỉ không hợp lệ'
		}),
		nguoi_dai_dien: z.string({
			message: 'Người đại diện không hợp lệ'
		}),
		nguoi_chiu_trach_nhiem: z.string({
			message: 'Người chịu trách nhiệm không hợp lệ'
		}),
		nguoi_chiu_trach_nhiem_chuyen_mon: z.string({
			message: 'Người chịu trách nhiệm chuyên môn không hợp lệ'
		}),
		so_chung_chi_hanh_nghe: z.string({
			message: 'Số chứng chỉ hành nghề không hợp lệ'
		}),
	});

	public static createBranchBody = z.object({
		branch_id: z.string().uuid({
			message: 'ID chi nhánh không hợp lệ'
		}).optional(),
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
		user_id: z.string({
			invalid_type_error: 'ID người dùng không hợp lệ',
			required_error: 'ID người dùng không được để trống'
		}).uuid({
			message: 'ID người dùng không hợp lệ'
		}).optional(),
		branch_details: BranchValidation.upsertPharmacyDetailBody.partial().optional(),
		branch_integration: BranchValidation.upsertBranchIntegrationBody.partial().optional(),
	});

}

export type CreateBranchBody = z.infer<typeof BranchValidation.createBranchBody>;
export type GetBranchesQuery = z.infer<typeof BranchValidation.getBranchesQuery>;
export type BranchIdParam = z.infer<typeof BranchValidation.branchIdParam>;
export type UpsertBranchIntegrationBody = z.infer<typeof BranchValidation.upsertBranchIntegrationBody>;
export type UpsertPaymentBody = z.infer<typeof BranchValidation.upsertPaymentBody>;
export type UpsertBranchRewardPointBody = z.infer<typeof BranchValidation.upsertBranchRewardPointBody>;
export type UpsertPharmacyDetailBody = z.infer<typeof BranchValidation.upsertPharmacyDetailBody>;