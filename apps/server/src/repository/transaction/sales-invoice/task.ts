
import prisma from 'repository/prisma.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';

interface InvoiceCreateInput {
	branchId: string;
	saleDate: string;
	saleTime: string;
	customerName?: string;
	customerId?: string;
	priceList?: string;
	isPrescriptionSale?: boolean;
	totalPrice: number;
	discount?: number;
	amountDue: number;
	amountPaid?: number;
	debit?: number;
	notes?: string;
	autoPrintInvoice?: boolean;
	printBatchNumber?: boolean;
	userType?: 'user' | 'membership';
	userId?: string;
	items: {
		productId?: string;
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
					totalPrice: invoiceData.totalPrice,
					discount: invoiceData.discount,
					amountDue: invoiceData.amountDue,
					amountPaid: invoiceData.amountPaid,
					debit: invoiceData.debit,
					notes: invoiceData.notes,
					autoPrintInvoice: invoiceData.autoPrintInvoice,
					printBatchNumber: invoiceData.printBatchNumber,
					userType: invoiceData.userType,
					userId: invoiceData.userId,

					items: {
						create: invoiceData.items.map(item => ({
							productName: item.productName,
							quantity: item.quantity,
							price: item.price,
							total: item.total,
							unit: item.unit,
							productId: item.productId,
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
				if(item.productId) {
					const product = await tx.products.findUniqueOrThrow({
						where: { id: item.productId },
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
							where: { id: item.productId },
							data: {
								quantity_of_stock: newQuantity,
							},
						});
						console.log(`Updated stock for product ${item.productName} to ${newQuantity}`);
					}
				}

			}
			return createdInvoice;
		});

		return invoice;

	} catch (error) {
		console.error('Error creating invoice and updating stock:', error);
		throw error; // Re-throw error to be handled by the caller
	}
}
}