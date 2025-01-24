import { financial_ledger, Prisma } from '@repo/orm';
import prisma from 'repository/prisma.ts';
import {
	FinancialLedgerPaymentMethod,
	FinancialLedgerStatus,
	FinancialLedgerType,
	FinancialLedgerTypeLabel,
} from 'server/common/enums/model/financial-ledger.ts';

export class FinancialLedgerService {
	public static createFinancialLedger = async (branchId: string, data: Partial<Prisma.financial_ledgerUncheckedCreateInput>, user: {userType: string, id: string}) => {
		try {
			const count = await prisma.financial_ledger.count({
				where: {
					branch_id: branchId,
				},
			});
			return await prisma.financial_ledger.create({
				data: {
					...data,
					maPhieu: "HDTC" + (count + 1).toString().padStart(6, "0"),
					branch_id: branchId,
					soQuyID: "SQ" + (count + 1).toString().padStart(6, "0"),
					loai_chung_tu: 1,
					gia_tri: data.gia_tri || 0,
					ngay_thu_chi: new Date(),
					ten_nguoi_nop_nhan: data.ten_nguoi_nop_nhan || "",
					ten_loai_thu_chi: FinancialLedgerTypeLabel[data.loai_thu_chi || 0],// data.loai_thu_chi === 0 ? "Thu" : "Chi",
					loai_thu_chi: data.loai_thu_chi || FinancialLedgerType.INCOME,
					loai_nguoi_nop_nhan: 1, // 1: nộp
					nguoi_nop_nhan_id: 1, // 1: nộp
					ton_quy_truoc: 0,
					ton_quy_sau: 0,
					trang_thai: data.trang_thai || FinancialLedgerStatus.APPROVED,
					phuong_thuc_thanh_toan_id: data.phuong_thuc_thanh_toan || FinancialLedgerPaymentMethod.CASH,
					user_id: user.id,
					user_type: user.userType,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}