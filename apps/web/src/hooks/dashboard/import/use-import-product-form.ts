import { useContext } from 'react';
import { ImportProductFormContext } from '@provider/import/product-form-provider.tsx';

export const useImportProductForm = () => {
	const context = useContext(ImportProductFormContext);
	if (!context) {
		throw new Error('useImportProductForm must be used within a ImportProductFormProvider');
	}
	return context;
};