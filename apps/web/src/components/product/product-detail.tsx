'use client'

import { useContext, useState } from 'react'
import { LoadingOverlay, Tabs, TextInput } from '@mantine/core'
import { Copy, Edit, Printer, Lock, Trash2, RotateCw, Maximize, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import { MoneyInput } from '@component/money-input.tsx';
import { CreationProductSchema, Product } from '@schema/product-schema';
import MedicineForm from '@component/Detail/product-detail.tsx';
import { cn } from '@lib/tailwind-merge.ts';
import { DashBoardContext } from '@container/dashboard/product/product-dashboard-v1.tsx';
import { InventoryLedgerDetail } from '@component/Detail/inventory-ledger-detail.tsx';
import { useDisclosure } from '@mantine/hooks'
import useToast from '@hook/client/use-toast-notification.ts';
import { updateProduct } from '@api/product.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { timeout } from '@util/delay.ts';

interface ProductDetailProps {
	product: Product
	type: string
}



export default function ProductDetail({ product, type }: ProductDetailProps) {
	const {branchId} = useDashboard();

	const [activeTab, setActiveTab] = useState('info')
	const [imageZoom, setImageZoom] = useState(1)

	const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
	const [visibleActionOverlay, { toggle, close: closeActionOverLay, open: openActionOverlay }] = useDisclosure(false);

	const {showErrorToast, showSuccessToast, showInfoToast, showWarningToast} = useToast();


	const handleZoomIn = () => setImageZoom(prev => Math.min(prev + 0.2, 2))
	const handleZoomOut = () => setImageZoom(prev => Math.max(prev - 0.2, 0.5))
	const handleResetZoom = () => setImageZoom(1)

	const update = async (data: CreationProductSchema) => {
		try {
			if (!branchId) {
				throw new Error("Branch id is required");
			}
			if (!data.id) {
				throw new Error("Product id is required");
			}
			openActionOverlay();
			const create = await updateProduct(branchId, data.id, data);
			if (create) {
				showSuccessToast('Cập nhật thông tin sản phẩm thành công, làm mới để xem thay đổi');
			}

		} catch (error) {
			showErrorToast('Cập nhật thất bại')
		} finally {
			timeout(1000).then(() => {
				closeActionOverLay();
			});
		}
	}

	return (
		<div className="w-full mx-auto p-6 bg-white">
			<h1 className="text-2xl font-medium text-teal-600 mb-6">{product.product_name}</h1>

			<Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'info')}>
				<Tabs.List className="border-b border-gray-200 mb-6">
					<Tabs.Tab
						value="info"
						className={`pb-4 relative ${
							activeTab === 'info' ? 'text-teal-500 font-medium' : 'text-gray-500'
						}`}
					>
						Thông tin
					</Tabs.Tab>
					<Tabs.Tab
						value="stock-card"
						className={`pb-4 relative ${
							activeTab === 'stock-card' ? 'text-teal-500 font-medium' : 'text-gray-500'
						}`}
					>
						Thẻ kho
					</Tabs.Tab>
					{/*<Tabs.Tab*/}
					{/*	value="inventory"*/}
					{/*	className={`pb-4 relative ${*/}
					{/*		activeTab === 'inventory' ? 'text-teal-500 font-medium' : 'text-gray-500'*/}
					{/*	}`}*/}
					{/*>*/}
					{/*	Tồn kho*/}
					{/*</Tabs.Tab>*/}
					{/*<Tabs.Tab*/}
					{/*	value="batch"*/}
					{/*	className={`pb-4 relative ${*/}
					{/*		activeTab === 'batch' ? 'text-teal-500 font-medium' : 'text-gray-500'*/}
					{/*	}`}*/}
					{/*>*/}
					{/*	Tồn kho theo Lô*/}
					{/*</Tabs.Tab>*/}
					{/*<Tabs.Tab*/}
					{/*	value="history"*/}
					{/*	className={`pb-4 relative ${*/}
					{/*		activeTab === 'history' ? 'text-teal-500 font-medium' : 'text-gray-500'*/}
					{/*	}`}*/}
					{/*>*/}
					{/*	Lịch sử cập nhật*/}
					{/*</Tabs.Tab>*/}
				</Tabs.List>

				<Tabs.Panel value="info">
					<div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
						{/* Product Image */}
						<div className="relative">
							<div className="relative w-full aspect-square h-[300px] border border-gray-200 rounded-lg overflow-hidden">
								<Image
									src={product.default_image || '/images/placeholder.png'}
									alt={product.product_name}
									fill
									className="object-contain"
									unoptimized
									style={{ transform: `scale(${imageZoom})` }}
								/>
							</div>
							<div className="absolute right-2 top-2 flex flex-col gap-2">
								<button
									onClick={() => {}}
									className="p-2 bg-gray-100/90 rounded-full hover:bg-gray-200/90"
								>
									<Maximize className="w-5 h-5 text-gray-600" />
								</button>
								<button
									onClick={handleZoomIn}
									className="p-2 bg-gray-100/90 rounded-full hover:bg-gray-200/90"
								>
									<Plus className="w-5 h-5 text-gray-600" />
								</button>
								<button
									onClick={handleZoomOut}
									className="p-2 bg-gray-100/90 rounded-full hover:bg-gray-200/90"
								>
									<Minus className="w-5 h-5 text-gray-600" />
								</button>
								<button
									onClick={handleResetZoom}
									className="p-2 bg-gray-100/90 rounded-full hover:bg-gray-200/90"
								>
									<RotateCw className="w-5 h-5 text-gray-600" />
								</button>
							</div>
						</div>

						{/* Product Details */}
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm text-gray-500">Mã hàng:</label>
									<div className="font-medium">{product.product_id}</div>
								</div>
								<div>
									<label className="text-sm text-gray-500">Hãng sản xuất:</label>
									<div className="font-medium">{product.manufacturer}</div>
								</div>
								<div>
									<label className="text-sm text-gray-500">Nhóm hàng:</label>
									<div className="font-medium">{product?.store_group?.group_name || ""}</div>
								</div>
								<div>
									<label className="text-sm text-gray-500">Nước sản xuất:</label>
									<div className="font-medium">{product.made_in}</div>
								</div>
								<div>
									<label className="text-sm text-gray-500">Loại hàng:</label>
									<div className="font-medium">{product.product_type || ""}</div>
								</div>
								{/*<div>*/}
								{/*	<label className="text-sm text-gray-500">Vị trí:</label>*/}
								{/*	<div className="font-medium">{product.}</div>*/}
								{/*</div>*/}
								{/*<div>*/}
								{/*	<label className="text-sm text-gray-500">Định mức tồn:</label>*/}
								{/*	<div className="font-medium">{product} {'>'} {product.maxStock}</div>*/}
								{/*</div>*/}
								<div>
									<label className="text-sm text-gray-500">Mô tả:</label>
									<div className="font-medium">{product.description}</div>
								</div>
								<div>
									<label className="text-sm text-gray-500">Giá bán:</label>
									<MoneyInput
										value={product.sell_price}
										onChange={() => {
										}}
										className="font-medium" />
								</div>
								<div>
									<label className="text-sm text-gray-500">Giá vốn:</label>
									<MoneyInput
										value={product.original_price}
										onChange={() => {
										}}
										className="font-medium" />
								</div>
								{/*<div>*/}
								{/*	<label className="text-sm text-gray-500">Giá vốn bình quân:</label>*/}
								{/*	<MoneyInput*/}
								{/*		value={product.avgCostPrice}*/}
								{/*		onChange={() => {*/}
								{/*		}}*/}
								{/*		className="font-medium" />*/}
								{/*</div>*/}
							</div>
						</div>
					</div>
				</Tabs.Panel>

				<Tabs.Panel value="stock-card">
					<InventoryLedgerDetail product={product} />
				</Tabs.Panel>

				<Tabs.Panel value="inventory">
					<div className="text-center text-gray-500 py-8">
						Thông tin tồn kho sẽ được hiển thị ở đây
					</div>
				</Tabs.Panel>

				<Tabs.Panel value="batch">
					<div className="text-center text-gray-500 py-8">
						Thông tin tồn kho theo lô sẽ được hiển thị ở đây
					</div>
				</Tabs.Panel>

				<Tabs.Panel value="history">
					<div className="text-center text-gray-500 py-8">
						Lịch sử cập nhật sẽ được hiển thị ở đây
					</div>
				</Tabs.Panel>
			</Tabs>

			<div className={cn("transition-all overflow-hidden relative", {
				"h-[0]": !openUpdateForm,
				"h-auto": openUpdateForm
			})}>
				<LoadingOverlay visible={visibleActionOverlay} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
				<MedicineForm type={type} detail={product} onSubmit={update} />
			</div>

			{/* Action Buttons */}
			<div className="flex gap-2 mt-8">
				<button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
					<Printer className="w-4 h-4" />
					<span>In tem</span>
				</button>
				<button
					onClick={() => setOpenUpdateForm(prev => !prev)}
					className={cn(
						"flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600",
						{ "bg-teal-600": openUpdateForm }
					)}>
					<Edit className="w-4 h-4" />
					<span>Cập nhật</span>
				</button>
				<button className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-purple-600">
					<Copy className="w-4 h-4" />
					<span>Sao chép</span>
				</button>
				<button className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-red-600">
					<Lock className="w-4 h-4" />
					<span>Tạm ngưng</span>
				</button>
				<button className="flex items-center gap-2 px-4 py-2 text-white bg-red-400 rounded-md hover:bg-red-600">
					<Trash2 className="w-4 h-4" />
					<span>Xóa</span>
				</button>
			</div>
		</div>
	)
}

