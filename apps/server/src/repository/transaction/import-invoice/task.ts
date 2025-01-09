import { ImportProductBody } from 'validations/ImportValidation.ts';
import prisma from "repository/prisma.ts"
import Forbidden from 'responses/clientErrors/Forbidden.ts';
import { Prisma, PrismaClient, products } from '@prisma/client';

type SuccessImportProduct = {
	productName: string;
	productId: string;
	productLotNumber: string;
	productQuantity: number;
	productImportDate: string;
}

export class ImportInvoiceTask {
	public static async importInvoices(storeId: string, importInvoice: ImportProductBody) {
		try {
			// Store all successfully imported products
			const successImportProducts = new Set<products>();

			// Store all failed imported products
			const importInvoiceCreate = await prisma.$transaction(async (tx) => {

				// Create new products
				const handleCreateNewProduct = await Promise.all(importInvoice.productData.map(async product => {
					try {
						// Get total product count
						const product_count = await tx.products.count({
							where: {
								product_id: { startsWith: "HH", mode: 'insensitive' }
							}
						});

						// Check product exist
						const isProductExist = await tx.products.findFirst({
							where: { product_id: product.code }
						});

						// Find store group
						const storeGroupSelected = await tx.store_group.findFirst({
							where: {
								store_id: storeId,
								group_slug: product.type
							}
						})
						if (!storeGroupSelected) {
							throw new Forbidden('group_not_found', 'Nhóm không tồn tại', 'Nhóm không tồn tại');
						}
						const storeGroupId = storeGroupSelected.id;

						// Update product
						const productUnitValue = {
							name: product?.largerUnit || product.unit,
							value: Number(product.largerUnitValue) || 1,
							no: product.lotNumber,
							is_base: `${product.unit}` === `${product.largerUnit}` ? 1 : 0,
							updated_at: new Date(),
						}

						// Upsert product unit
						const currentProductUnit = await tx.product_units.upsert({
							where: { id: isProductExist?.productUnit || "" },
							update: { ...productUnitValue },
							create: {
								...productUnitValue,
								store_id: storeId,
								created_at: new Date()
							}
						});

						// Upsert product
						const updateProduct = await tx.products.upsert({
							where: { product_id: product.code },
							update: {
								quantity_of_stock: {
									increment: product.quantity
								},
								product_id: product.code || `NH-${(product_count + 1).toString().padStart(6, '0')}`,
								product_name: product.name,
								store_group_id: storeGroupId,
								productUnit: currentProductUnit.id,
								base_unit: product?.unit,
								// product_type: "",
								manufacturer: product?.manufacturer,
								barcode: product?.barcode,
								register_no: product?.registrationNumber,
								product_no: product?.lotNumber,
								lot_no: product?.lotNumber,
								original_price: product?.purchasePrice,
								sell_price: product?.sellingPrice,
								packing: product?.packaging,
								ingredient: product?.ingredients,
								// status: product.status || isProductExist.status,
								updated_at: new Date(),
								import_date: new Date(product.importDate),
								expire_date: new Date(product.expiryDate),
								note: product?.note || isProductExist?.note,
								quantity: JSON.stringify({}),
								using_id: 0 || isProductExist?.using_id,
								avg_original_price: product?.purchasePrice,
							},
							create: {
								store_id: storeId,
								product_id: product.code || `NH-${(product_count + 1).toString().padStart(6, '0')}`,
								product_name: product.name,
								store_group_id: storeGroupId,
								productUnit: currentProductUnit.id,
								base_unit: product.unit,
								quantity_of_stock: product.quantity,
								product_type: "",
								manufacturer: product.manufacturer,
								barcode: product.barcode,
								register_no: product.registrationNumber,
								product_no: product.lotNumber,
								lot_no: product.lotNumber,
								original_price: product.purchasePrice,
								sell_price: product.sellingPrice,
								packing: product.packaging,
								ingredient: product.ingredients,
								min_quantity: 0,
								max_quantity: 100000,
								status: 1,
								created_at: new Date(),
								updated_at: new Date(),
								import_date: new Date(product.importDate),
								expire_date: new Date(product.expiryDate),
								note: product.note,
								quantity: JSON.stringify({}),
								using_id: 0,
								avg_original_price: product.purchasePrice,
							}
						});

						// Add product to success import products
						successImportProducts.add(updateProduct);

						// Add product to success import products (image, ....)
						const updateProductAsset = Promise.all(
							product.images.map(async (image) => {
								await tx.product_assets.update({
									where: { id: image },
									data: { product_id: updateProduct.id, }
								})
							})
						);

						return {
							product: updateProduct
						}
					} catch (error) {
						console.error('Error creating product', error);
						// Return error message and product data
						return ({
							error: error.message,
							// product: product
						})
					}
				}))

				console.log('handleCreateNewProduct', handleCreateNewProduct);

				// Count import invoice
				const importInvoiceCount = await prisma.import_invoices.count()
				// Create import invoice
				const createImport = await tx.import_invoices.create({
					data: {
						store_id: storeId,
						...(importInvoice.provider && { provider: importInvoice.provider }),
						invoice_no: `NH-${(importInvoiceCount + 1).toString().padStart(6, '0')}`,
						name: importInvoice.name,
						total_amount: importInvoice.total,
						amount_due: importInvoice.amountDue,
						amount_paid: importInvoice.amountPaid,
						debit: importInvoice.debit,
						notes: importInvoice.notes,
						vat: importInvoice.vat,
						status: 0,
						createdAt: new Date(importInvoice.time),
					},
				});
				// Create import invoice product from history and additional data
				const importInvoiceProductCreate = Promise.all([...successImportProducts].map(async state => {
					return tx.import_invoice_product.create({
						data: {
							import_invoice: importInvoiceCreate.id,
							product_id: state.id,
							quantity: state.quantity_of_stock,
							total: state.original_price * state.quantity_of_stock,
							price: state.original_price,
							createdAt: new Date(),
							updatedAt: new Date(),
						}
					});
				}));

				return createImport;
			})
		} catch (error) {
			console.error('Error creating import product', error);
			throw error; // Re-throw error to be handled by the caller
		}
	}
}