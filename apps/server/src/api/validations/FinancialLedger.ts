import { z } from "zod";

export class FinancialLedgerValidation {
	public static creationFinancialLedger = z.object({
		id: z.string().uuid().optional(),
		soQuyID: z.string().optional(),
		ten_nguoi_nop_nhan: z.string(),
		loai: z.number().int(),
		ngay_thu_chi: z.string().datetime(),
		loai_thu_chi: z.number().int(), // 0: thu, 1: chi
		gia_tri: z.number(),
		phuong_thuc_thanh_toan: z.number().int().default(0), // 0: tiền mặt, 1: chuyển khoản
		ghi_chu: z.string().nullable(),
	});
}

export type CreationFinancialLedger = z.infer<typeof FinancialLedgerValidation.creationFinancialLedger>;