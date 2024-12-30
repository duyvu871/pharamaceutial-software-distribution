'use client'
// import { ActionIcon, AppShell, Box, Button, Checkbox, Flex, Paper, TextInput, Text, Switch, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { Search, Plus, Settings, User, FileText, ChevronDown, Phone, X, List } from 'lucide-react'
import { AppShell, Autocomplete, Box,
	Button,
	Divider, LoadingOverlay, NumberInput, ScrollArea, Stack, Table, Textarea, TextInput } from '@mantine/core';
import { CenterBox } from '@component/CenterBox';
import { useUID } from '@hook/common/useUID.ts';
import { MoneyInput } from '@component/money-input.tsx';
import ProductAutocomplete from '@component/product-search.tsx';
import DynamicTabs from '@component/Invoice/dynamic-tab-list.tsx';
import InvoiceTab from '@component/Invoice/invoice-tab.tsx';
import { PrescriptModal } from '@component/Modal/prescript-modal.tsx';
import { useAuth } from '@hook/auth';

function RetailDashboard({branchId}: {branchId: string}) {

	const {isAuthenticated} = useAuth();

	if (!isAuthenticated) {
		return <></>;
	}

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
						<InvoiceTab />
					</Box>
				</Stack>
				<Box pos="fixed" bottom={0} left={0} className={"block"}>
					<PrescriptModal>
						<Button
							variant="filled"
							// color="teal"
							className="!rounded-none !rounded-tr-xl !bg-teal-500 hover:!bg-teal-600 text-white"
							radius="none"
							size="lg"
						>
									<span className="flex items-center gap-2">
										<FileText />
										<span>Bán thuốc theo đơn</span>
									</span>
						</Button>
					</PrescriptModal>
				</Box>
			</CenterBox>
	)
}

export default RetailDashboard;

