import { validateBody, validateParams, validateQuery } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { Router } from 'express';
import { PaginationValidation } from 'validations/Pagination.ts';
import DoctorController from 'controllers/DoctorController.ts';
import { DoctorValidation } from 'validations/Doctor.ts';

export const doctorRoute = Router();

doctorRoute.route('/doctor/:branchId').get(
	...authChain,
	validateParams(PaginationValidation.paginationQueryV2),
	DoctorController.getDoctors
);

doctorRoute.route('/doctor/:branchId').post(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateBody(DoctorValidation.doctorCreation),
	DoctorController.upsertDoctor
)