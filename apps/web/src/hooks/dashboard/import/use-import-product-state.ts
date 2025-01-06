import { useAtom } from 'jotai';
import {
	importProductAtom,
	importProductActionAtom,
	importProductActiveTabAtom,
	importProductActiveTabActionAtom,
	ImportProductState,
} from '@store/state/overview/import-product.ts';
import { ProductFormData } from '@schema/product-schema.ts'; // Đường dẫn đến file chứa các atoms
import { useEffect } from 'react';


interface ImportProductHook {
	importProducts: Record<string, ImportProductState>;
	activeTab: string;
	addProductInvoice: (name: string) => string | undefined;
	removeProduct: (id: string) => void;
	updateProductInvoice: (id: string, state: Partial<ImportProductState>) => void;
	addProductItem: (id: string, product: ProductFormData) => void;
	removeProductItem: (id: string, productIndex: number) => void;
	updateProductState: (id: number, state: Partial<ProductFormData>) => void;
	setTab: (id: string) => void;
	nextTab: () => void;
	prevTab: () => void;
	clearProduct: () => void;
	clearActiveTab: () => void;
}

export function useImportProductState(): ImportProductHook {
	const [importProducts] = useAtom(importProductAtom);
	const [activeTab] = useAtom(importProductActiveTabAtom);
	const [, importProductActions] = useAtom(importProductActionAtom);
	const [, importProductActiveTabActions] = useAtom(importProductActiveTabActionAtom);

	const addProductInvoice = (name: string) => {
		return importProductActions({ type: 'add', name });
	};

	const removeProduct = (id: string) => {
		importProductActions({ type: 'remove', id });
	};

	const updateProductInvoice = (id: string, state: Partial<ImportProductState>, productIndex?: number) => {
		importProductActions({ type: 'update', invoiceId: id, state });
	};
	const addProductItem = (id: string, product: ProductFormData) => {
		importProductActions({ type: 'add-product', invoiceId: id, product });
	};
	const removeProductItem = (id: string, productIndex: number) => {
		importProductActions({ type: 'remove-product', invoiceId: id, productIndex });
	};
	const updateProductState = (id: number, state: Partial<ProductFormData>) => {
		importProductActions({ type: 'update-product', invoiceId: activeTab, index: id, state });
	};
	const setTab = (id: string) => {
		importProductActiveTabActions({ type: 'set', id });
	};
	const nextTab = () => {
		importProductActiveTabActions({ type: 'next' });
	};
	const prevTab = () => {
		importProductActiveTabActions({ type: 'prev' });
	};
	const clearProduct = () => {
		importProductActions({ type: 'clear' });
	};
	const clearActiveTab = () => {
		importProductActiveTabActions({ type: 'clear' });
	};

	// useEffect(() => {
	// 	console.log(importProducts);
	// }, [importProducts]);

	return {
		importProducts,
		activeTab,
		addProductInvoice,
		removeProduct,
		updateProductInvoice,
		addProductItem,
		removeProductItem,
		updateProductState,
		setTab,
		nextTab,
		prevTab,
		clearProduct,
		clearActiveTab,
	};
}