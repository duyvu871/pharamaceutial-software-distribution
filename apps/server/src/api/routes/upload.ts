import { Router } from "express";
import { StoreController } from 'controllers/StoreController.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { validateParams, validateQuery } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';
import { UploadController } from 'controllers/UploadController.ts';
import { UploadValidation } from 'validations/Upload.ts';
import uploadMiddleware from 'server/configs/upload.ts';
import upload from "server/configs/upload.ts";

export const uploadRouter = Router();

uploadRouter.route("/upload-image/:branchId").post(
	uploadMiddleware(
		{ mimetype: /^image\// },
		{
			fileSize: 1024 * 1024 * 20, // 10MB file size limit
		}).single('image'),
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateQuery(UploadValidation.typeQuery),
	UploadController.uploadImage
);
