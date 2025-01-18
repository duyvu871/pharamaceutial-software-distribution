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
import { Check, ChevronDown, FilePenLine,
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

type DashboardContextType = {
	activeModal: () => void;
	updateDoctor: (doctor: DoctorCreationSchema) => Promise<void>;
	reset: () => void;
}

export const ReportDayrDashBoardContext = createContext<DashboardContextType>({
	activeModal: () => {},
	updateDoctor: async () => {},
	reset: () => {}
});

const DoctorDashboardToolBox = () => {
	const {activeModal, reset} = useContext(ReportDayrDashBoardContext);
	return (
		<>
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

export default function ReportDayDashboard() {
	const { branchId } = useDashboard();
	const [data, setData] = useState<DoctorSchema[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const search = useFilterString<DoctorSchema>('');
	const filter = useFilterString<DoctorSchema>('');
	const orderBy = useFilterString<DoctorSchema>('doctor_id:desc');
	// const [activeAction]
	const [visibleActionOverlay, { toggle, close: closeActionOverLay, open: openActionOverlay }] = useDisclosure(false);
	const [visibleMainOverlay, { close: closeMainOverlay, open: openMainOverlay }] = useDisclosure(false);


	const [opened, { open, close }] = useDisclosure(false);
	const [doctorActiveDetail, setDoctorActiveDetail] = useState<DoctorSchema | null>(null);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<string | null>(null);

	const toggleDetail = (id: string) =>
		setDetailOpen(
			detailOpen === id ? null : id
		)

	const {showErrorToast, showSuccessToast, showInfoToast, showWarningToast} = useToast();

	const updateOrCreateDoctor = useCallback(async (doctor: DoctorCreationSchema) => {
		try {
			setIsUpdating(true);
			openActionOverlay();
			const update = await upsertDoctor(branchId, doctor);
			if (doctor.id) {
				setData(data => data.map(item => (item.doctor_id === doctor.doctor_id) ? {...item,...doctor} : item));
			} else {
				setData(data => [update, ...data]);
				setTotal(total => total + 1);
			}
			console.log(update);
			showSuccessToast(`Cập nhật bác sĩ ${update.ten_bac_si} thành công`);

			closeActionOverLay();
		} catch (error: any) {
			showErrorToast(error.message);
		} finally {
			setIsUpdating(false);
		}
	}, [branchId, showSuccessToast, showErrorToast, openActionOverlay, closeActionOverLay]);

	const resetFilter = () => {
		openMainOverlay();
		getDoctors({
			branchId,
			page: 1,
			limit: perPage,
			orderBy: 'doctor_id:desc'
		})
			.then((doctors) => {
				setTotal(doctors.total);
				setData(doctors.data);
				console.log(doctors);
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

	const rowAction: ActionItemRender<DoctorSchema>[] = [
		{
			label: (doctor) =>
				<Group gap={5}>
					<FilePenLine {...iconProps}/> Xem chi tiết
				</Group>,
			action: (doctor) => {
				setDoctorActiveDetail(doctor);
				open();
			}
		},
		{
			label: (doctor) => doctor.status === 1
				? <Group gap={5}>
					<OctagonX {...iconProps} />
					Dừng hoạt động
				</Group>
				: <Group gap={5}>
					<Check {...iconProps} />
					Kích hoạt
				</Group>,
			action: async (doctor) => {
				try {
					let doctorUpdate = doctor;
					const newData = data.map((item) => {
						if (item.doctor_id === doctor.doctor_id) {
							if (item.status === 2) {
								// showWarningToast('Bác sĩ đã bị xóa, không thể kích hoạt');
								throw new Error('Bác sĩ đã bị xóa, không thể kích hoạt');
							} else {
								item.is_active = !item.is_active;
								item.status = item.is_active ? 1 : 0;
								doctorUpdate = item;
							}
						}
						return item;
					});

					showSuccessToast(`Bác sĩ ${doctorUpdate.ten_bac_si} đã ${doctorUpdate.is_active ? 'được kích hoạt' : 'ngừng hoạt động'}`);
					setData(newData);

					const update = await updateOrCreateDoctor(doctor)

				} catch (error: any) {
					showErrorToast(error.message);
				}
			}
		},
		{
			label: (doctor) => doctor.status === 2
				? <Group gap={5}>
					<LockKeyholeOpen {...iconProps} />
					Khôi phục
				</Group>
				: <Group gap={5}>
					<Trash2 {...iconProps} />
					Xóa
				</Group>,
			action: (doctor) => {
				const newData = data.map((item) => {
					if (item.doctor_id === doctor.doctor_id) {
						item.is_deleted = !item.is_deleted;
						item.status = item.is_deleted ? 2 : 1;
					}
					return item;
				});
				setData(newData);
			}
		}
	]

	const ActionButton = ({data}: {data: DoctorSchema}) => {
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
								key={`action-${data.doctor_id}-${index}`}
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
		const [tempStatus, setTempStatus] = useState<string>("");
		const [tempSearch, setTempSearch] = useState<string>("");

		const applySearch = () => {
			search.editFilter("ten_bac_si", tempSearch);
		}

		return (
			<>
				<Label label={"Người bán"} position={"top"}>
					<Select
						placeholder="Chọn người bán"
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
								label: "Đang hoạt động"
							}, {
								value: "0",
								label: "Ngừng hoạt động"
							}, {
								value: "2",
								label: "Đã xóa"
							}
						]}
					/>
				</Label>
				<Label label={"Tìm kiếm"} position={"top"}>
					<Group wrap={"nowrap"} gap={5}>
						<InputBase
							placeholder="Tìm kiếm theo tên bác sĩ"
							className={"w-72"}
							onChange={(event) => setTempSearch(event.currentTarget.value)}
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
			</>
		)
	}

	const tableData: TableRender<DoctorSchema> = [
		{
			title: "Mã bác sĩ",
			render: (data) => data.doctor_id
		},
		{
			title: "Tên bác sĩ",
			render: (data) => data.ten_bac_si
		},
		{
			title: "Chuyên khoa",
			render: (data) => data.chuyen_khoa
		},
		{
			title: "Trình độ",
			render: (data) => data.trinh_do
		},
		{
			title: "Nơi công tác",
			render: (data) => data.noi_cong_tac
		},
		{
			title: "Ghi chú",
			render: (data) => data.ghi_chu || ""
		},
		{
			title: "Trạng thái",
			render: (data) => (
				<StateStatus
					state={data.status}
					customText={{
						1: "Đang hoạt động",
						0: "Ngừng hoạt động",
						2: "Đã xóa"
					}}
				/>
			)
		},
		{
			title: "Hành động",
			render: (data) => <ActionButton data={data} />
		}
	]

	const filterComponent = [
		<FilterComponent />
	]

	useEffect(() => {
			if (!opened) {
				setDoctorActiveDetail(null);
				closeActionOverLay();
			}
	}, [opened]);

	useEffect(() => {
		openMainOverlay();
		getDoctors({
			branchId,
			page: page,
			limit: perPage,
			filterBy: filter.filter,
			searchFields: search.filter,
			orderBy: orderBy.filter
		})
			.then((doctors) => {
				setTotal(doctors.total);
				setData(doctors.data);
				console.log(doctors);
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

	return (
		<ReportDayrDashBoardContext.Provider value={{
			activeModal: open,
			updateDoctor: updateOrCreateDoctor,
			reset: resetFilter,
		}}>
				<Modal
					opened={opened}
					onClose={close}
					title={
						<Typography size={"h5"} weight={"semibold"}>Chi tiết</Typography>
					}
					size="70vw"
					maw={"70vw"}
				>
					<LoadingOverlay visible={visibleActionOverlay} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
					{<DoctorDetail detail={doctorActiveDetail} submit={updateOrCreateDoctor} />}
				</Modal>
				<EnterpriseResourcePlanningTable<DoctorSchema>
					name={"Báo cáo > Báo cáo cuối ngày > Bán hàng"}
					data={tableData}
					keyName={"doctor_id"}
					render={data}
					filter={filterComponent}
					total={total}
					toolBox={<DoctorDashboardToolBox />}
					getItem={(page, limit) => {
						console.log('page', page);
						console.log('limit', limit);
						page && setPage(page);
						limit && setPerPage(limit);
					}}
					visibleMainOverlay={visibleMainOverlay}
					// detail={(doctor) => <DoctorDetail detail={doctor} />}
					// openDetail={detailOpen}
				/>
		</ReportDayrDashBoardContext.Provider>
	)
}