'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	TextInput,
	Select,
	Textarea,
	Radio,
	Button,
	Paper,
	Stack,
	Grid,
	Group,
	Text,
	Box,
	NumberInput,
	ActionIcon,
	Flex,
    Indicator,
	Image,
    SimpleGrid
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconPlus, IconUpload } from '@tabler/icons-react'
import { FileWithPath } from '@mantine/dropzone'
import { CircleMinus, Minus } from 'lucide-react'
import { UploadDropzone } from '@component/upload-dropzone.tsx';

const productSchema = z.object({
	name: z.string().min(1, { message: 'Tên là bắt buộc' }),
	type: z.enum(['thuoc', 'thuc_pham_chuc_nang', 'my_pham', 'dung_cu_y_te', 'hang_hoa_khac']),
	code: z.string(),
	registrationNumber: z.string().min(1, { message: 'Số đăng kí là bắt buộc' }),
	purchasePrice: z.number().nonnegative({ message: 'Giá nhập phải lớn hơn 0' }),
	sellingPrice: z.number().nonnegative({ message: 'Giá bán phải lớn hơn 0' }),
	manufacturer: z.string().min(1, { message: 'Công ty sản xuất là bắt buộc' }),
	usage: z.string().optional(),
	ingredients: z.string().optional(),
	packaging: z.string().optional(),
	activeIngredient: z.string().optional(),
	content: z.string().optional(),
	lotNumber: z.string().min(1, { message: 'Số lô là bắt buộc' }),
	expiryDate: z.date({ required_error: 'Hạn sử dụng là bắt buộc' }),
	quantity: z.number().int().nonnegative({ message: 'Số lượng nhập phải là số nguyên dương' }),
	importDate: z.date({ required_error: 'Ngày nhập hàng là bắt buộc' }),
	useBefore: z.string(),
	vat: z.string(),
	unit: z.enum(['vien', 'vi', 'goi', 'chai', 'lo', 'hop']),
	largerUnit: z.string(),
	largerUnitValue: z.string(),
})

type ProductFormData = z.infer<typeof productSchema>

export type ProductFormProps = {
	onSubmit?: (data: ProductFormData) => void;
	modalProps?: {
		opened?: boolean;
		onClose?: () => void;
	}
}

export default function ProductFormV2({onSubmit, modalProps}: ProductFormProps) {
	const { control, handleSubmit, formState: { errors }, watch, getValues, setValue } = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			type: 'thuoc',
			code: 'HH-0000014',
			useBefore: '30',
			vat: '10',
			unit: 'vien',
			largerUnit: '',
		},
	})
	const [files, setFiles] = useState<FileWithPath[]>([])

	const submit = (data: ProductFormData) => {
		onSubmit && onSubmit(data)
		console.log(data)
	}

	const productType = watch('type')

	const showAdditionalFields = productType === 'thuoc'

	const rightSectionLabel = (section: React.ReactNode|string) => ({
		styles:{
			section: {
				width: 50,
					backgroundColor: 'rgba(128,128,128,0.1)'
			},
		},
		rightSection:(
		 typeof section === "string" ? <Text color={'dark'} size={'sm'} span>{section}</Text> : section
		)
	})

	const addImage = (file: FileWithPath[]) => {
		setFiles((currentFiles) => [...currentFiles, ...file])
	}

	const removeImage = (index: number) => {
		setFiles((currentFiles) => currentFiles.filter((_, i) => i !== index))
	}

	const clearForm = () => {
		setFiles([])
		setValue('name', '')
		setValue('type', 'thuoc')
		setValue('code', 'HH-0000014')
		setValue('registrationNumber', '')
		setValue('purchasePrice', 0)
		setValue('sellingPrice', 0)
		setValue('manufacturer', '')
		setValue('usage', '')
		setValue('ingredients', '')
		setValue('packaging', '')
		setValue('activeIngredient', '')
		setValue('content', '')
		setValue('lotNumber', '')
		setValue('expiryDate', new Date())
		setValue('quantity', 0)
		setValue('importDate', new Date())
		setValue('useBefore', '30')
		setValue('vat', '10')
		setValue('unit', 'vien')
		setValue('largerUnit', '')
		setValue('largerUnitValue', '')
	}

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file)
		return (
			// <Indicator
			// 	inline
			// 	label={
			// 		<span
			// 			onClick={() => removeImage(index)}
			// 			className={'cursor-pointer w-[10px] h-[10px] flex flex-center items-center'}
			// 		>
			// 			<Minus size={16} />
			// 		</span>
			// 	}
			// 	size={24}
			// 	withBorder
			// 	// offset={10}
			// >
				<div className={"w-[100px] h-[100px] aspect-square relative group rounded-md overflow-hidden border border-gray-300"}>
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
			// </Indicator>
		)
	})

	return (
		<Paper maw={1200} mx="auto">
			<form onSubmit={handleSubmit(submit)}>
				<Stack gap="md">
					<Grid>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Tên"
										placeholder="Tìm kiếm hàng hóa"
										required
										error={errors.name?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="registrationNumber"
								control={control}
								render={({ field }) => (
									<TextInput
										label="Số Đăng Kí"
										required
										error={errors.registrationNumber?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
						</Grid.Col>
					</Grid>

					<Flex direction={"row"} align="flex-end" gap={5}>
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
					</Flex>

					{showAdditionalFields && (
						<>
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

							<Controller
								name="packaging"
								control={control}
								render={({ field }) => (
									<Textarea
										label="Quy Cách Đóng Gói"
										error={errors.packaging?.message}
										{...field}
									/>
								)}
							/>

							<Grid>
								<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
									<Controller
										name="activeIngredient"
										control={control}
										render={({ field }) => (
											<TextInput
												label="Hoạt Chất"
												error={errors.activeIngredient?.message}
												{...field}
											/>
										)}
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
									<Controller
										name="content"
										control={control}
										render={({ field }) => (
											<TextInput
												label="Hàm Lượng"
												error={errors.content?.message}
												{...field}
											/>
										)}
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
									<Controller
										name="expiryDate"
										control={control}
										render={({ field }) => (
											<DateInput
												label="Hạn Sử Dụng"
												required
												error={errors.expiryDate?.message}
												locale="vi"
												{...field}
											/>
										)}
									/>
								</Grid.Col>
							</Grid>
						</>
					)}

					<Grid>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							<Controller
								name="importDate"
								control={control}
								render={({ field }) => (
									<DateInput
										label="Ngày nhập hàng"
										required
										error={errors.importDate?.message}
										{...field}
									/>
								)}
							/>
						</Grid.Col>
					</Grid>

					<Grid grow>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							{/*<Group align="flex-end">*/}
								<Controller
									name="useBefore"
									control={control}
									render={({ field }) => (
										<NumberInput
											allowNegative={false}
											label="Sử Dụng Trước"
											// w={100}
											error={errors.useBefore?.message}
											{...field}
											{...rightSectionLabel('Ngày')}
										/>
									)}
								/>
							{/*</Group>*/}
							<Controller
								name="vat"
								control={control}
								render={({ field }) => (
									<TextInput
										label="VAT"
										error={errors.vat?.message}
										{...field}
									/>
								)}
							/>
							<Box>
								<Text fw={500} mb="xs">Đơn vị</Text>
								<Grid grow>
									<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
										<Controller
											name="unit"
											control={control}
											render={({ field }) => (
												<Select
													// w={"100%"}
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
									</Grid.Col>
									<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
										<Controller
											name="largerUnit"
											control={control}
											render={({ field }) => (
												<TextInput
													// w={100}
													error={errors.largerUnitValue?.message}
													{...field}
													{...rightSectionLabel('Viên')}
												/>
											)}
										/>
									</Grid.Col>
									{/*<ActionIcon variant="outline">*/}
									{/*	<IconPlus size={16} />*/}
									{/*</ActionIcon>*/}
								</Grid>
							</Box>

						</Grid.Col>
						<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
							{/*<Stack justify="start" align={'start'} gap="xl" bd={1}>*/}
								{/*{files.length > 0 && (*/}
									<SimpleGrid cols={{ base: 1, sm: 3 }} mt={'lg'}>
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
								{/*)}*/}
							{/*</Stack>*/}
						</Grid.Col>
					</Grid>

					{/*<Box>*/}
					{/*	<Text fw={500} mb="xs">Đơn Vị Nhỏ Nhất <Text span c="red">*</Text></Text>*/}
					{/*	<Controller*/}
					{/*		name="unit"*/}
					{/*		control={control}*/}
					{/*		render={({ field }) => (*/}
					{/*			<Radio.Group*/}
					{/*				error={errors.unit?.message}*/}
					{/*				{...field}*/}
					{/*			>*/}
					{/*				<Group>*/}
					{/*					<Radio value="vien" label="Viên" />*/}
					{/*					<Radio value="vi" label="Vỉ" />*/}
					{/*					<Radio value="goi" label="Gói" />*/}
					{/*					<Radio value="chai" label="Chai" />*/}
					{/*					<Radio value="lo" label="Lọ" />*/}
					{/*					<Radio value="hop" label="Hộp" />*/}
					{/*				</Group>*/}
					{/*			</Radio.Group>*/}
					{/*		)}*/}
					{/*	/>*/}
					{/*</Box>*/}


					<Flex justify="space-between" pt="md" className="border-t">
						<Button onClick={() => {
							clearForm()
							modalProps?.onClose && modalProps.onClose()
						}} variant="outline" type="button" color={'teal'}>
							Hủy bỏ
						</Button>
						<Group>
							{/*<Button variant="outline" leftSection={<IconUpload size={16} />} type="button">*/}
							{/*	Tải ảnh*/}
							{/*</Button>*/}
							<Button type="submit" color="teal">
								Đồng ý
							</Button>
						</Group>
					</Flex>
				</Stack>
			</form>
		</Paper>
	)
}

