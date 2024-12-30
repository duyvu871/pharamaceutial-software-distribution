import { useAtom } from 'jotai';
import {
	importProductAtom,
	importProductActionAtom,
	importProductActiveTabAtom,
	importProductActiveTabActionAtom,
	ImportProductState,
} from '@store/state/overview/import-product.ts';
import { ProductFormData } from '@schema/product-schema.ts'; // Đường dẫn đến file chứa các atoms


interface ImportProductHook {
	importProducts: Record<string, ImportProductState>;
	activeTab: string;
	addProduct: (name: string) => string | undefined;
	removeProduct: (id: string) => void;
	updateProduct: (id: string, product: Partial<ProductFormData>, productIndex?: number) => void;
	addProductItem: (id: string, product: ProductFormData) => void;
	removeProductItem: (id: string, productIndex: number) => void;
	updateProductState: (id: string, state: Partial<ImportProductState>) => void;
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

	const addProduct = (name: string) => {
		return importProductActions({ type: 'add', name });
	};

	const removeProduct = (id: string) => {
		importProductActions({ type: 'remove', id });
	};

	const updateProduct = (id: string, product: Partial<ProductFormData>, productIndex?: number) => {
		importProductActions({ type: 'update', id, product, productIndex });
	};
	const addProductItem = (id: string, product: ProductFormData) => {
		importProductActions({ type: 'add-product', id, product });
	};
	const removeProductItem = (id: string, productIndex: number) => {
		importProductActions({ type: 'remove-product', id, productIndex });
	};
	const updateProductState = (id: string, state: Partial<ImportProductState>) => {
		importProductActions({ type: 'update-product-state', id, state });
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


	return {
		importProducts,
		activeTab,
		addProduct,
		removeProduct,
		updateProduct,
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