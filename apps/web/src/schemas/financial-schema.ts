import { z } from 'zod';
import { FinancalLedgerType } from '@type/enum/financal.ts';

export type FinancialLedger = {
	id: string;
	soQuyID: string;
	maPhieu: string;
	loai: number;
	loai_chung_tu: number;
	loai_thu_chi: number;
	ten_loai_thu_chi: string;
	loai_nguoi_nop_nhan: number;
	nguoi_nop_nhan_id: number;
	ten_nguoi_nop_nhan: string;
	ngay_thu_chi: Date;
	ghi_chu_he_thong: string | null;
	ton_quy_truoc: number;
	gia_tri: number;
	ton_quy_sau: number;
	trang_thai: string;
	branch_id: string;
	ghi_chu: string | null;
	phuong_thuc_thanh_toan_id: number;
	phieu_lien_quan: number | null;
	tong_tien_phieu_lien_quan: number | null;
	ma_phieu_lien_quan: string | null;
	ten_loai_chung_tu: string | null;
	ten_loai_nguoi_nop_nhan: string | null;
	ten_nha_thuoc: string | null;
	ten_nguoi_tao: string | null;
	user_id: string;
	user_type: string;
	phuong_thuc_thanh_toan: number;
	createdAt: Date;
	updatedAt: Date;
};


export const financialLedgerSchema = z.object({
	id: z.string().uuid(),
	soQuyID: z.string(),
	maPhieu: z.string(),
	loai: z.number().int(),
	loai_chung_tu: z.number().int(),
	loai_thu_chi: z.number().int(),
	ten_loai_thu_chi: z.string(),
	loai_nguoi_nop_nhan: z.number().int(),
	nguoi_nop_nhan_id: z.number().int(),
	ten_nguoi_nop_nhan: z.string(),
	ngay_thu_chi: z.date(),
	ghi_chu_he_thong: z.string().nullable(),
	ton_quy_truoc: z.number(),
	gia_tri: z.number(),
	ton_quy_sau: z.number(),
	trang_thai: z.string(),
	branch_id: z.string().uuid(),
	ghi_chu: z.string().nullable(),
	phuong_thuc_thanh_toan_id: z.number().int(),
	phieu_lien_quan: z.number().int().nullable(),
	tong_tien_phieu_lien_quan: z.number().nullable(),
	ma_phieu_lien_quan: z.string().nullable(),
	ten_loai_chung_tu: z.string().nullable(),
	ten_loai_nguoi_nop_nhan: z.string().nullable(),
	ten_nha_thuoc: z.string().nullable(),
	ten_nguoi_tao: z.string().nullable(),
	user_id: z.string(),
	user_type: z.string(),
	phuong_thuc_thanh_toan: z.number().int().default(0),
});

export type FinancialLedgerSchema = z.infer<typeof financialLedgerSchema>;

// ngay tao
// loai thu
// gia tri
// ptttt
// ghi chu

export const CreationFinancialLedgerSchema = z.object({
	id: z.string().uuid().optional(),
	soQuyID: z.string().optional(),
	maPhieu: z.string().optional(),
	ten_nguoi_nop_nhan: z.string(),
	ngay_thu_chi: z.date(),
	loai: z.number().int(), // 0: thu, 1: chi
	loai_thu_chi: z.number().int(), // 0: thu, 1: chi
	gia_tri: z.number(),
	phuong_thuc_thanh_toan: z.number().int().default(0), // 0: tiền mặt, 1: chuyển khoản
	ghi_chu: z.string().nullable(),
})

export type CreationFinancialLedger = z.infer<typeof CreationFinancialLedgerSchema>;
