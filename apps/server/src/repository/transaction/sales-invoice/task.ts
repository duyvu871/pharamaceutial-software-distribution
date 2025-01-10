
import prisma from 'repository/prisma.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';
import { Prisma } from '@repo/orm';

interface InvoiceCreateInput {
	branchId: string;
	saleDate: string;
	saleTime: string;
	customerName?: string;
	customerId?: string;
	priceList?: string;
	isPrescriptionSale?: boolean;
	vat: number;
	totalPrice: number;
	discount?: number;
	amountDue: number;
	amountPaid?: number;
	debit?: number;
	notes?: string;
	autoPrintInvoice?: boolean;
	printBatchNumber?: boolean;
	point?: {
		used: number;
		pointValue: number;
	};
	// userType?: 'user' | 'membership';
	// userId?: string;
	user: {
		id: string;
		type: 'user' | 'membership';
	};
	items: {
		id: string;
		productName: string;
		quantity: number;
		price: number;
		total: number;
		unit: string;
		note?: string;
	}[];
	otherCharges?: {
		name: string;
		value: number;
	}[];
}
export class SalesInvoiceTask {
	public static async createInvoiceWithStockUpdate(invoiceData: InvoiceCreateInput) {
		try {
			const invoice = await prisma.$transaction(async (tx) => {
				// Update points
				if (invoiceData.customerId && invoiceData.point) {
					// Get store
					const store = await tx.stores.findFirst({
						where: { branch_id: invoiceData.branchId },
						select: {id: true}
					});
					if (!store) {
						throw new BadRequest("store_not_found", "Không tìm thấy cửa hàng", `Không tìm thấy cửa hàng với id ${invoiceData.branchId}`);
					}
					// Get store reward point
					const store_reward_point = await tx.store_reward_point.findFirst({
						where: { store_id: store.id }
					});
					if (!store_reward_point) {
						throw new BadRequest("store_reward_point_not_found", "Không tìm thấy cài đặt điểm thưởng", `Không tìm thấy cài đặt điểm thưởng cho cửa hàng ${store.id}`);
					}
					// find consumer points
					const consumer_points = await tx.points.findFirst({
						where: {
							consumerId: invoiceData.customerId,
						}
					});

					if (consumer_points) {
						// Calculate new points if used
						let new_points = consumer_points.totalPoints - invoiceData.point.used;

						if (new_points < 0) {
							throw new BadRequest(
								"no_enough_points",
								"Không đủ điểm",
								`Không đủ điểm cho khách hàng ${invoiceData.customerName}`);
						}

						// Update consumer points
						const consumer_stats: Partial<Prisma.consumersUpdateInput> = {}

						if (invoiceData.debit && invoiceData.debit < 0) {
							consumer_stats.debit = {
								increment: Math.abs(invoiceData.debit)
							};
						}

						// if (invoiceData.amountPaid && invoiceData.amountPaid > 0) {
						// 	consumer_stats.debit = {
						// 		increment: invoiceData.amountPaid
						// 	};
						// }

						// update consumer stats
						if (Object.keys(consumer_stats).length > 0) {
							await tx.consumers.update({
								where: {
									id: invoiceData.customerId
								},
								data: consumer_stats
							});
						}

						/*
						TODO:
						 In here we just implement the fucking simple logic to calculate point reward for customer
						 The business logic will be implemented in the future
						 */

						// Calculate new points if earned
						const point_resolved = Math.floor(invoiceData.totalPrice / store_reward_point.convert_rate);
						// Calculate remaining amount after resolved
						const amount_resolved_remain = Math.floor(invoiceData.totalPrice % store_reward_point.point_value);

						const point_transaction = await tx.point_transactions.findFirst({
							where: {
								pointId: consumer_points.id,
							},
							select: {
								id: true,
								amount: true
							}
						});
						const point_transaction_amount = point_transaction?.amount || 0;
						let new_point_transaction_amount = point_transaction_amount;

						// Update point transaction
						if (point_resolved > 0) {
							new_points += point_resolved;
						}
						// Update point transaction
						if ((point_transaction_amount + amount_resolved_remain) >= store_reward_point.point_value) {
							// Calculate new points if earned
							new_points += (point_transaction_amount + amount_resolved_remain) / store_reward_point.point_value;
							// Calculate new point transaction amount
							new_point_transaction_amount = (point_transaction_amount + amount_resolved_remain) % store_reward_point.point_value;

							// Upsert point transaction
							await tx.point_transactions.upsert({
								where: {
									id: point_transaction?.id
								},
								update: {
									amount: new_point_transaction_amount
								},
								create:{
									amount: new_point_transaction_amount,
									pointId: consumer_points.id,
									type: 'reward'
								}
							});
						}

						// Update consumer points
						await tx.points.update({
							where: {
								id: consumer_points.id
							},
							data: {
								totalPoints: new_points
							}
						});
					} else {
						// Create consumer points and point transaction if not exists
						await tx.points.create({
							data: {
								consumerId: invoiceData.customerId,
								totalPoints: 0,
								pointTransactions: {
									create: {
										amount: invoiceData.totalPrice,
										type: 'reward'
									}
								}
							},
						});
					}
				}

				//  Create invoice
				const createdInvoice = await tx.invoices.create({
					data: {
						branchId: invoiceData.branchId,
						saleDate: invoiceData.saleDate,
						saleTime: invoiceData.saleTime,
						customerName: invoiceData.customerName,
						customerId: invoiceData.customerId,
						priceList: invoiceData.priceList,
						isPrescriptionSale: invoiceData.isPrescriptionSale,
						// vat: invoiceData.vat,
						vat: invoiceData.vat || 0,
						totalPrice: invoiceData.totalPrice,
						discount: invoiceData.discount,
						amountDue: invoiceData.amountDue,
						amountPaid: invoiceData.amountPaid,
						debit: invoiceData.debit,
						notes: invoiceData.notes,
						autoPrintInvoice: invoiceData.autoPrintInvoice,
						printBatchNumber: invoiceData.printBatchNumber,
						userType: invoiceData.user.type,
						userId: invoiceData.user.id,

						items: {
							create: invoiceData.items.map(item => ({
								productName: item.productName,
								quantity: item.quantity,
								price: item.price,
								total: item.total,
								unit: item.unit,
								productId: item.id,
								note: item.note
							})),
						},
						otherCharges: {
							create: invoiceData.otherCharges?.map(charge => ({
								name: charge.name,
								value: charge.value
							}))
						}
					},
				});

				console.log(`Created invoice ${createdInvoice.id}`);

				for (const item of invoiceData.items) {
					if(item.id) {
						const product = await tx.products.findUniqueOrThrow({
							where: { id: item.id },
							select: {
								quantity_of_stock: true
							}
						});

						if(product) {
							const newQuantity = product.quantity_of_stock - item.quantity;

							if(newQuantity < 0) {
								throw new BadRequest(
									"no_enough_quantity",
									"Không đủ hàng trong kho",
									`Không đủ hàng trong kho cho sản phẩm ${item.productName}`);
							}
							await tx.products.update({
								where: { id: item.id },
								data: {
									quantity_of_stock: newQuantity,
								},
							});
							console.log(`Updated stock for product ${item.productName} to ${newQuantity}`);
						}
					}
				}

				return createdInvoice;
			})

			return invoice;

		} catch (error) {
			console.error('Error creating invoice and updating stock:', error);
			throw error; // Re-throw error to be handled by the caller
		}
	}
}