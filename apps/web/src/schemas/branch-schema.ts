import { z } from "zod"
import { phoneRegex } from '@util/validator';
import { Prisma } from '@prisma/client';

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

export interface IntegrationFormValues {
	integrationCode: string;
	integrationAccount: string;
	integrationPassword: string;
}

export const branchDetailsSchema = z.object({
	so_dang_ky: z.string({
		message: "Số đăng ký không hợp lệ",
	}),
	ten_nha_thuoc: z.string({
		message: "Tên nhà thuốc không hợp lệ",
	}),
	loai_hinh: z.string({
		message: "Loại hình không hợp lệ",
	}),
	tinh: z.string({
		message: "Tỉnh không hợp lệ",
	}),
	huyen: z.string({
		message: "Huyện không hợp lệ",
	}),
	dia_chi: z.string({
		message: "Địa chỉ không hợp lệ",
	}),
	nguoi_dai_dien: z.string({
		message: "Người đại diện không hợp lệ",
	}),
	nguoi_chiu_trach_nhiem: z.string({
		message: "Người chịu trách nhiệm không hợp lệ",
	}),
	nguoi_chiu_trach_nhiem_chuyen_mon: z.string({
		message: "Người chịu trách nhiệm chuyên môn không hợp lệ",
	}),
	so_chung_chi_hanh_nghe: z.string({
		message: "Số chứng chỉ hành nghề không hợp lệ",
	}),
});

export type BranchDetails = z.infer<typeof branchDetailsSchema>;

export const branchIntegrationSchema = z.object({
	integration_id: z.string({
		message: "Mã liên thông không hợp lệ",
	}).optional(),
	integration_password: z.string({
		message: "Mật khẩu liên thông không hợp lệ",
	}).optional(),
	integration_account: z.string({
		message: "Tài khoản liên thông không hợp lệ",
	}).optional(),
});

export type BranchIntegration = z.infer<typeof branchIntegrationSchema>;

export const metaDataSchema = z.object({
	mime: z.string(),
	size: z.number(),
	originalName: z.string(),
	encoding: z.string(),
	destination: z.string(),
});

export const assetSchema = z.object({
	id: z.string().uuid(),
	store_id: z.string().uuid(),
	path: z.string(),
	name: z.string(),
	description: z.string(),
	url: z.string(),
	type: z.string(),
	meta_data: metaDataSchema,
	from: z.string(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const productAssetSchema = z.object({
	id: z.string().uuid(),
	store_id: z.string().uuid(),
	asset_id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	asset: assetSchema,
});

export type ProductAsset = z.infer<typeof productAssetSchema>;

export const storeRewardPointSchema = z.object({
	id: z.string(),
	store_id: z.string(),
	convert_to: z.string(),
	convert_rate: z.number(),
	point_value: z.number(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
	status: z.number(),
	description: z.string().nullable(),
	deleted_at: z.string().nullable(),
	deleted_by: z.string().nullable(),
});

export const storeGroupSchema = z.object({
	id: z.string(),
	store_id: z.string(),
	group_slug: z.string(),
	group_name: z.string(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
	status: z.number(),
	description: z.string().nullable(),
	deleted_at: z.string().nullable(),
	deleted_by: z.string().nullable(),
});

// export const storeAssetSchema = z.object({

export const storeSchema = z.object({
	id: z.string(),
	branch_id: z.string(),
	store_name: z.string(),
	address: z.string(),
	phone: z.string(),
	email: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
	status: z.number(),
	description: z.string().nullable(),
	deleted_at: z.string().nullable(),
	deleted_by: z.string().nullable(),
	store_group: storeGroupSchema,
	store_reward_point: storeRewardPointSchema,
	store_asset: productAssetSchema
});

export const branchSchema = z.object({
	branch_id: z.string(),
	branch_name: z.string(),
	address: z.string(),
	phone_number: z.string(),
	branch_status: z.enum(['inactive', 'active']),//z.string(),
	owner_id: z.string(),
	enabled_points: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	store: storeSchema,
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

// Define Zod schema for form validation
export const paymentSchema = z.object({
	bankName: z.string().min(1, 'Tên ngân hàng là bắt buộc'),
	bankAccount: z.string().min(1, 'Số tài khoản là bắt buộc'),
	bankOwner: z.string().min(1, 'Chủ tài khoản là bắt buộc'),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;

// Define Zod schema for form validation
export const pointSettingsSchema = z.object({
	conversionRate: z.number().min(1, 'Tỷ lệ quy đổi phải lớn hơn 0'),
	pointValue: z.number().min(1, 'Giá trị điểm phải lớn hơn 0'),
	applyPoints: z.boolean(),
});

export type PointSettingsFormValues = z.infer<typeof pointSettingsSchema>;

export type AdminGettingBranches = Prisma.branchesGetPayload<{
	include: {
		users: {
			omit: {
				password: true
			}
		},
		subscriptions: {
			include: {
				branch_plans: true,
			}
		},
		branch_details: true,
		branch_integration: true,
	}
}>;