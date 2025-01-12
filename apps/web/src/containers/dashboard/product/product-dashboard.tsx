'use client'

import { Fragment, useEffect, useState } from 'react'
import { Table, Pagination, Select, TextInput, ScrollArea, Group, Box, Button } from '@mantine/core'
import { Plus, Upload, FileSpreadsheet, RotateCw, Menu, Search, Archive, PackageOpen, Download } from 'lucide-react'
import { cn } from '@lib/tailwind-merge.ts';
import { getProductList } from '@api/product.ts';
import { Product, ProductRender } from '@schema/product-schema.ts';
import { CenterBox } from '@component/CenterBox';
import ProductDetail from '@component/product/product-detail.tsx';
import { ProductModal } from '@component/Modal/product-modal.tsx';
import { useAuth } from '@hook/auth';
import { Typography } from '@component/Typography';
import { getStoreGroup } from '@api/group.ts';
import { GroupStoreSchema } from '@schema/group-schema.ts';
import { TableRender } from '@type/components/table.type';
import ProductAutocomplete from '@component/product-search.tsx';

export default function ProductDashboard({branchId, type}: {branchId: string, type?: string}) {
	const {isAuthenticated} = useAuth();
	const [storeGroups, setStoreGroups] = useState<GroupStoreSchema[]>([]);
	const [title, setTitle] = useState('Sản phẩm');
	const [activePage, setActivePage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState('20')
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [productDetailActive, setProductDetailActive] = useState<string | null>(null)

	const [searchValue, setSearchValue] = useState<string>('');
	const [searchType, setSearchType] = useState<string>('name');

	const [disableRefresh, setDisableRefresh] = useState<boolean>(false);

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

	const refreshProducts = () => {
		setDisableRefresh(true);
		getProductList({
			branchId,
			page: activePage,
			limit: parseInt(itemsPerPage),
			perPage: parseInt(itemsPerPage),
			productType: type,
		}, false).then((data) => {
			setProducts(data);
			setDisableRefresh(false);
		})
	}

	const searchProducts = () => {
		getProductList({
			branchId,
			page: activePage,
			limit: parseInt(itemsPerPage),
			perPage: parseInt(itemsPerPage),
			productType: type,
			search: searchValue,
		}, false).then((data) => {
			setProducts(data);
		})
	}

	useEffect(() => {
		console.log('fetching products with type', type);
		if (branchId) {
			getStoreGroup(branchId).then((data) => {
				// console.log('store groups', data);
				setStoreGroups(data);
				setTitle(data.find(group => group.group_slug === type)?.group_name || 'Sản phẩm');
			})
			getProductList({
				branchId,
				page: activePage,
				limit: parseInt(itemsPerPage),
				perPage: parseInt(itemsPerPage),
				productType: type,
			}, false).then((data) => {
				setProducts(data);
			})
		}
	}, [branchId]);

	if (!isAuthenticated) {
		return <></>;
	}

	const tableRenderData: TableRender<Product> = [
		{
			title: 'Mã hàng hóa',
			render: (data) => data.product_id
		},
		{
			title: "Số đăng ký",
			render: (data) => data.register_no || ""
		},
		{
			title: "Số lô",
			render: (data) => data.lot_no || ""
		},
		{
			title: "Hạn dùng",
			render: (data) => new Date(data.expire_date).toLocaleDateString() || ""
		},
		{
			title: "Đơn vị tính",
			render: (data) => data.base_unit || ""
		},
		{
			title: "Giá bán",
			render: (data) => data.sell_price.toLocaleString('vi-VN')
		},
		{
			title: "Số lượng tồn",
			render: (data) => data.quantity_of_stock
		},
		{
			title: "Trạng thái",
			render: (data) =>
				<span className={cn(
					'px-2 whitespace-nowrap py-1 rounded-md text-sm',
					data.status === 1
						? 'bg-teal-500/10 text-teal-500'
						: 'bg-gray-500/10 text-gray-500',
				)}>
					{data.status === 1 ? 'Kinh doanh' : 'Ngưng kinh doanh'}
				</span> ,
		},
		{
			title: 'Liên thông',
			render: (data) =>
				<input
					type="checkbox"
					className="rounded border-gray-300"
					checked={selectedItems.includes(data.id)}
					onChange={() => toggleSelectItem(data.id)}
				/>,
		},
	]

	return (
		<CenterBox
			className={'flex-1 bg-zinc-100 h-full overflow-hidden'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full',
			}}
		>
			<Group align={'start'} className="h-full overflow-hidden !flex-nowrap" gap={0}>

				{/* Main Content */}
				<div className="flex-1 p-4 h-full flex flex-col">
					<div className="mb-6">
						<div className="flex justify-between items-center mb-4">
							<h1 className="text-xl font-medium">Danh sách {title.toLowerCase()}</h1>
							<button className="lg:hidden">
								<Menu className="w-6 h-6" />
							</button>
						</div>

						{/* Search and Actions */}
						<div className="flex gap-2 items-center">
							<div className="flex-1 flex gap-2">
								<TextInput
									placeholder="Theo tên, mã hàng"
									leftSection={<Search className="w-4 h-4" />}
									className="max-w-xl w-full"
									onChange={(e) => setSearchValue(e.currentTarget.value)}
								/>
								{/*<ProductAutocomplete*/}
								{/*	value*/}
								{/*	placeholder="Theo tên, mã hàng"*/}
								{/*	leftSection={<Search className="w-4 h-4" />}*/}
								{/*	className="max-w-xl w-full hidden"*/}
								{/*/>*/}
								<button
									className="flex items-center gap-2 bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600"
									onClick={searchProducts}
								>
									<Search className="w-4 h-4" />
									<span>Tìm kiếm</span>
								</button>
							</div>
							<button
								className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
								<Download className="w-4 h-4" />
								<span>Tải file mẫu</span>
							</button>
							<button
								className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
								<Upload className="w-4 h-4" />
								<span>Tải lên</span>
							</button>
							<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
								<FileSpreadsheet className="w-4 h-4" />
								<span>Xuất file Excel</span>
							</button>
							{/*<ProductModal>*/}
							{/*	<button*/}
							{/*		className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">*/}
							{/*		<Plus className="w-4 h-4" />*/}
							{/*		<span>Thêm mới</span>*/}
							{/*	</button>*/}
							{/*</ProductModal>*/}
							<button
								className={cn(
									"flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600",
									{ 'cursor-not-allowed': disableRefresh }
								)}
								onClick={refreshProducts}
								disabled={disableRefresh}
							>
								<RotateCw className={cn("w-4 h-4", {"rotate": disableRefresh})} />
								<span>Làm mới</span>
							</button>
						</div>
					</div>

					{/* Table */}
					<div className="bg-white rounded-md  shadow overflow-y-auto">
						{/*<ScrollArea scrollbars={'xy'} pos={'relative'} id={'table'} className="flex flex-grow">*/}
							{/*<div className={'p-2 min-w-full table'}>*/}
								<Table striped highlightOnHover>
									<Table.Thead role={'rowgroup'}>
										<Table.Tr>
											<Table.Th className="bg-white sticky top-0 w-12">
												<input
													type="checkbox"
													className="rounded border-gray-300"
													checked={selectedItems.length === products.length}
													onChange={toggleSelectAll}
												/>
											</Table.Th>
											<Table.Th className="bg-white sticky top-0 whitespace-nowrap">#</Table.Th>
											{tableRenderData.map((data, index) => (
												<Table.Th key={`th-${data.title}`} className="bg-white sticky top-0 whitespace-nowrap">{data.title}</Table.Th>
											))}
										</Table.Tr>
									</Table.Thead>

									<Table.Tbody role={'rowgroup'} className={"overflow-y-auto h-full"}>
										{products.map((product, index) => {
											const transformedProduct = transformProduct(product);
											return (
												<Fragment key={`tr-${product.id}`}>
													<Table.Tr h={50}>
														<Table.Td>
															<input
																type="checkbox"
																className="rounded border-gray-300"
																checked={selectedItems.includes(transformedProduct.id)}
																onChange={() => toggleSelectItem(transformedProduct.id)}
															/>
														</Table.Td>
														<Table.Td onClick={() => toggleDetail(transformedProduct)}>{index + 1}</Table.Td>
														{/*<Table.Td*/}
														{/*	onClick={() => toggleDetail(transformedProduct)}*/}
														{/*	className={'whitespace-nowrap '}*/}
														{/*>{transformedProduct.code}</Table.Td>*/}
														{/*<Table.Td*/}
														{/*	onClick={() => toggleDetail(transformedProduct)}*/}
														{/*	className="max-w-md truncate"*/}
														{/*>{transformedProduct.name}</Table.Td>*/}
														{/*<Table.Td*/}
														{/*	onClick={() => toggleDetail(transformedProduct)}*/}
														{/*	className={'whitespace-nowrap '}*/}
														{/*>{transformedProduct.unit}</Table.Td>*/}
														{/*<Table.Td*/}
														{/*	onClick={() => toggleDetail(transformedProduct)}*/}
														{/*	className={'whitespace-nowrap '}*/}
														{/*>{transformedProduct.costPrice.toLocaleString('vi-VN')}</Table.Td>*/}
														{/*<Table.Td*/}
														{/*	onClick={() => toggleDetail(transformedProduct)}*/}
														{/*	className={'whitespace-nowrap '}*/}
														{/*>{transformedProduct.sellPrice.toLocaleString('vi-VN')}</Table.Td>*/}
														{/*<Table.Td*/}
														{/*	onClick={() => toggleDetail(transformedProduct)}*/}
														{/*	className="text-center whitespace-nowrap "*/}
														{/*>{transformedProduct.stock}</Table.Td>*/}
														{/*<Table.Td onClick={() => toggleDetail(transformedProduct)}>*/}
														{/*	<span className={cn(*/}
														{/*		'px-2 whitespace-nowrap py-1 rounded-md text-sm',*/}
														{/*		transformedProduct.status === 'active'*/}
														{/*			? 'bg-teal-500/10 text-teal-500'*/}
														{/*			: 'bg-gray-500/10 text-gray-500'*/}
														{/*	)}>*/}
														{/*		Kinh doanh*/}
														{/*</span>*/}
														{/*</Table.Td>*/}
														{/*<Table.Td className={"text-center"}>*/}
														{/*	<input*/}
														{/*		type="checkbox"*/}
														{/*		className="rounded border-gray-300"*/}
														{/*		checked={selectedItems.includes(transformedProduct.id)}*/}
														{/*		onChange={() => toggleSelectItem(transformedProduct.id)}*/}
														{/*	/>*/}
														{/*</Table.Td>*/}
														{tableRenderData.map((data, index) => (
															<Table.Td key={`td-${product.product_id}-${index}`} onClick={() => toggleDetail(transformedProduct)}>{data.render(product)}</Table.Td>
														))}
													</Table.Tr>
													<Table.Tr
														// key={product.id + '-detail'}
														className={' overflow-hidden'}
													>
														<Table.Td p={0} colSpan={10}>
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
																	image: product.default_image || '/images/placeholder.png',
																}} />
															</Box>
														</Table.Td>
													</Table.Tr>
												</Fragment>
											)
										})}
										{products.length === 0 && (
											<Table.Tr h={50}>
												<Table.Td colSpan={10} className="">
													<Box p={20} className="flex justify-center items-center text-sm">
														<div className={"flex flex-col items-center gap-5"}>
															<PackageOpen size={70} className={"text-zinc-500"} />
															<Typography weight={"semibold"} size={"h5"}>
																Không có sản phẩm nào
															</Typography>
														</div>
													</Box>
												</Table.Td>
											</Table.Tr>
										)}
									</Table.Tbody>
								</Table>
							{/*</div>*/}
						{/*</ScrollArea>*/}
					</div>

					{/* Pagination */}
					<div className="flex justify-between items-center mt-4">
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600">
								Hiển thị
							</span>
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
              {itemsPerPage}/0
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

