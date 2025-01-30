"use client"

import EnterpriseResourcePlanningTable from '@component/EnterpriseResourcePlanningTableLayout/table.tsx';
import { DoctorCreationSchema, DoctorSchema } from '@schema/doctor-schema.ts';
import { ActionItemRender, TableRender } from '@type/components/table.type';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import StateStatus from '@component/Status/state-status.tsx';
import DoctorDetail from '@component/Detail/doctor-detail.tsx';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Typography } from '@component/Typography';
import { Button, Combobox, Group, InputBase, LoadingOverlay, Modal, Popover, Select, Stack } from '@mantine/core';
import { Check, ChevronDown, ChevronUp, FilePenLine,
	FileSpreadsheet, LockKeyholeOpen, OctagonX, Plus, RotateCw, Search, Settings, Trash2, Upload } from 'lucide-react';
import useToast from '@hook/client/use-toast-notification.ts';
import { timeout } from '@util/delay.ts';
import { useDisclosure } from '@mantine/hooks';
import { TableDetailModal } from '@component/EnterpriseResourcePlanningTableLayout/table-detail-modal.tsx';
import { cn } from '@ui/tailwind-merge.ts';
import { ProviderModal } from '@component/Modal/provider-modal.tsx';
import { getDoctors, upsertDoctor } from '@api/doctor.ts';
import { Label } from '@component/label';
import { useFilterString } from '@hook/client/use-filter-string.ts';
import { CiSearch } from "react-icons/ci";
import { InvoiceType, PrescriptionCreationSchema, PrescriptionSchema } from '@schema/invoice-schema.ts';
import { CreationProductSchema, Product } from '@schema/product-schema.ts';
import { getProductListWithFilter, updateProduct } from '@api/product.ts';
import ProductDetail from '@component/product/product-detail.tsx';
import { GroupStoreSchema } from '@schema/group-schema.ts';
import { getStoreGroup } from '@api/group.ts';
import { useSearchParams } from '@route/hooks';

type DashboardContextType = {
	activeModal: () => void;
	update: (doctor: CreationSchema) => Promise<void>;
	reset: () => void;
}

const idKey = 'product_id';

type Schema = Product;
type CreationSchema = CreationProductSchema;

export const DashBoardContext = createContext<DashboardContextType>({
	activeModal: () => {},
	update: async () => {},
	reset: () => {}
});

const DashboardToolBox = () => {
	const {activeModal, reset} = useContext(DashBoardContext);
	return (
		<>
			<button
				className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600"
				onClick={activeModal}
			>
				<Plus className="w-4 h-4" />
				<span>Thêm mới</span>
			</button>

			<button
				className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">
				<Upload className="w-4 h-4" />
				<span>Tải lên</span>
			</button>
			<button
				className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">
				<FileSpreadsheet className="w-4 h-4" />
				<span>Xuất Excel</span>
			</button>
			<button
				className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600"
				onClick={reset}
			>
				<RotateCw className="w-4 h-4" />
				<span>Làm mới (F3)</span>
			</button>
		</>
	)
}

export default function ProductDashboardV1({ type }: {type: string}) {
	const { branchId } = useDashboard();
	const [data, setData] = useState<Schema[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const search = useFilterString<Schema>('');
	const filter = useFilterString<Schema>('');
	const orderBy = useFilterString<Schema>(`${idKey}:desc`);
	// const [activeAction]
	const [visibleActionOverlay, { toggle, close: closeActionOverLay, open: openActionOverlay }] = useDisclosure(false);
	const [visibleMainOverlay, { close: closeMainOverlay, open: openMainOverlay }] = useDisclosure(false);

	const [storeGroups, setStoreGroups] = useState<GroupStoreSchema[]>([]);
	const [title, setTitle] = useState('Sản phẩm');

	const [opened, { open, close }] = useDisclosure(false);
	const [activeDetail, setActiveDetail] = useState<Schema | null>(null);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<string | null>(null);

	const toggleDetail = (id: string) =>
		setDetailOpen(
			detailOpen === id ? null : id
		)

	const {showErrorToast, showSuccessToast, showInfoToast, showWarningToast} = useToast();

	const updateOrCreate = useCallback(async (model: CreationSchema) => {
		try {
			setIsUpdating(true);
			openActionOverlay();
			if (model.id) {
				const create = await updateProduct(branchId, model.id, model);
				if (create) {
					showSuccessToast('Cập nhật thông tin sản phẩm thành công');
				}
			}
		} catch (error: any) {
			showErrorToast(error.message);
		} finally {
			setIsUpdating(false);
			closeActionOverLay();
		}
	}, [branchId, showSuccessToast, showErrorToast, openActionOverlay, closeActionOverLay]);

	const resetFilter = () => {
		openMainOverlay();
		getProductListWithFilter(
			{
			branchId,
			page: 1,
			limit: perPage,
			orderBy: 'product_id:desc'
			},
			type
		)
			.then((model) => {
				setTotal(model.total);
				setData(model.data);
				console.log(model);
			})
			.catch((error) => {
				showErrorToast(error.message);
			})
			.finally(() => {
				setTimeout(() => {
					closeMainOverlay();
				}, 300);
			})
	}

	const iconProps = {
		size: 15,
		className: 'text-zinc-600'
	}

	const rowAction: ActionItemRender<Schema>[] = [
		{
			label: (model) =>
				<Group gap={5}>
					<FilePenLine {...iconProps}/> Xem chi tiết
				</Group>,
			action: (model) => {
				setActiveDetail(model);
				open();
			}
		},
		// {
		// 	label: (doctor) => doctor.status === 2
		// 		? <Group gap={5}>
		// 			<LockKeyholeOpen {...iconProps} />
		// 			Khôi phục
		// 		</Group>
		// 		: <Group gap={5}>
		// 			<Trash2 {...iconProps} />
		// 			Xóa
		// 		</Group>,
		// 	action: (doctor) => {
		// 		const newData = data.map((item) => {
		// 			if (item.doctor_id === doctor.doctor_id) {
		// 				item.is_deleted = !item.is_deleted;
		// 				item.status = item.is_deleted ? 2 : 1;
		// 			}
		// 			return item;
		// 		});
		// 		setData(newData);
		// 	}
		// }
	]

	const ActionButton = ({data}: {data: Schema}) => {
		const [opened, setOpened] = useState<boolean>(false);

		return (
			<Popover opened={opened} onChange={setOpened} width={200} position="bottom-end" withArrow shadow="md">
				<Popover.Target>
					<Button onClick={() => setOpened((o) => !o)} size={"sm"} px={5} h={20} color={"var(--main-color)"}>
						<Group gap={5} >
							<Settings size={15} />Thao tác <ChevronDown size={15}/>
						</Group>
					</Button>
				</Popover.Target>
				<Popover.Dropdown p={5} className={"z-20"}>
					<Stack gap={5} pos={"relative"}>
						{rowAction.map((action, index) => (
							<Group
								key={`action-${data[idKey]}-${index}`}
								className={cn('hover:bg-zinc-100 transition-all p-2 py-1 cursor-pointer', isUpdating && 'opacity-50 cursor-not-allowed')}
								gap={5}
								wrap={"nowrap"}
								onClick={() => {
									if (isUpdating) return;
									// setOpened(false);
									action.action(data);
								}}
							>
								{action.icon?.(data)} {action.label(data)}
							</Group>
						))}
					</Stack>
				</Popover.Dropdown>
			</Popover>
		)
	}

	const FilterComponent = () => {
		const searchParams = useSearchParams();
		const [tempStatus, setTempStatus] = useState<string>("");
		const [tempSearch, setTempSearch] = useState<string>("");

		const applySearch = () => {
			search.editFilter("product_name", tempSearch);
		}

		return (
			<Group wrap={"nowrap"}>
				<Label label={"Trạng thái"} position={"top"}>
					<Select
						placeholder="Chọn trạng thái"
						onChange={(value) => {
							if (value === null || value === undefined || value === "") {
								filter.editFilter("status", "");
								return;
							}
							const numerical = Number(value);
							Number.isSafeInteger(numerical) && filter.editFilter("status", value);
						}}
						defaultValue={""}
						data={[
							{
								value: "",
								label: "Tất cả"
							},
							{
								value: "1",
								label: "Kinh doanh"
							}, {
								value: "0",
								label: "Ngưng kinh doanh"
							},
						]}
					/>
				</Label>
				<Label label={"Tìm kiếm"} position={"top"}>
					<Group wrap={"nowrap"} gap={5}>
						<InputBase
							placeholder={`Tìm kiếm theo tên ${title}`}
							className={"w-72"}
							onChange={(event) => 									setTempSearch(event.currentTarget.value)
							}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									applySearch();
								}
							}}
						/>
						<Button
							color={"var(--main-color)"}
							onClick={applySearch}
						>
							<Search className="w-4 h-4 mr-2" />
							Tìm kiếm
						</Button>
					</Group>
				</Label>
			</Group>
		)
	}

	const tableData: TableRender<Schema> = [
		{
			title: 'Mã hàng hóa',
			render: (data) => data.product_id
		},
		{
			title: 'Tên hàng hóa',
			render: (data) => data.product_name
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
					// checked={selectedItems.includes(data.id)}
					// onChange={() => toggleSelectItem(data.id)}
				/>,
		},
		// {
		// 	title: "Hành động",
		// 	render: (data) =>
		// 		<Group gap={6} w={"fit-content"}>
		// 			<ActionButton data={data} />
		// 		</Group>
		// },
		{
			title: "Chi tiết",
			render: (data) => (
				<Button
					onClick={() => toggleDetail(data[idKey])}
					color={"var(--main-color)"}
					size={"md"}
					px={5}
					h={20}
					w={60}
				>
					{detailOpen === data[idKey] ? <ChevronUp size={15} /> : <ChevronDown size={15}/>}
				</Button>
			)
		}
	]

	const filterComponent = [
		<FilterComponent />
	]

	useEffect(() => {
		if (!opened) {
			setActiveDetail(null);
			closeActionOverLay();
		}
	}, [opened]);

	useEffect(() => {
		openMainOverlay();
		getProductListWithFilter(
			{
			branchId,
			page: page,
			limit: perPage,
			filterBy: filter.filter,
			searchFields: search.filter,
			orderBy: orderBy.filter
			},
			type
		)
			.then((model) => {
				setTotal(model.total);
				setData(model.data);
				console.log(model);
			})
			.catch((error) => {
				showErrorToast(error.message);
			})
			.finally(() => {
				setTimeout(() => {
					closeMainOverlay();
				}, 300);
			})
	}, [branchId, filter.filter, search.filter, page, perPage, orderBy.filter]);

	useEffect(() => {
		console.log('page', page);
		console.log('perPage', perPage);
	}, [page, perPage]);

	useEffect(() => {
		if (branchId) {
			getStoreGroup(branchId).then((data) => {
				setStoreGroups(data);
				setTitle(data.find(group => group.group_slug === type)?.group_name || 'Sản phẩm');
			})
		}
	}, [branchId]);

	return (
		<DashBoardContext.Provider value={{
			activeModal: open,
			update: updateOrCreate,
			reset: resetFilter,
		}}>
			{/*<Modal*/}
			{/*	opened={opened}*/}
			{/*	onClose={close}*/}
			{/*	title={*/}
			{/*		<Typography size={"h5"} weight={"semibold"}>Chi tiết bác sĩ</Typography>*/}
			{/*	}*/}
			{/*	size="70vw"*/}
			{/*	maw={"70vw"}*/}
			{/*>*/}
			{/*	<LoadingOverlay visible={visibleActionOverlay} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />*/}
			{/*	{<DoctorDetail<Schema> detail={doctorActiveDetail} submit={updateOrCreateDoctor} />}*/}
			{/*</Modal>*/}
			<EnterpriseResourcePlanningTable<Schema>
				name={`Danh sách ${title}`}
				data={tableData}
				keyName={idKey}
				render={data}
				filter={filterComponent}
				total={total}
				toolBox={<DashboardToolBox />}
				getItem={(page, limit) => {
					console.log('page', page);
					console.log('limit', limit);
					page && setPage(page);
					limit && setPerPage(limit);
				}}
				visibleMainOverlay={visibleMainOverlay}
				detail={(model) =>
					<ProductDetail product={model} type={type} />
				}
				openDetail={detailOpen}

			/>
		</DashBoardContext.Provider>
	)
}