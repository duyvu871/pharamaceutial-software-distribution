"use client";


import EnterpriseResourcePlanningTable from '@component/EnterpriseResourcePlanningTableLayout/table.tsx';
import { ActionItemRender, TableRender } from '@type/components/table.type';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Typography } from '@component/Typography';
import { Button, Combobox, Group, InputBase, LoadingOverlay, Modal, Popover, Stack } from '@mantine/core';
import { Check, ChevronDown, FilePenLine,
	FileSpreadsheet, LockKeyholeOpen, OctagonX, Plus, RotateCw, Settings, Trash2, Upload } from 'lucide-react';
import useToast from '@hook/client/use-toast-notification.ts';

import { useDisclosure } from '@mantine/hooks';
import { cn } from '@ui/tailwind-merge.ts';
import { ImportInvoiceProductSchema } from '@schema/import-schema.ts';
import { Product } from '@schema/product-schema.ts';
import { getImportByProduct } from '@api/import.ts';
import dayjs from 'dayjs';

export type InventoryLedgerDetailProps = {
	product: Product
}

type DashboardContextType = {
	activeModal: () => void;
	update: (doctor: CreationSchema) => Promise<void>;
}

export const SchemaDashBoardContext = createContext<DashboardContextType>({
	activeModal: () => {},
	update: async () => {}
});

const idKey = 'id';

type Schema = ImportInvoiceProductSchema;
type CreationSchema = ImportInvoiceProductSchema;

const DashboardToolBox = () => {
	const {activeModal} = useContext(SchemaDashBoardContext);
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

			>
				<RotateCw className="w-4 h-4" />
				<span>Làm mới</span>
			</button>
		</>
	)
}

export function InventoryLedgerDetail({product}: InventoryLedgerDetailProps) {
	const { branchId } = useDashboard();
	const [data, setData] = useState<Schema[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [search, setSearch] = useState<string>('');
	const [filter, setFilter] = useState<string>('');
	const [orderBy, setOrderBy] = useState<string>(`${idKey}:desc`);

	const [visibleActionOverlay, { toggle, close: closeActionOverLay, open: openActionOverlay }] = useDisclosure(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [modelActiveDetail, setModelActiveDetail] = useState<Schema | null>(null);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<string | null>(null);

	const {showErrorToast, showSuccessToast, showInfoToast, showWarningToast} = useToast();

	const updateOrCreate = useCallback(async (data: CreationSchema) => {}, []);

	const iconProps = {
		size: 15,
		className: 'text-zinc-600'
	}

	const rowAction: ActionItemRender<Schema>[] = [
		{
			label: (doctor) =>
				<Group gap={5}>
					<FilePenLine {...iconProps}/> Xem chi tiết
				</Group>,
			action: (model) => {
				setModelActiveDetail(model);
				open();
			}
		},
		{
			label: (doctor) =>
				<Group gap={5}>
					<Trash2 {...iconProps} />
					Xóa
				</Group>,
			action: (doctor) => {
				const newData = data.filter((item) => item[idKey] !== doctor[idKey]);
				setData(newData);
			}
		}
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

	const tableData: TableRender<Schema> = [
		{
			title: "Sản phẩm",
			render: (data) => data.product?.product_name || ""
		},
		{
			title: "Ngày nhập",
			render: (data) => dayjs(data.import_date).format("DD/MM/YYYY")
		},
		{
			title: "Số lượng",
			render: (data) => data.quantity
		},
		{
			title: "Đơn giá",
			render: (data) => data.price.toLocaleString() + "đ"
		},
		{
			title: "Thành tiền",
			render: (data) => data.total.toLocaleString() + "đ"
		},
		// {
		// 	title: "Hành động",
		// 	render: (data) => <ActionButton data={data} />
		// }
	]

	useEffect(() => {
		if (!opened) {
			setModelActiveDetail(null);
			closeActionOverLay();
		}
	}, [opened]);

	useEffect(() => {
		getImportByProduct(
			product.id,
			{
				branchId,
				page: page,
				limit: perPage,
				filterBy: filter,
				searchFields: search,
				orderBy: orderBy
			}
		)
			.then((paginate) => {
				setTotal(paginate.total);
				setData(paginate.data);
			})
			.catch((error) => {
				showErrorToast(error.message);
			})
	}, [branchId, filter, search, page, perPage, orderBy]);

	return (
		<SchemaDashBoardContext.Provider value={{
			activeModal: open,
			update: updateOrCreate
		}}>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={"h5"} weight={"semibold"}>Chi tiết khách hàng</Typography>
				}
				size="70vw"
				maw={"70vw"}
			>
				<LoadingOverlay visible={visibleActionOverlay} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
				{/*{<DoctorDetail detail={modelActiveDetail} submit={updateOrCreate} />}*/}
			</Modal>
			<EnterpriseResourcePlanningTable<Schema>
				name={"Danh sách thẻ kho"}
				data={tableData}
				keyName={idKey}
				render={data}
				filter={[]}
				total={total}
				// toolBox={<DashboardToolBox />}
				getItem={(page, limit) => {
					page && setPage(page);
					limit && setPerPage(limit);
				}}
				// detail={(doctor) => <DoctorDetail detail={doctor} />}
				// openDetail={detailOpen}
			/>
		</SchemaDashBoardContext.Provider>
	)
}