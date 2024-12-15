'use client'

import { useState } from 'react'
import { Tabs, TextInput, NumberInput, Select, Button, Group, Stack, Text, Image, SimpleGrid, Indicator, ScrollArea, Flex } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { UploadDropzone } from '@component/upload-dropzone.tsx';
import { Minus } from 'lucide-react'
import { TextEditor } from '@component/text-editor.tsx';

export default function ProductForm() {
	const [files, setFiles] = useState<FileWithPath[]>([])
	const [activeTab, setActiveTab] = useState('info')

	const addImage = (file: FileWithPath[]) => {
		setFiles((currentFiles) => [...currentFiles, ...file])
	}

	const removeImage = (index: number) => {
		setFiles((currentFiles) => currentFiles.filter((_, i) => i !== index))
	}

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file)
		return (
			<Indicator
				inline
				label={
					<span
						onClick={() => removeImage(index)}
						className={'cursor-pointer'}
					>
						<Minus />
					</span>
				}
				size={24}
				withBorder
			>
				<Image
					key={index}
					src={imageUrl}
					onLoad={() => URL.revokeObjectURL(imageUrl)}
					className="w-[120px] h-[120px] rounded border border-gray-300"
				/>
			</Indicator>
		)
	})

	const onTabChange = (tab: string|null) => {
		if (tab) {
			setActiveTab(tab)
		}
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<Tabs value={activeTab} onChange={onTabChange}>
				<Tabs.List>
					<Tabs.Tab value="info">Thông tin</Tabs.Tab>
					<Tabs.Tab value="details">Chi tiết hàng hóa</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="info" pt="md">
					<Stack gap={'md'}>
						<Group grow>
							<TextInput label="Mã hàng hóa" placeholder="HH478732" />
							<TextInput label="Mã vạch" />
						</Group>

						<TextInput label="Tên hàng" required />

						<Group grow>
							<NumberInput
								label="Giá vốn"
								defaultValue={0}
								min={0}
							/>
							<NumberInput
								label="Giá bán cơ bản"
								defaultValue={0}
								min={0}
							/>
						</Group>

						<div>
							<Text size="sm" fw={500} mb={4}>
								Hình ảnh sản phẩm
							</Text>

							<Stack justify="start" align={'start'} gap="xl" bd={1}>
								{files.length > 0 && (
									<SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
										{previews}
									</SimpleGrid>
								)}
								<UploadDropzone
									h={70}
									w={70}
									accept={['image/png', 'image/jpeg', 'image/gif']}
									maxFiles={1}
									onDrop={addImage}
									className="cursor-pointer rounded-md border !border-dashed hover:bg-zinc-200 transition-colors flex justify-center items-center"
								/>
							</Stack>
						</div>

						<Select
							label="Đơn vị cơ bản"
							placeholder="Chọn đơn vị"
							data={[
								{ value: 'cai', label: 'Cái' },
								{ value: 'chiec', label: 'Chiếc' },
								{ value: 'bo', label: 'Bộ' },
							]}
						/>
					</Stack>
				</Tabs.Panel>

				<Tabs.Panel value="details" pt="md">
					<Stack gap="md">
						<Group grow>
							<Select
								label="Nhóm"
								placeholder="Chọn nhóm"
								data={[
									{ value: 'electronics', label: 'Điện tử' },
									{ value: 'clothing', label: 'Thời trang' },
								]}
							/>
							<Select
								label="Vị trí"
								placeholder="Chọn vị trí"
								data={[
									{ value: 'warehouse1', label: 'Kho 1' },
									{ value: 'warehouse2', label: 'Kho 2' },
								]}
							/>
						</Group>

						<Group grow>
							<NumberInput
								label="Định mức tồn tối thiểu"
								defaultValue={0}
								min={0}
							/>
							<NumberInput
								label="Định mức tồn tối đa"
								defaultValue={0}
								min={0}
							/>
						</Group>

						<div>
							<Text size="sm" fw={500} mb={4}>
								Mô tả
							</Text>
							<TextEditor />
						</div>

					</Stack>
				</Tabs.Panel>
			</Tabs>

			<Group justify="right" mt="xl">
				<Button variant="default">Bỏ qua</Button>
				<Button color="teal">Lưu</Button>
			</Group>
		</div>
	)
}

