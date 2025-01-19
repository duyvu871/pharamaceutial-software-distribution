'use client'
// import { ActionIcon, AppShell, Box, Button, Checkbox, Flex, Paper, TextInput, Text, Switch, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
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
import InvoiceProductSearch from '@component/Invoice/invoice-product-search.tsx';

function RetailDashboard({branchId}: {branchId: string}) {

	const {isAuthenticated} = useAuth();

	if (!isAuthenticated) {
		return <></>;
	}

	const [scannedCode, setScannedCode] = useState('');
	const [isScanning, setIsScanning] = useState(false);

	// useEffect(() => {
	// 	let buffer = ''; // Bộ đệm để lưu mã vạch
	// 	let timeoutId: NodeJS.Timeout; // Timeout để xác định khi nào máy quét hoàn tất gửi mã
	//
	// 	const handleKeydown = (e: any) => {
	// 		// Nếu máy quét gửi mã, nó sẽ gửi một chuỗi nhanh
	// 		if (!isScanning) setIsScanning(true);
	//
	// 		clearTimeout(timeoutId); // Hủy timeout nếu đang xử lý chuỗi mã
	// 		buffer += e.key; // Thêm ký tự vào buffer
	//
	// 		timeoutId = setTimeout(() => {
	// 			// Máy quét hoàn tất gửi mã, buffer chứa mã hoàn chỉnh
	// 			setScannedCode(buffer); // Lưu mã vào state
	// 			buffer = ''; // Xóa buffer
	// 			setIsScanning(false); // Đặt trạng thái về bình thường
	// 		}, 200); // Máy quét thường gửi mã rất nhanh, hoàn tất trong 200ms
	// 	};
	//
	// 	window.addEventListener('keydown', handleKeydown);
	// 	return () => {
	// 		window.removeEventListener('keydown', handleKeydown);
	// 	};
	// }, [isScanning]);
	//
	// useEffect(() => {
	// 	if (scannedCode) {
	// 		console.log('Scanned Code:', scannedCode);
	// 		handleSearch(scannedCode); // Gọi hàm tìm kiếm
	// 	}
	// }, [scannedCode]);
	//
	// const handleSearch = (code: any) => {
	// 	// Hàm xử lý tìm kiếm mã hàng hóa
	// 	alert(`Tìm kiếm mã hàng hóa: ${code}`);
	// 	console.log(`Tìm kiếm mã hàng hóa: ${code}`);
	// 	// Gửi mã tới server hoặc thực hiện tìm kiếm trong dữ liệu
	// };

	return (
			<CenterBox
				className={'flex-1 bg-zinc-100 h-full overflow-hidden relative'}
				classNames={{
					inner: 'flex flex-col w-full max-w-full h-full'
				}}
			>
				<Stack className="h-full overflow-hidden" gap={0}>
					<Box id={'nav'} className={'h-14 flex gap-5 items-center px-5 w-full bg-teal-500'}>
						<InvoiceProductSearch />
						<DynamicTabs />
					</Box>
					<Box className={'h-full flex flex-1 overflow-hidden'}>
						<InvoiceTab />
					</Box>
				</Stack>
				{/*<Box pos="fixed" bottom={0} left={0} className={"block"}>*/}
				{/*	<PrescriptModal>*/}
				{/*		<Button*/}
				{/*			variant="filled"*/}
				{/*			// color="teal"*/}
				{/*			className="!rounded-none !rounded-tr-xl !bg-teal-500 hover:!bg-teal-600 text-white"*/}
				{/*			radius="none"*/}
				{/*			size="lg"*/}
				{/*		>*/}
				{/*					<span className="flex items-center gap-2">*/}
				{/*						<FileText />*/}
				{/*						<span>Bán thuốc theo đơn</span>*/}
				{/*					</span>*/}
				{/*		</Button>*/}
				{/*	</PrescriptModal>*/}
				{/*</Box>*/}
			</CenterBox>
	)
}

export default RetailDashboard;

