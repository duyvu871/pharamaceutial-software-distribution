import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
import MembershipSchema from 'server/repository/membership/schema';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import { MembershipAttributes } from 'server/repository/membership/schema';
import { Op } from 'sequelize';
import { BranchIdParam } from 'validations/Branch.ts';
import { CreateMembership } from 'validations/Membership.ts';

export class MembershipController {
	public static getMemberships = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string }>, res: Response) => {
			try {
				const { page = '1', limit = '10', orderBy = 'createdAt:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				const orders = orderBy.split(',').map((order) => order.split(':')) as [string, 'ASC' | 'DESC'][];

				const whereClause: any = {
					branch_id: req.params.branchId
				};
				if (search) {
					whereClause.username = { [Op.like]: `%${search}%` };
				}

				const memberships = await MembershipSchema.findAll({
					where: { ...whereClause },
					limit: parsedLimit,
					offset,
					order: orders,
					attributes: {
						exclude: ['password', 'reset_token']
					}
				});

				const response = new Success(memberships).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching memberships: ${error.message}`);
				throw error;
			}
		}
	);

	public static createMembership = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, CreateMembership>, res: Response) => {
			try {
				const removedUndefined = Object.fromEntries(
					Object.entries(req.body).filter(([_, value]) => value !== undefined),
				) as unknown as MembershipAttributes;
				removedUndefined.branch_id = req.params.branchId;
				removedUndefined.employee_status = 'active';
				const membership = await MembershipSchema.create(removedUndefined);
				const response = new Success(membership).toJson;
				return res.status(201).json(response).end();
			} catch (error: any) {
				console.error(`Error creating membership: ${error.message}`);
				throw error;
			}
		}
	);

	public static updateMembership = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const [updated] = await MembershipSchema.update(req.body, {
					where: { id }
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Membership not found');
				}
				const updatedMembership = await MembershipSchema.findByPk(id);
				const response = new Success(updatedMembership).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error updating membership: ${error.message}`);
				throw error;
			}
		}
	);
}