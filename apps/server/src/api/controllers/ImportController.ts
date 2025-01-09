import AsyncMiddleware from 'utils/asyncHandler.ts';
import { Request, Response } from 'express';
import { BranchIdParam } from 'validations/Branch.ts';
import { ImportProductBody } from 'validations/ImportValidation.ts';
import { ImportInvoiceTask } from 'repository/transaction/import-invoice/task.ts';
import Success from 'responses/successful/Success.ts';
import prisma from 'repository/prisma.ts';
import Forbidden from 'responses/clientErrors/Forbidden.ts';

export class ImportController {
	public static importProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, ImportProductBody>, res: Response) => {
			try {
				console.log('params: ', req.params);
				console.log('import product: ', req.body);
				const branchId = req.params.branchId;

				const store = await prisma.stores.findFirst({
					select: {
						id: true
					},
					where: {
						branch_id: branchId
					}
				});

				if (!store) {
					throw new Forbidden('store_not_found', 'Kho không tồn tại', 'Kho không tồn tại');
				}

				const store_id = store.id;

				const task = await ImportInvoiceTask.importInvoices(store_id, req.body);
				const response = new Success({
					message: 'Import product successfully',
					// data: task
				});
				response.message('Nhập hàng thành công');

				return res.status(200).send(response).end();
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		}
	);
}