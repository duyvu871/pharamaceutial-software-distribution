import React from 'react';
import ProductAutocomplete from '@component/product-search.tsx';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { Product } from '@schema/product-schema.ts';
import ExternalProductAutocomplete from '@component/Autocomplete/external-product-autocomplete.tsx';
import { SearchProductType } from '@schema/autocomplete.ts';
import { useImportProductForm } from '@hook/dashboard/import/use-import-product-form.ts';

const ImportExternalProductSearch = () => {
	const {useForm, resetForm} = useImportProductForm();
	const { control, handleSubmit, formState: { errors }, watch, getValues, setValue } = useForm;

	const selectItem = (item: SearchProductType) => {
		resetForm();
		// console.log('selected item:', item);
		// setSelected(item);
		setValue('code', item.drug_code);
		setValue('name', item.drug_name);
		setValue('unit', item.unit || 'vien');
		// setValue('largerUnit', item.larger_unit || 'vi');
		// setValue('largerUnitValue', item.larger_unit_value || '10');
		// setValue('purchasePrice', item.avg_original_price);
		// setValue('sellingPrice', item.avg_original_price);
		setValue('manufacturer', item.manufacturer);
		setValue('registrationNumber', item.registration_number);
		// setValue('usage', item.packaging);
		// setValue('activeIngredient', item.active_ingredient);
		// setValue('content', item.drug_content);
		setValue('ingredients', item.active_ingredient);
		setValue('packaging', item.packaging);
		// setValue('')
	}

	return (
		// <div className="w-96 relative"> {/* relative for Popover positioning */}
			<ExternalProductAutocomplete onSelectProduct={selectItem} w={"100%"}/>
		// </div>
	);
};

export default ImportExternalProductSearch;