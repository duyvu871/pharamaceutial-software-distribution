import { z } from 'zod';

export class DoctorValidation {
	public static doctorCreation =  z.object({
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
		}),
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

	public static doctorIdParam = z.object({
		doctorId: z.string(),
	})
}

export type DoctorCreation = z.infer<typeof DoctorValidation.doctorCreation>;
export type DoctorIdParam = z.infer<typeof DoctorValidation.doctorIdParam>;