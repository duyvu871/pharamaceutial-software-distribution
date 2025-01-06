'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	TextInput,
	Select,
	Textarea,
	Button,
	Paper,
	Stack,
	Grid,
	Group,
	Text,
	Box,
	NumberInput,
	Flex,
	Image,
	SimpleGrid,
    Radio
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconPlus, IconUpload } from '@tabler/icons-react'
import { FileWithPath } from '@mantine/dropzone'
import { CircleMinus, Minus } from 'lucide-react'
import { UploadDropzone } from '@component/upload-dropzone.tsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Typography } from '@component/Typography';
import { useAtom } from 'jotai'
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { ProductFormData, productFormSchema } from '@schema/product-schema'
import {
	importProductActionAtom, importProductActiveTabActionAtom,
	importProductActiveTabAtom,
	importProductAtom,
} from '@store/state/overview/import-product.ts';
import { useImportProductState } from '@hook/dashboard/import/use-import-product-state.ts';
import { Label } from '@component/label'
import ProductAutocomplete from '@component/product-search.tsx';
import { useImportProductForm } from '@hook/dashboard/import/use-import-product-form.ts';
dayjs.extend(customParseFormat);

export type ProductFormProps = {
	onSubmit?: (data: ProductFormData) => void;
	modalProps?: {
		opened?: boolean;
		onClose?: () => void;
	}
}

export default function ProductFormV3({ onSubmit, modalProps }: ProductFormProps) {
	// const { control, handleSubmit, formState: { errors }, watch, getValues, setValue } = useForm<ProductFormData>({
	// 	resolver: zodResolver(productFormSchema),
	// 	defaultValues: {
	// 		type: 'thuoc',
	// 		code: 'HH-0000014',
	// 		useBefore: '30',
	// 		vat: '10',
	// 		unit: 'vien',
	// 		largerUnit: '10',
	// 	},
	// })

	const {useForm, resetForm} = useImportProductForm();
	const {addProductItem, activeTab: importActiveTab, removeProductItem} = useImportProductState();

	const { control, handleSubmit, formState: { errors }, watch, getValues, setValue } = useForm;
	const [files, setFiles] = useState<FileWithPath[]>([])
	const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab] = useAtom(invoiceActiveTabActionAtom);

	// const [importProducts, setImportProducts] = useAtom(importProductAtom);
	// const [activeTabStoreFullForm, setActiveTabStoreFullForm] = useAtom(importProductActiveTabAtom)
	// const [, importProductActions] = useAtom(importProductActionAtom);
	// const [, importProductActiveTabActions] = useAtom(importProductActiveTabActionAtom);


	const submit = (data: ProductFormData) => {
		onSubmit && onSubmit(data)
		console.log(data)
		addProductItem(importActiveTab, data)
		invoiceDispatch({
			type: 'add-item',
			id: activeTab,
			item: {
				note: data.notes,
				productName: data.name,
				quantity: data.quantity,
				price: data.sellingPrice,
				total: data.sellingPrice * data.quantity,
				unit: data.unit,
				id: data.code,
			}
		});
		// importDispatch({
		// 	type: 'add',
		// 	// id: activeTab,
		// 	// product: data
		// });
	}

	const clearForm = () => {
		setFiles([])
		resetForm()
	}

	const productType = watch('type')

	const showAdditionalFields = productType === 'thuoc'

	const rightSectionLabel = (section: React.ReactNode | string) => ({
		styles: {
			section: {
				width: 50,
				backgroundColor: 'rgba(128,128,128,0.1)'
			},
		},
		rightSection: (
			typeof section === "string" ? <Text color={'dark'} size={'sm'} span>{section}</Text> : section
		)
	})

	const addImage = (file: FileWithPath[]) => {
		setFiles((currentFiles) => [...currentFiles, ...file])
	}

	const removeImage = (index: number) => {
		setFiles((currentFiles) => currentFiles.filter((_, i) => i !== index))
	}

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file)
		return (
			<div className={"w-[100px] h-[100px] aspect-square relative group overflow-hidden border border-gray-300"}>
				<div className={"rounded-md w-[100px] h-[100px] bg-opacity-0 group-hover:bg-zinc-300/30 aspect-square absolute transition-colors"}>
					<div className={"flex justify-center items-center w-full h-full"}>
                        <span className={"block"} onClick={() => removeImage(index)}>
                            <CircleMinus size={32} className={"cursor-pointer  opacity-0 group-hover:opacity-100 text-zinc-500 transition-colors"} />
                        </span>
					</div>
				</div>
				<Image
					key={index}
					src={imageUrl}
					onLoad={() => URL.revokeObjectURL(imageUrl)}
					h={100}
					w={100}
					fit="contain"
					className="rounded"
				/>
			</div>
		)
	})

	return (
		<Paper w={"100%"} className={"p-5"}>
			<form onSubmit={handleSubmit(submit)}>
				<Stack gap="md">
					<Grid>
						{/* Row 1: Required Fields */}
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Group wrap={"nowrap"}>
								<Box w={"100%"}>
									<Controller
										name="name"
										control={control}
										render={({ field }) => (
											// <TextInput
											// 	label="Tên"
											// 	placeholder="Tìm kiếm hàng hóa"
											// 	required
											// 	error={errors.name?.message}
											// 	{...field}
											// />
											<ProductAutocomplete
													label="Tên"
													placeholder="Tìm kiếm hàng hóa"
													required
													error={errors.name?.message}
													{...field}
													onSelectProduct={(product) => {
														setValue('name', product.product_name)
														setValue('code', product.product_id || 'HH-0000014')
														setValue('registrationNumber', product.register_no || '')
														setValue('manufacturer', product.manufacturer || '')
														setValue('expiryDate', dayjs(product.expire_date, 'YYYY-MM-DD').toDate())
														setValue('purchasePrice', product.original_price)
														setValue('sellingPrice', product.sell_price)
														setValue('quantity', product.quantity_of_stock)
														// setValue('activeIngredient', product.drug_ingredients || '')
														setValue('content', product.drug_content || '')
														setValue('usage', product.drug_usage || '')
														setValue('ingredients', product.drug_ingredients || '')
														setValue('packaging', product.drug_packaging || '')
														setValue('lotNumber', product.product_no)
														// setValue('unit', product.productUnit.name || 'vien')
														// setValue('largerUnit', product.productUnit.no)
														// setValue('largerUnitValue', product.larger_unit_value)
													}}
											/>
										)}
									/>
								</Box>
								<Box w={"100%"}>
									<Controller
										name="type"
										control={control}
										render={({ field }) => (
											<Select
												label="Kiểu Hàng Hóa"
												data={[
													{ value: 'thuoc', label: 'Thuốc' },
													{ value: 'thuc_pham_chuc_nang', label: 'Thực phẩm chức năng' },
													{ value: 'my_pham', label: 'Mỹ phẩm' },
													{ value: 'dung_cu_y_te', label: 'Dụng cụ y tế' },
													{ value: 'hang_hoa_khac', label: 'Hàng hóa khác' },
												]}
												error={errors.type?.message}
												{...field}
											/>
										)}
									/>
								</Box>
							</Group>

						</Grid.Col>
						{/*<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>*/}

						{/*</Grid.Col>*/}
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Group wrap={"nowrap"}>
								<Box w={"100%"}>
									<Controller
										name="registrationNumber"
										control={control}
										render={({ field }) => (
											<TextInput
												label="Số Đăng Kí"
												// required
												error={errors.registrationNumber?.message}
												{...field}
											/>
										)}
									/>
								</Box>
								<Box w={"100%"}>
									<Controller
										name="code"
										control={control}
										render={({ field }) => (
											<TextInput
												label="Mã Thuốc"
												readOnly
												{...field}
											/>
										)}
									/>
								</Box>
							</Group>

						</Grid.Col>
						{/*<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>*/}
						{/*	<Controller*/}
						{/*		name="code"*/}
						{/*		control={control}*/}
						{/*		render={({ field }) => (*/}
						{/*			<TextInput*/}
						{/*				label="Mã Thuốc"*/}
						{/*				readOnly*/}
						{/*				{...field}*/}
						{/*			/>*/}
						{/*		)}*/}
						{/*	/>*/}
						{/*</Grid.Col>*/}
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Group wrap={'nowrap'}>
								<Box w={"100%"}>
									<Controller
										name="purchasePrice"
										control={control}
										render={({ field }) => (
											<NumberInput
												label="Giá Nhập"
												allowNegative={false}
												required
												error={errors.purchasePrice?.message}
												{...field}
											/>
										)}
									/>
								</Box>
								<Box w={"100%"}>
									<Controller
										name="sellingPrice"
										control={control}
										render={({ field }) => (
											<NumberInput
												allowNegative={false}
												label="Giá Bán"
												required
												error={errors.sellingPrice?.message}
												{...field}
											/>
										)}
									/>
								</Box>
							</Group>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>

						</Grid.Col>

					</Grid>

					<Grid>
						{/* Row 2: Manufacturer and Additional Fields (if applicable) */}
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Stack>
								<Group wrap={"nowrap"}>
									<Box w={"100%"}>
										<Controller
											name="manufacturer"
											control={control}
											render={({ field }) => (
												<TextInput
													label="Công Ty Sản Xuất"
													placeholder="Nhập tên công ty sản xuất"
													required
													color={"teal"}
													error={errors.manufacturer?.message}
													{...field}
												/>
											)}
										/>
									</Box>
									{/*<Box>*/}
									{/*	<ActionIcon variant="filled" color="teal" size="lg">*/}
									{/*		<IconPlus size={16} />*/}
									{/*	</ActionIcon>*/}
									{/*</Box>*/}
									<Box w={"100%"}>
										<Controller
											name="expiryDate"
											control={control}
											render={({ field }) => (
												<DateInput
													label="Hạn Sử Dụng"
													required
													error={errors.expiryDate?.message}
													{...field}
													locale="vi"
													valueFormat={"DD/MM/YYYY"}
												/>
											)}
										/>

									</Box>
								</Group>
								<Group wrap={"nowrap"}>
									{showAdditionalFields && (
										<>
											<Box w={"100%"}>
												<Controller
													name="usage"
													control={control}
													render={({ field }) => (
														<Textarea
															label="Liều Dùng"
															error={errors.usage?.message}
															{...field}
														/>
													)}
												/>
											</Box>
											<Box w={"100%"}>
												<Controller
													name="ingredients"
													control={control}
													render={({ field }) => (
														<Textarea
															label="Thành Phần"
															error={errors.ingredients?.message}
															{...field}
														/>
													)}
												/>
											</Box>
										</>
									)}
								</Group>
							</Stack>
						</Grid.Col>

						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Stack>
								<Group wrap={"nowrap"}>
									<Box w={"100%"}>
										<Controller
											name="lotNumber"
											control={control}
											render={({ field }) => (
												<TextInput
													label="Số Lô"
													required
													error={errors.lotNumber?.message}
													{...field}
												/>
											)}
										/>
									</Box>
									<Box w={"100%"}>
										<Controller
											name="quantity"
											control={control}
											render={({ field }) => (
												<NumberInput
													label="Số Lượng Nhập"
													allowNegative={false}
													required
													error={errors.quantity?.message}
													{...field}
												/>
											)}
										/>
									</Box>
								</Group>
								<Group wrap={"nowrap"}>
									{showAdditionalFields && (
										<>
											<Box w={"100%"}>
												<Controller
													name="activeIngredient"
													control={control}
													render={({ field }) => (
														<Textarea
															label="Hoạt Chất"
															error={errors.activeIngredient?.message}
															{...field}
														/>
													)}
												/>
											</Box>
											<Box w={"100%"}>
												<Controller
													name="content"
													control={control}
													render={({ field }) => (
														<Textarea
															label="Hàm Lượng"
															error={errors.content?.message}
															{...field}
														/>
													)}
												/>
											</Box>
										</>
									)}
								</Group>
							</Stack>
						</Grid.Col>
						{showAdditionalFields && (
							<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
								<Box w={"100%"}>
									<Controller
										name="packaging"
										control={control}
										render={({ field }) => (
											<Textarea
												label="Quy Cách Đóng Gói"
												rows={1}
												error={errors.packaging?.message}
												{...field}
											/>
										)}
									/>
								</Box>
							</Grid.Col>
						)}
						{/*<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>*/}

						{/*</Grid.Col>*/}

						{/*{showAdditionalFields && (*/}
						{/*	<Grid.Col span={{ base: 12, sm: 6, md: 8 }}>*/}
						{/*		<Flex gap={"md"}>*/}
						{/*			<Box w={"100%"}>*/}
						{/*				<Controller*/}
						{/*					name="usage"*/}
						{/*					control={control}*/}
						{/*					render={({ field }) => (*/}
						{/*						<Textarea*/}
						{/*							label="Liều Dùng"*/}
						{/*							error={errors.usage?.message}*/}
						{/*							{...field}*/}
						{/*						/>*/}
						{/*					)}*/}
						{/*				/>*/}
						{/*			</Box>*/}
						{/*			<Box w={"100%"}>*/}
						{/*				<Controller*/}
						{/*					name="ingredients"*/}
						{/*					control={control}*/}
						{/*					render={({ field }) => (*/}
						{/*						<Textarea*/}
						{/*							label="Thành Phần"*/}
						{/*							error={errors.ingredients?.message}*/}
						{/*							{...field}*/}
						{/*						/>*/}
						{/*					)}*/}
						{/*				/>*/}
						{/*			</Box>*/}
						{/*			<Box w={"100%"}>*/}
						{/*				<Controller*/}
						{/*					name="packaging"*/}
						{/*					control={control}*/}
						{/*					render={({ field }) => (*/}
						{/*						<Textarea*/}
						{/*							label="Quy Cách Đóng Gói"*/}
						{/*							error={errors.packaging?.message}*/}
						{/*							{...field}*/}
						{/*						/>*/}
						{/*					)}*/}
						{/*				/>*/}
						{/*			</Box>*/}
						{/*		</Flex>*/}
						{/*		<Flex gap={'md'}>*/}
						{/*			<Box w={"100%"}>*/}
						{/*				<Controller*/}
						{/*					name="activeIngredient"*/}
						{/*					control={control}*/}
						{/*					render={({ field }) => (*/}
						{/*						<TextInput*/}
						{/*							label="Hoạt Chất"*/}
						{/*							error={errors.activeIngredient?.message}*/}
						{/*							{...field}*/}
						{/*						/>*/}
						{/*					)}*/}
						{/*				/>*/}
						{/*			</Box>*/}
						{/*			<Box w={"100%"}>*/}
						{/*				<Controller*/}
						{/*					name="content"*/}
						{/*					control={control}*/}
						{/*					render={({ field }) => (*/}
						{/*						<TextInput*/}
						{/*							label="Hàm Lượng"*/}
						{/*							error={errors.content?.message}*/}
						{/*							{...field}*/}
						{/*						/>*/}
						{/*					)}*/}
						{/*				/>*/}
						{/*			</Box>*/}

						{/*		</Flex>*/}
						{/*	</Grid.Col>*/}
						{/*)}*/}

						{/*{showAdditionalFields && (*/}
						{/*	<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>*/}

						{/*	</Grid.Col>*/}
						{/*)}*/}
					</Grid>

					<Grid grow>
						{/* Row 3: Lot Number, Quantity, Import Date, Use Before, VAT, Unit */}
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Stack >
								<Box>
									<Typography size={"sm"} weight={"semibold"}>Đơn vị nhỏ nhất<Text span c="red"> *</Text></Typography>
									<Controller
										name="unit"
										control={control}
										render={({ field }) => (
											<Radio.Group
												error={errors.unit?.message}
												required
												{...field}
											>
												<Group>
													<Radio value="vien" label="Viên" />
													<Radio value="vi" label="Vỉ" />
													<Radio value="goi" label="Gói" />
													<Radio value="chai" label="Chai" />
													<Radio value="lo" label="Lọ" />
													<Radio value="hop" label="Hộp" />
												</Group>
											</Radio.Group>
										)}
									/>
								</Box>
								<Box>
									{/*<Typography>Đơn vị nhỏ nhất</Typography>*/}
									<Label position={"top"} label={"Đơn vị to hơn (nếu có)"} size={"xs"} classNames={{label: "mb-2"}}>
										<Grid grow>
											<Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
												<Group wrap={"nowrap"}>
													<Box w={"100%"}>
														<Controller
															name="largerUnit"
															control={control}
															render={({ field }) => (
																<Select
																	data={[
																		{ value: 'lo', label: 'Lọ' },
																		{ value: 'vien', label: 'Viên' },
																		{ value: 'vi', label: 'Vỉ' },
																		{ value: 'goi', label: 'Gói' },
																		{ value: 'chai', label: 'Chai' },
																		{ value: 'hop', label: 'Hộp' },
																		{ value: 'thung', label: 'Thùng' },
																		{ value: 'cai', label: 'Cái' },
																	]}
																	defaultValue={"vien"}
																	error={errors.largerUnit?.message}
																	{...field}
																	{...rightSectionLabel('Đơn vị')}
																/>
															)}
														/>
													</Box>
													<Box>
														<Typography size={"h5"} weight={"semibold"}>=</Typography>
													</Box>
													<Box w={"100%"}>
														<Controller
															name="largerUnitValue"
															control={control}
															render={({ field }) => (
																<NumberInput
																	error={errors.largerUnitValue?.message}
																	{...field}
																	{...rightSectionLabel('Viên')}
																/>
															)}
														/>
													</Box>
												</Group>
											</Grid.Col>
											{/*<Grid.Col span={{ base: 12, sm: 6, md: 6 }}>*/}

											{/*</Grid.Col>*/}
										</Grid>
									</Label>
								</Box>
							</Stack>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Box w={"100%"}>
								{/*<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>*/}

									<Label label={"Ảnh sản phẩm"} position={"top"} size={"xs"} classNames={{label: ""}}>
										<SimpleGrid maw={(100 + 20)*4} cols={{ base: 1, sm: 4 }} >
											{previews}
											<UploadDropzone
												h={100}
												w={100}
												accept={['image/png', 'image/jpeg', 'image/gif']}
												maxFiles={1}
												onDrop={addImage}
												className="cursor-pointer rounded-md border-2 !border-dashed hover:bg-zinc-200 transition-colors flex justify-center items-center"
											/>
										</SimpleGrid>
									</Label>
								{/*</Grid.Col>*/}
							</Box>
						</Grid.Col>
					</Grid>

					<Flex justify="space-between" pt="md" className="border-t">
						<Button onClick={() => {
							clearForm()
							modalProps?.onClose && modalProps.onClose()
						}} variant="outline" type="button" color={'var(--teal-color)'}>
							Hủy bỏ / làm mới
						</Button>
						<Group>
							<Button type="submit" color="var(--teal-color)">
								Thêm
							</Button>
						</Group>
					</Flex>
				</Stack>
			</form>
		</Paper>
	)
}

