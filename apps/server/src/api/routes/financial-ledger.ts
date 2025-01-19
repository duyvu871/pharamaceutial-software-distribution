import { validateBody, validateParams, validateQuery } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { Router } from 'express';
import { PaginationValidation } from 'validations/Pagination.ts';
import DoctorController from 'controllers/DoctorController.ts';
import { DoctorValidation } from 'validations/Doctor.ts';
import { FinancialLedgerController } from 'controllers/FinancialLedgerController.ts';
import { FinancialLedgerValidation } from 'validations/FinancialLedger.ts';

export const financialLedger = Router();

financialLedger.route('/financial-ledger/:branchId').get(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateQuery(PaginationValidation.paginationQueryV2),
	FinancialLedgerController.getFinancialLedgers
);

financialLedger.route('/financial-ledger/:branchId').post(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateBody(FinancialLedgerValidation.creationFinancialLedger),
	FinancialLedgerController.upsertFinancialLedger
)