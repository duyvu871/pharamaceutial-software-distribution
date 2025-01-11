import React from 'react';
import ProductAutocomplete from '@component/product-search.tsx';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { Product } from '@schema/product-schema.ts';

const InvoiceProductSearch = () => {
	const [, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab] = useAtom(invoiceActiveTabActionAtom);

	const selectItem = (item: Product) => {
		// setSelected(item);
		if (!activeTab) {
			// console.error("No active tab selected");
			return;
		}
		const initialPrice = item.sell_price || item.original_price
		const addedItemInvoice = {
			productName: item.product_name,
			quantity: 1,
			price: initialPrice,
			total: initialPrice,
			note: "",
			unit: item?.productUnit?.name || item.base_unit,
			id: item.id,
		}
		invoiceDispatch({
			type: 'add-item',
			id: activeTab,
			item: addedItemInvoice
		});
		// close();
	}

	return (
		<div className="w-96 relative"> {/* relative for Popover positioning */}
			<ProductAutocomplete onSelectProduct={selectItem} w={"100%"}/>
		</div>
	);
};

export default InvoiceProductSearch;