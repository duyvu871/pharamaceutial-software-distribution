"use client"

import EnterpriseResourcePlanningTable from '@component/EnterpriseResourcePlanningTableLayout/table.tsx';
import { DoctorCreationSchema, DoctorSchema } from '@schema/doctor-schema.ts';
import { ActionItemRender, TableRender } from '@type/components/table.type';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import StateStatus from '@component/Status/state-status.tsx';
import DoctorDetail from '@component/Detail/doctor-detail.tsx';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Typography } from '@component/Typography';
import { Button, Combobox, Group, InputBase, LoadingOverlay, Modal, Popover, Stack } from '@mantine/core';
import { Check, ChevronDown, FilePenLine,
	FileSpreadsheet, LockKeyholeOpen, OctagonX, Plus, RotateCw, Settings, Trash2, Upload } from 'lucide-react';
import useToast from '@hook/client/use-toast-notification.ts';
import { timeout } from '@util/delay.ts';
import { useDisclosure } from '@mantine/hooks';
import { TableDetailModal } from '@component/EnterpriseResourcePlanningTableLayout/table-detail-modal.tsx';
import { cn } from '@ui/tailwind-merge.ts';
import { ProviderModal } from '@component/Modal/provider-modal.tsx';
import { getDoctors, upsertDoctor } from '@api/doctor.ts';
import { ConsumerAttributes, ConsumerCreationAttributes } from '@schema/consumer-schema.ts';
import { genderVi } from '@global/locale.ts';
import { AddCustomerModal } from '@component/Modal/add-new-consumer.tsx';
import { upsertMembership } from '@api/membership.ts';
import { CreationMembershipSchema } from '@schema/membership-schema.ts';
import { createConsumer, getConsumerList, getConsumerListV2 } from '@api/consumer.ts';


type DashboardContextType = {
	activeModal: () => void;
	update: (doctor: CreationSchema) => Promise<void>;
}

export const SchemaDashBoardContext = createContext<DashboardContextType>({
	activeModal: () => {},
	update: async () => {}
});

const idKey = 'consumer_id';

type Schema = ConsumerAttributes;
type CreationSchema = ConsumerCreationAttributes;

const DoctorDashboardToolBox = () => {
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

export default function DoctorDashboard() {
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
	const [modelActiveDetail, setModelActiveDetail] = useState<ConsumerAttributes | null>(null);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<string | null>(null);

	const toggleDetail = (id: string) =>
		setDetailOpen(
			detailOpen === id ? null : id
		)


	const {showErrorToast, showSuccessToast, showInfoToast, showWarningToast} = useToast();

	const updateOrCreate = useCallback(async (data: CreationSchema) => {
		try {

			setIsUpdating(true);
			openActionOverlay();
			const update = await createConsumer(branchId, data);
			if (data.id) {
				setData(prev => prev.map(item => (item[idKey] === data[idKey]) ? {...item,...data} : item));
			} else {
				setData(prev => [update, ...prev]);
				setTotal(total => total + 1);
			}
			console.log(update);
			showSuccessToast(`Cập nhật khách hàng ${update[idKey]} thành công`);

			closeActionOverLay();
		} catch (error: any) {
			showErrorToast(error.message);
		} finally {
			setIsUpdating(false);
		}
	}, [branchId, showSuccessToast, showErrorToast, openActionOverlay, closeActionOverLay]);

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
								key={`action-${data.consumer_id}-${index}`}
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

	const tableData: TableRender<ConsumerAttributes> = [
		{
			title: 'Tên khách hàng',
			render: (consumer) => consumer.consumer_name
		},
		{
			title: 'Số điện thoại',
			render: (consumer) => consumer.phone_number
		},
		{
			title: 'Email',
			render: (consumer) => consumer.consumer_email
		},
		{
			title: 'Tích điểm',
			render: (consumer) =>  (
				<Typography weight={"semibold"} className={"text-blue-500"}>
					{consumer.point}
				</Typography>
			)
		},
		{
			title: 'Tổng doanh số',
			render: (consumer) => (
				<Typography className={cn(`font-semibold ${Number(consumer.revenue) > 0 ? 'text-green-600' : 'text-zinc-700'}`)}>
					{Number(consumer.revenue).toLocaleString('vi-VN')} ₫
				</Typography>
			)
		},
		{
			title: 'Nợ',
			render: (consumer) => (
				<Typography className={cn(`font-semibold ${Number(consumer.debit) > 0 ? 'text-red-400' : 'text-zinc-700'}`)}>
					{Number(consumer.debit).toLocaleString('vi-VN')} ₫
				</Typography>
			)
		},
		{
			title: 'Giới tính',
			render: (consumer) => consumer.gender ? genderVi[consumer.gender] : ""
		},
		{
			title: 'Địa chỉ',
			render: (consumer) => consumer.address
		},
		{
			title: "Hành động",
			render: (data) => <ActionButton data={data} />
		}
	]


	const filterComponent = [

	]

	useEffect(() => {
		if (!opened) {
			setModelActiveDetail(null);
			closeActionOverLay();
		}
	}, [opened]);

	useEffect(() => {
		getConsumerListV2({
			branchId,
			page: page,
			limit: perPage,
			filterBy: filter,
			searchFields: search,
			orderBy: orderBy
		})
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
			<EnterpriseResourcePlanningTable<ConsumerAttributes>
				name={"Danh sách khách hàng"}
				data={tableData}
				keyName={"consumer_id"}
				render={data}
				filter={[]}
				total={total}
				toolBox={<DoctorDashboardToolBox />}
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