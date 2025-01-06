
import { atom } from 'jotai';
import { ProductFormData } from '@schema/product-schema.ts';
import { v4 as uuidV4, v1 as uuid } from 'uuid';
import { generateTimeBasedId } from '@util/uid.ts';
import { InvoiceType } from '@schema/invoice-schema.ts';
import { InvoiceState } from '@store/state/overview/invoice.ts';

export type ImportProductState = {
	id: string;
	name: string;
	time: Date;
	vat: number;
	total: number;
	debit: number;
	amountDue: number;
	amountPaid: number;
	notes: string;
	provider: string;
	productData: ProductFormData[];
};

const defaultProductData: ProductFormData = {
	name: '',
	type: 'thuoc',
	code: '',
	registrationNumber: '',
	purchasePrice: 0,
	sellingPrice: 0,
	manufacturer: '',
	usage: '',
	ingredients: '',
	packaging: '',
	activeIngredient: '',
	content: '',
	lotNumber: '',
	expiryDate: new Date(),
	quantity: 0,
	importDate: new Date(),
	// vat: '0',
	unit: 'vien',
	largerUnit: '10',
	largerUnitValue: '',
	notes: '',
	images: [],
}

const defaultImportProductState: ImportProductState = {
	id: generateTimeBasedId(),
	name: 'Nhập Hàng 1',
	time: new Date(),
	vat: 0,
	total: 0,
	debit: 0,
	amountDue: 0,
	amountPaid: 0,
	notes: '',
	provider: '',
	productData: [],
};

export const importProductAtom = atom<Record<string, ImportProductState>>({
	[defaultImportProductState.id]: defaultImportProductState,
});

export const importProductHistoryAtom = atom<ImportProductState[]>([]);
export const importProductActiveTabAtom = atom<string>(defaultImportProductState.id);

export const importProductActionAtom = atom(
	(get) => get(importProductAtom),
	(
		get,
		set,
		action:
			| { type: 'add'; name: string }
			| { type: 'remove'; id: string }
			| { type: 'update'; invoiceId: string; state: Partial<ImportProductState> }
			| { type: 'add-product'; invoiceId: string, product: ProductFormData}
			| { type: 'remove-product'; invoiceId: string; productIndex: number}
			| { type: 'update-product'; invoiceId: string; index: number; state: Partial<ProductFormData> }
			| { type: 'clear' }
	) => {
		const currentImportProduct = get(importProductAtom);
		console.log('type', action.type);
		if (action.type === 'add') {
			const { name } = action;
			const productExists = currentImportProduct[name];
			if (productExists) {
				return;
			}

			const newTab: ImportProductState = {
				id: generateTimeBasedId(),
				name,
				time: new Date(),
				vat: 0,
				total: 0,
				debit: 0,
				amountDue: 0,
				amountPaid: 0,
				notes: '',
				provider: '',
				productData: [], // Initialize with an array
			};

			set(importProductAtom, {
				...currentImportProduct,
				[newTab.id]: newTab,
			});

			return newTab.id;
		}
		else if (action.type === 'remove') {
			const { id } = action;
			const { [id]: removed, ...rest } = currentImportProduct;
			// const newImportPrice = calculateImportProductPrice(removed, { type: 'update', invoice: state });

			set(importProductHistoryAtom, [
				...get(importProductHistoryAtom),
				{
					id: removed.id,
					name: removed.name,
					time: removed.time,
					vat: removed.vat,
					total: removed.total,
					debit: removed.debit,
					amountDue: removed.amountDue,
					amountPaid: removed.amountPaid,
					notes: removed.notes,
					provider: removed.provider,
					productData: removed.productData,
				},
			])
			set(importProductAtom, rest);
		}
		else if (action.type === 'update') {
			const { invoiceId, state } = action;

			const importProduct = currentImportProduct[invoiceId];

			if (!importProduct) {
				return;
			}

			const newImportPrice = calculateImportProductPrice(importProduct, { type: 'update', invoice: state });

			const newProductData = state.productData || importProduct.productData;

			set(importProductAtom, {
				...currentImportProduct,
				[invoiceId]: {
					...importProduct,
					...newImportPrice,
					productData: newProductData,
				},
			});

		}
		else if (action.type === 'add-product') {
			const { invoiceId, product } = action;

			if (!currentImportProduct[invoiceId]) {
				return;
			}

			const importProduct = currentImportProduct[invoiceId];

			const isProductExists = importProduct.productData.some((item) => item.name === product.name);

			const newProductData =
				isProductExists
					? importProduct.productData
					: [...importProduct.productData, product];

			const newImportPrice = calculateImportProductPrice(importProduct, { type: 'add-product', item: product });

			console.log('newImportPrice', newImportPrice);

			set(importProductAtom, {
				...currentImportProduct,
				[invoiceId]: {
					...importProduct,
					...newImportPrice,
					productData: newProductData//[...currentImportProduct[id].productData, product],
				},
			});
		}
		else if (action.type === 'remove-product') {
			const { invoiceId,  productIndex } = action;

			const importProduct = currentImportProduct[invoiceId];


			if (!importProduct) {
				return;
			}


			const updatedProductData = importProduct.productData.filter((_, index) => index !== productIndex);

			const newImportPrice = calculateImportProductPrice(importProduct, { type: 'remove-product', itemId: productIndex });

			set(importProductAtom, {
				...currentImportProduct,
				[invoiceId]: {
					...importProduct,
					...newImportPrice,
					productData: updatedProductData,
				},
			});
		}
		else if (action.type === 'update-product') {
			const { invoiceId, index, state } = action;

			const importProduct = currentImportProduct[invoiceId];

			if (!importProduct) {
				return;
			}

			const newImportPrice = calculateImportProductPrice(
				importProduct, { type: 'update-product', itemId: index, item: state }
			);
			const newProductData = importProduct.productData.map((item, i) => i === index ? { ...item, ...state } : item);

			console.log('newImportPrice', newImportPrice, state);

			set(importProductAtom, {
				...currentImportProduct,
				[invoiceId]: {
					...importProduct,
					...newImportPrice,
					productData: newProductData,
				},
			});
		}
		else if (action.type === 'clear') {
			set(importProductAtom, {});
		}
	}
);

export const importProductActiveTabActionAtom = atom(
	(get) => get(importProductActiveTabAtom),
	(
		get,
		set,
		action:
			| { type: 'set'; id: string }
			| { type: 'next' }
			| { type: 'prev' }
			| { type: 'clear' }
	) => {
		if (action.type === 'set') {
			const { id } = action;
			set(importProductActiveTabAtom, id);
		} else if (action.type === 'next' || action.type === 'prev') {
			const currentImportProduct = get(importProductAtom);
			const tabs = Object.keys(currentImportProduct);
			const currentTab = get(importProductActiveTabAtom);
			const currentIndex = tabs.findIndex((id) => id === currentTab);
			if (currentIndex === 0 && action.type === 'prev') {
				return;
			}
			const nextIndex = currentIndex + (action.type === 'next' ? 1 : -1);
			if (nextIndex >= tabs.length) {
				return;
			}
			set(importProductActiveTabAtom, tabs[nextIndex]);
		}
		else if (action.type === 'clear') {
			set(importProductActiveTabAtom, '');
		}
	}
);

export const calculateImportProductPrice = (
	importProduct: ImportProductState,
	action:
		| { type: 'add-product'; item: ImportProductState['productData'][number] }
		| { type: 'update-product'; itemId: number; item: Partial<ImportProductState['productData'][number]> }
		| { type: 'update'; invoice: Partial<ImportProductState> }
		| { type: 'remove-product'; itemId: number }
): {
	total: number;
	debit: number;
	amountDue: number;
	amountPaid: number;
} => {

	let { total, debit, amountDue, amountPaid, vat, productData } = importProduct;

	switch (action.type) {
		case 'add-product':
			productData = [...productData, action.item];
			break;
		case 'update-product':
			productData = productData.map((i, index) =>
				index === action.itemId
					? {
						...i,
						...action.item,
						total: (action.item.quantity || i.quantity) * (action.item.purchasePrice || i.purchasePrice)
					}
					: i);
			break;
		case 'update':
			// discount = action.invoice.discount ?? discount;
			// otherCharges = action.invoice.otherCharges ?? otherCharges;
			amountPaid = action.invoice.amountPaid ?? amountPaid;
			debit = action.invoice.debit ?? debit;
			productData = action.invoice.productData ?? productData;
			break;
		case 'remove-product':
			productData = productData.filter((i, index) => index !== action.itemId);
			break;
		// case 'update':
		// 	discount = action.state.invoiceData?.discount ?? discount;
		// 	otherCharges = action.state.invoiceData?.otherCharges ?? otherCharges;
		// 	amountPaid = action.state.invoiceData?.amountPaid ?? amountPaid;
		// 	debit = action.state.invoiceData?.debit ?? debit;
		// 	items = action.state.invoiceData?.items ?? items;
		// 	break;
	}

	total =
		productData.reduce((sum, item) => sum + item.purchasePrice*item.quantity , 0);
	amountDue = total + (vat / 100) * total;
	debit = amountPaid - amountDue;

	return {
		total,
		amountDue,
		debit,
		amountPaid,
	};
}
