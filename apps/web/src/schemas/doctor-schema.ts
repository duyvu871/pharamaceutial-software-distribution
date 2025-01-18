import { z } from "zod";

export type DoctorSchema = {
	id: string;
	doctor_id: string;
	email?: string;
	status: number;
	chuyen_khoa: string;
	dia_chi: string;
	sdt: string;
	ghi_chu?: string;
	is_active: boolean;
	is_deleted: boolean;
	loai_so_quy: number;
	noi_cong_tac: string;
	ten_bac_si: string;
	ten_slug: string;
	trinh_do: string;

	created_at: string;
	updated_at: string;
	deleted_at?: string;
}

export const doctorCreationSchema = z.object({
	id: z.string().optional(),
	doctor_id: z.string().optional(),
	email: z.string({
		message: 'Email không hợp lệ'
	}).optional(),
	status: z.number().optional(),
	chuyen_khoa: z.string({
		message: 'Chuyên khoa không hợp lệ'
	}),
	dia_chi: z.string({
		message: 'Địa chỉ không hợp lệ'
	}),
	sdt: z.string({
		message: 'Số điện thoại không hợp lệ'
	}).regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Số điện thoại không hợp lệ' }),
	ghi_chu: z.string({
		message: 'Ghi chú không hợp lệ'
	}).optional(),
	loai_so_quy: z.number({
		message: 'Loại số quy không hợp lệ'
	}).optional(),
	noi_cong_tac: z.string(),
	ten_bac_si: z.string(),
	ten_slug: z.string().optional(),
	trinh_do: z.string(),
})

export type DoctorCreationSchema = z.infer<typeof doctorCreationSchema>;
