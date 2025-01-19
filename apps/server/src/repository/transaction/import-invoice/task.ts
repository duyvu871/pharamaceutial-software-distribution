import {ImportProductBody} from 'validations/ImportValidation.ts';
import prisma from 'repository/prisma.ts';
import Forbidden from 'responses/clientErrors/Forbidden.ts';
import { Prisma, PrismaClient, products, product_units } from '@prisma/client';
import { checkUUIDv4 } from 'web/src/utils/uid.ts';

type SuccessImportProduct = {
	productName: string;
	productId: string;
	productLotNumber: string;
	productQuantity: number;
	productImportDate: string;
}

export class ImportInvoiceTask {
	// @Benchmark()
	public static async importInvoices(storeId: string, importInvoice: ImportProductBody) {
		try {
			// Store all successfully imported products
			const successImportProducts = new Set<products>();
			const rawSuccessImportProducts = new Set<ImportProductBody['productData'][number]>();

			// Store all failed imported products
			const importInvoiceCreate = await prisma.$transaction(async (tx) => {

				// Count import invoice
				const importInvoiceCount = await prisma.import_invoices.count({
					where: {
						store_id: storeId
					}
				})
				// Create import invoice
				const createImport = await tx.import_invoices.create({
					data: {
						store_id: storeId,
						provider_id: importInvoice.provider ,
						invoice_no: `NH-${(importInvoiceCount + 1).toString().padStart(6, '0')}`,
						name: importInvoice.name,
						lot_no: `LO-${(importInvoiceCount + 1).toString().padStart(6, '0')}`,
						total_amount: importInvoice.total,
						amount_due: importInvoice.amountDue,
						amount_paid: importInvoice.amountPaid,
						debit: importInvoice.debit,
						notes: importInvoice.notes,
						vat: importInvoice.vat,
						status: 1,
						createdAt: new Date(importInvoice.time),
					},
				});
				// Create new products
				const handleCreateNewProduct = await Promise.all(importInvoice.productData.map(async product => {
					try {
						// Get total product count
						const product_count = await tx.products.count({
							where: {
								store_id: storeId,
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
							no: createImport.lot_no || "",
							is_base: `${product.unit}` === `${product.largerUnit}` ? 1 : 0,
							updated_at: new Date(),
						}

						let productUnit: product_units;

						if (isProductExist?.productUnit && checkUUIDv4(isProductExist?.productUnit)) {
							productUnit = await tx.product_units.upsert({
								where: { id: isProductExist?.productUnit },
								update: { ...productUnitValue },
								create: {
									...productUnitValue,
									store_id: storeId,
									created_at: new Date()
								}
							});
						} else {
							// create product unit
							productUnit = await tx.product_units.create({
								data: {
									...productUnitValue,
									store_id: storeId,
									created_at: new Date()
								}
							});
						}

						// Upsert product
						const upsertProduct = await tx.products.upsert({
							where: { product_id: product.code },
							update: {
								quantity_of_stock: {
									increment: product.quantity
								},
								product_id: product.code || `NH-${(product_count + 1).toString().padStart(6, '0')}`,
								product_name: product.name,
								store_group_id: storeGroupId,
								productUnit: productUnit.id,
								base_unit: product?.unit,
								// default_image: defaultImage,
								// product_type: "",
								manufacturer: product?.manufacturer,
								barcode: product?.barcode,
								register_no: product?.registrationNumber,
								product_no: createImport?.lot_no || "",
								lot_no: createImport?.lot_no || "",
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
								productUnit: productUnit.id,
								base_unit: product.unit,
								quantity_of_stock: product.quantity,
								// default_image: defaultImage,
								product_type: "",
								manufacturer: product.manufacturer,
								barcode: product.barcode,
								register_no: product.registrationNumber,
								product_no: createImport?.lot_no || "",
								lot_no: createImport?.lot_no || "",
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

						// Add product to success import products (image, ....)
						const updateProductAsset = await Promise.all(
							product.images.map(async (image) => {
								return tx.product_assets.update({
									where: { id: image },
									data: { product_id: upsertProduct.id, },
									include: {
										asset: true
									}
								})
							})
						);

						// Get default image for product, if product has images
						// then set the first image as default image
						let defaultImage: string | undefined;
						if (product.images.length > 0) {
							defaultImage = updateProductAsset[0]?.asset?.url
						}

						// Check if product has default image and product has no default image
						if (defaultImage && !upsertProduct.default_image) {
							// Update default image for product
							await tx.products.update({
								where: { id: upsertProduct.id },
								data: { default_image: defaultImage }
							})
						}

						// Add product to success import products
						successImportProducts.add({
							...upsertProduct,
							quantity_of_stock: product.quantity
						});
						// Add product to raw success import products
						rawSuccessImportProducts.add(product);

						return {
							product: {
								...upsertProduct,
								quantity_of_stock: product.quantity
							}
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

				// Create import invoice product from history and additional data
				const arrayImportProduct = [...rawSuccessImportProducts];
				const importInvoiceProductCreate = await Promise.all([...successImportProducts].map(async (state, index) => {
					return tx.import_invoice_product.create({
						data: {
							import_invoice: createImport.id,
							product_id: state.id,
							quantity: state.quantity_of_stock,
							total: state.original_price * state.quantity_of_stock,
							price: state.original_price,
							barcode: state.barcode,
							manufacturer: arrayImportProduct[index].manufacturer,
							ingredients: arrayImportProduct[index].ingredients,
							packaging: arrayImportProduct[index].packaging,
							active_ingredient: arrayImportProduct[index].activeIngredient,
							content: arrayImportProduct[index].content,
							lot_no: createImport.lot_no,
							expired_date: new Date(arrayImportProduct[index].expiryDate),
							import_date: new Date(arrayImportProduct[index].importDate),
							note: arrayImportProduct[index].note,
							register_no: arrayImportProduct[index].registrationNumber,
							type: arrayImportProduct[index].type,
							larger_unit: arrayImportProduct[index].largerUnit,
							larger_unit_value: parseInt(arrayImportProduct[index].largerUnitValue, 10) || 1,
							smaller_unit: arrayImportProduct[index].unit,
							smaller_unit_value: 1,

							createdAt: new Date(),
							updatedAt: new Date(),
						}
					});
				}));

				return createImport;
			})

			return {
				...importInvoiceCreate,
				products: [...successImportProducts]
			};
		} catch (error) {
			console.error('Error creating import product', error);
			throw error; // Re-throw error to be handled by the caller
		}
	}
}