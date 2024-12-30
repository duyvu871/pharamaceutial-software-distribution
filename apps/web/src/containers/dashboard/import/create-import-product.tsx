"use client";
import React from 'react';
import ProductAutocomplete from '@component/product-search.tsx';
import DynamicTabs from '@component/Invoice/dynamic-tab-list.tsx';
import InvoiceTab from '@component/Invoice/invoice-tab.tsx';
import { PrescriptModal } from '@component/Modal/prescript-modal.tsx';
import { CenterBox } from '@component/CenterBox';
import { Box, Button, Stack } from '@mantine/core';
import { FileText } from 'lucide-react';
import ImportTab from '@component/Invoice/import-tab.tsx';

function CreateImportProduct({branchId}: {branchId: string}) {
	return (
		<CenterBox
			className={'flex-1 bg-zinc-100 h-full overflow-hidden relative'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full'
			}}
		>
			<Stack className="h-full overflow-hidden" gap={0}>
				<Box id={'nav'} className={'h-14 flex items-center px-5 w-full bg-teal-500'}>
					<ProductAutocomplete />
					<DynamicTabs />
				</Box>
				<Box className={'h-full flex flex-1 overflow-hidden'}>
					<ImportTab />
				</Box>
			</Stack>
		</CenterBox>
	);
}

export default CreateImportProduct;