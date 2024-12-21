'use client'

import { useEffect, useState } from 'react'
import { Table, Pagination, Select, TextInput, ScrollArea, Group, Box } from '@mantine/core'
import { Plus, Upload, FileSpreadsheet, RotateCw, Menu, Search } from 'lucide-react'
import { cn } from '@lib/tailwind-merge.ts';
import { getProductList } from '@api/product.ts';
import { Product, ProductRender } from '@schema/product-schema.ts';
import { CenterBox } from '@component/CenterBox';
import ProductDetail from '@component/product/product-detail.tsx';
import { ProductModal } from '@component/Modal/product-modal.tsx';

export default function ProductDashboard({branchId}: {branchId: string}) {
	const [activePage, setActivePage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState('20')
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [productDetailActive, setProductDetailActive] = useState<string | null>(null)

	const toggleSelectAll = () => {
		if (selectedItems.length === products.length) {
			setSelectedItems([])
		} else {
			setSelectedItems(products.map(p => p.id.toString()))
		}
	}

	const toggleSelectItem = (id: string) => {
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter(item => item !== id))
		} else {
			setSelectedItems([...selectedItems, id])
		}
	}

	const toggleDetail = (transformedProduct: ProductRender) =>
		setProductDetailActive(
			productDetailActive === transformedProduct.id ? null : transformedProduct.id
		)

	const transformProduct = (product: Product): ProductRender =>
		({
			id: product.id.toString(),
			code: product.barcode || product.product_no,
			name: product.product_name,
			unit: product?.productUnit?.name || product.base_unit,
			costPrice: product.original_price,
			sellPrice: product.sell_price,
			stock: product.quantity_of_stock,
			status: product.status === 1 ? 'active' : 'inactive',
		});

	useEffect(() => {
		if (branchId) {
			getProductList({
				branchId,
				page: activePage,
				limit: parseInt(itemsPerPage),
				perPage: parseInt(itemsPerPage),
			}, false).then((data) => {
				setProducts(data);
			})
		}
	}, [branchId]);

	return (
		<CenterBox
			className={'flex-1 bg-zinc-100 h-full overflow-hidden'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full'
			}}
		>
			<Group align={'start'} className="h-full overflow-hidden !flex-nowrap" gap={0}>
				{/* Sidebar */}
				<div className="w-64 h-full bg-white border-r border-gray-200 p-4">
					<div className="space-y-6">
						<div>
							<h3 className="text-sm font-medium text-gray-700 mb-2">Phân loại</h3>
							<div className="space-y-2">
								<label className="flex items-center space-x-2">
									<input type="checkbox" className="rounded border-gray-300 pt-1" defaultChecked />
									<span>Thuốc</span>
								</label>
								<label className="flex items-start space-x-2">
									<input type="checkbox" className="rounded border-gray-300 pt-1" />
									<span>Thực phẩm chức năng</span>
								</label>
								<label className="flex items-start space-x-2">
									<input type="checkbox" className="rounded border-gray-300 pt-1" />
									<span>Mỹ phẩm</span>
								</label>
								<label className="flex items-start space-x-2">
									<input type="checkbox" className="rounded border-gray-300 pt-1" />
									<span>Dụng cụ y tế</span>
								</label>
								<label className="flex items-start space-x-2">
									<input type="checkbox" className="rounded border-gray-300 pt-1" />
									<span>Hàng hóa khác</span>
								</label>
							</div>
						</div>

						{/*<div>*/}
						{/*	<h3 className="text-sm font-medium text-gray-700 mb-2">Trạng thái</h3>*/}
						{/*	<div className="space-y-2">*/}
						{/*		<label className="flex items-center space-x-2">*/}
						{/*			<input type="checkbox" className="rounded border-gray-300" defaultChecked />*/}
						{/*			<span>Kinh doanh</span>*/}
						{/*		</label>*/}
						{/*		<label className="flex items-center space-x-2">*/}
						{/*			<input type="checkbox" className="rounded border-gray-300" defaultChecked />*/}
						{/*			<span>Ngưng kinh doanh</span>*/}
						{/*		</label>*/}
						{/*	</div>*/}
						{/*</div>*/}

						{/*<div>*/}
						{/*	<h3 className="text-sm font-medium text-gray-700 mb-2">Nhóm hàng</h3>*/}
						{/*	<div className="space-y-2">*/}
						{/*		<label className="flex items-center space-x-2">*/}
						{/*			<input type="radio" name="group" className="border-gray-300" />*/}
						{/*			<span>Thuốc Bổ</span>*/}
						{/*		</label>*/}
						{/*		<label className="flex items-center space-x-2">*/}
						{/*			<input type="radio" name="group" className="border-gray-300" />*/}
						{/*			<span>Thuốc Cơ - Xương khớp</span>*/}
						{/*		</label>*/}
						{/*		<label className="flex items-center space-x-2">*/}
						{/*			<input type="radio" name="group" className="border-gray-300" />*/}
						{/*			<span>Thuốc Hô Hấp</span>*/}
						{/*		</label>*/}
						{/*		/!* Add more groups as needed *!/*/}
						{/*	</div>*/}
						{/*</div>*/}
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-4 h-full flex flex-col">
					<div className="mb-6">
						<div className="flex justify-between items-center mb-4">
							<h1 className="text-xl font-medium">Sản phẩm</h1>
							<button className="lg:hidden">
								<Menu className="w-6 h-6" />
							</button>
						</div>

						{/* Search and Actions */}
						<div className="flex gap-2 items-center">
							<div className="flex-1">
								<TextInput
									placeholder="Theo tên, mã hàng"
									leftSection={<Search className="w-4 h-4" />}
									className="max-w-xl"
								/>
							</div>
							<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-purple-600">
								<Upload className="w-4 h-4" />
								<span>Tải lên</span>
							</button>
							<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-red-600">
								<FileSpreadsheet className="w-4 h-4" />
								<span>Xuất Excel</span>
							</button>
							<ProductModal>
								<button
									className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
									<Plus className="w-4 h-4" />
									<span>Thêm mới</span>
								</button>
							</ProductModal>
							<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
								<RotateCw className="w-4 h-4" />
								<span>Làm mới</span>
							</button>
						</div>
					</div>

					{/* Table */}
					<div className="bg-white rounded-md  shadow overflow-y-auto">
						<ScrollArea scrollbars={"xy"}  pos={'relative'} id={'table'} className="flex flex-grow">
							{/*<div className={'p-2 min-w-full table'}>*/}
								<Table striped highlightOnHover>
									<Table.Thead role={'rowgroup'}>
										<Table.Tr>
											<Table.Th className="w-12">
												<input
													type="checkbox"
													className="rounded border-gray-300"
													checked={selectedItems.length === products.length}
													onChange={toggleSelectAll}
												/>
											</Table.Th>
											<Table.Th className="whitespace-nowrap">#</Table.Th>
											<Table.Th className="whitespace-nowrap">Mã hàng</Table.Th>
											<Table.Th className="whitespace-nowrap">Tên hàng</Table.Th>
											<Table.Th className="whitespace-nowrap">Đơn vị</Table.Th>
											<Table.Th className="whitespace-nowrap">Giá vốn</Table.Th>
											<Table.Th className="whitespace-nowrap">Giá bán</Table.Th>
											<Table.Th className="whitespace-nowrap">Tồn kho</Table.Th>
											<Table.Th className="whitespace-nowrap">Trạng thái</Table.Th>
											<Table.Th className={"whitespace-nowrap"}>Liên thông</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody role={'rowgroup'}>
										{products.map((product, index) => {
											const transformedProduct = transformProduct(product);
											return (
												<>
													<Table.Tr
														key={product.id} h={50}

													>
														<Table.Td>
															<input
																type="checkbox"
																className="rounded border-gray-300"
																checked={selectedItems.includes(transformedProduct.id)}
																onChange={() => toggleSelectItem(transformedProduct.id)}
															/>
														</Table.Td>
														<Table.Td onClick={() => toggleDetail(transformedProduct)}>{index + 1}</Table.Td>
														<Table.Td
															onClick={() => toggleDetail(transformedProduct)}
															className={'whitespace-nowrap '}
														>{transformedProduct.code}</Table.Td>
														<Table.Td
															onClick={() => toggleDetail(transformedProduct)}
															className="max-w-md truncate"
														>{transformedProduct.name}</Table.Td>
														<Table.Td
															onClick={() => toggleDetail(transformedProduct)}
															className={'whitespace-nowrap '}
														>{transformedProduct.unit}</Table.Td>
														<Table.Td
															onClick={() => toggleDetail(transformedProduct)}
															className={'whitespace-nowrap '}
														>{transformedProduct.costPrice.toLocaleString('vi-VN')}</Table.Td>
														<Table.Td
															onClick={() => toggleDetail(transformedProduct)}
															className={'whitespace-nowrap '}
														>{transformedProduct.sellPrice.toLocaleString('vi-VN')}</Table.Td>
														<Table.Td
															onClick={() => toggleDetail(transformedProduct)}
															className="text-center whitespace-nowrap "
														>{transformedProduct.stock}</Table.Td>
														<Table.Td onClick={() => toggleDetail(transformedProduct)}>
															<span className={cn(
																'px-2 whitespace-nowrap py-1 rounded-md text-sm',
																transformedProduct.status === 'active'
																	? 'bg-teal-500/10 text-teal-500'
																	: 'bg-gray-500/10 text-gray-500'
															)}>
																Kinh doanh
														</span>
														</Table.Td>
														<Table.Td className={"text-center"}>
															<input
																type="checkbox"
																className="rounded border-gray-300"
																checked={selectedItems.includes(transformedProduct.id)}
																onChange={() => toggleSelectItem(transformedProduct.id)}
															/>
														</Table.Td>
													</Table.Tr>
													<Table.Tr
														key={product.id + '-detail'}
														className={' overflow-hidden'}
													>
														<Table.Td p={0} colSpan={9}>
															<Box h={productDetailActive === transformedProduct.id ? '' : 0} className={'transition-all overflow-hidden'}>
																<ProductDetail product={{
																	id: product.id.toString(),
																	code: transformedProduct.code,
																	name: transformedProduct.name,
																	type: product.product_type,
																	costPrice: transformedProduct.costPrice,
																	sellPrice: transformedProduct.sellPrice,
																	group: '',
																	minStock: product.min_quantity,
																	maxStock: product.max_quantity,
																	avgCostPrice: product.avg_original_price,
																	manufacturer: product.manufacturer || '',
																	origin: product.made_in || '',
																	description: product.description || '',
																	location: '',
																	image: product.default_image || '',
																}} />
															</Box>
														</Table.Td>
													</Table.Tr>
												</>
											)
										})}
									</Table.Tbody>
								</Table>
							{/*</div>*/}
						</ScrollArea>
					</div>

					{/* Pagination */}
					<div className="flex justify-between items-center mt-4">
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600">Items per page:</span>
							<Select
								value={itemsPerPage}
								onChange={(value) => setItemsPerPage(value || '20')}
								data={['10', '20', '30', '50'].map(value => ({ value, label: value }))}
								styles={{
									input: {
										width: '70px',
									},
								}}
							/>
							<span className="text-sm text-gray-600">
              0 of 0
            </span>
						</div>
						<Pagination
							value={activePage}
							onChange={setActivePage}
							total={1}
							siblings={1}
							boundaries={1}
							color={'rgb(20 184 166)'}
						/>
					</div>
				</div>
			</Group>

		</CenterBox>
	)
}

