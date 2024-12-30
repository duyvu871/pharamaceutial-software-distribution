
import { atom } from 'jotai';
import { ProductFormData } from '@schema/product-schema.ts';
import { v4 as uuidV4, v1 as uuid } from 'uuid';
import { generateTimeBasedId } from '@util/uid.ts';

export type ImportProductState = {
	id: string;
	name: string;
	time: Date;
	vat?: string;
	productData: ProductFormData[];
};

const defaultProductData: ProductFormData = {
	name: '',
	type: 'thuoc',
	code: 'HH-0000014',
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
	useBefore: '30',
	vat: '0',
	unit: 'vien',
	largerUnit: '10',
	largerUnitValue: '',
	notes: '',
}

const defaultImportProductState: ImportProductState = {
	id: generateTimeBasedId(),
	name: 'Nhập Hàng 1',
	time: new Date(),
	productData: [defaultProductData],
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
			| { type: 'update'; id: string; product: Partial<ProductFormData> , productIndex?: number}
			| { type: 'add-product'; id: string, product: ProductFormData}
			| { type: 'remove-product'; id: string, productIndex: number}
			| { type: 'update-product-state'; id: string; state: Partial<ImportProductState> }
			| { type: 'clear' }
	) => {
		const currentImportProduct = get(importProductAtom);
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
				productData: [defaultProductData], // Initialize with an array
			};

			set(importProductAtom, {
				...currentImportProduct,
				[newTab.id]: newTab,
			});

			return newTab.id;
		} else if (action.type === 'remove') {
			const { id } = action;
			const { [id]: removed, ...rest } = currentImportProduct;
			set(importProductHistoryAtom, [
				...get(importProductHistoryAtom),
				{
					id: removed.id,
					name: removed.name,
					time: removed.time,
					productData: removed.productData,
				},
			])
			set(importProductAtom, rest);
		}
		else if (action.type === 'update') {
			const { id, product, productIndex } = action;

			if (!currentImportProduct[id]) {
				return;
			}

			const updatedProductData = currentImportProduct[id].productData.map((item, index) =>
				index === (productIndex || 0) ? { ...item, ...product } : item
			);

			set(importProductAtom, {
				...currentImportProduct,
				[id]: {
					...currentImportProduct[id],
					productData: updatedProductData,

				},
			});

		}
		else if (action.type === 'add-product') {
			const { id, product } = action;

			if (!currentImportProduct[id]) {
				return;
			}


			set(importProductAtom, {
				...currentImportProduct,
				[id]: {
					...currentImportProduct[id],
					productData: [...currentImportProduct[id].productData, product],

				},
			});
		}
		else if (action.type === 'remove-product') {
			const { id, productIndex } = action;

			if (!currentImportProduct[id]) {
				return;
			}

			const updatedProductData = currentImportProduct[id].productData.filter((_, index) => index !== productIndex);

			set(importProductAtom, {
				...currentImportProduct,
				[id]: {
					...currentImportProduct[id],
					productData: updatedProductData,

				},
			});
		}
		else if (action.type === 'update-product-state') {
			const { id, state } = action;
			if (!currentImportProduct[id]) {
				return;
			}
			set(importProductAtom, {
				...currentImportProduct,
				[id]: {
					...currentImportProduct[id],
					...state
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