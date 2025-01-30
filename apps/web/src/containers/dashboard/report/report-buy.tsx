"use client"

import EnterpriseResourcePlanningTable from '@component/EnterpriseResourcePlanningTableLayout/table.tsx';
import {  DoctorSchema } from '@schema/doctor-schema.ts';
import { TableRender } from '@type/components/table.type';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Typography } from '@component/Typography';
import { Button, Group, InputBase, LoadingOverlay, Modal, Select } from '@mantine/core';
import {
	FileSpreadsheet, RotateCw, Search } from 'lucide-react';
import useToast from '@hook/client/use-toast-notification.ts';
import { useDisclosure } from '@mantine/hooks';
import { getDoctors } from '@api/doctor.ts';
import { Label } from '@component/label';
import { useFilterString } from '@hook/client/use-filter-string.ts';

type DashboardContextType = {
	activeModal: () => void;
	reset: () => void;
}

export const ReportDayrDashBoardContext = createContext<DashboardContextType>({
	activeModal: () => {},
	reset: () => {}
});

const ReportDayrDashboardToolBox = () => {
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

export default function ReportBuy() {
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


	const {showErrorToast} = useToast();


	const resetFilter = () => {
		// openMainOverlay();
		// getDoctors({
		// 	branchId,
		// 	page: 1,
		// 	limit: perPage,
		// 	orderBy: 'doctor_id:desc'
		// })
		// 	.then((doctors) => {
		// 		setTotal(doctors.total);
		// 		setData(doctors.data);
		// 		console.log(doctors);
		// 	})
		// 	.catch((error) => {
		// 		showErrorToast(error.message);
		// 	})
		// 	.finally(() => {
		// 		setTimeout(() => {
		// 			closeMainOverlay();
		// 		}, 300);
		// 	})
	}





	const FilterComponent = () => {
		// const [tempStatus, setTempStatus] = useState<string>("");
		const [tempSearch, setTempSearch] = useState<string>("");

		const applySearch = () => {
			// search.editFilter("ten_bac_si", tempSearch);
		}

		return (
			<Group wrap={"nowrap"}>
				<Label label={"Kiểu hiển thị "} position={"top"}>
					<Select
						placeholder="Chọn"
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
								label: "Tiền"
							},
							{
								value: "1",
								label: "Phiếu"
							}, {
								value: "0",
								label: "Hàng hóa"
							},
						]}
					/>
				</Label>
				<Label label={"Từ khoá tìm kiếm (F3)"} position={"top"}>
					<Group wrap={"nowrap"} gap={5}>
						<InputBase
							placeholder="Tìm kiếm"
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
			</Group>
		)
	}

	const tableData: TableRender<DoctorSchema> = [
		{
			title: "Thời gian",
			render: (data) => data.doctor_id
		},
		{
			title: "Tổng tiền hoá đơn",
			render: (data) => data.ten_bac_si
		},
		{
			title: "Tổng tiền khách hàng trả lại",
			render: (data) => data.chuyen_khoa
		},
		{
			title: "Doanh thu",
			render: (data) => data.trinh_do
		},

	]

	const filterComponent = [
		<FilterComponent />
	]



	useEffect(() => {
		// openMainOverlay();
		// getDoctors({
		// 	branchId,
		// 	page: page,
		// 	limit: perPage,
		// 	filterBy: filter.filter,
		// 	searchFields: search.filter,
		// 	orderBy: orderBy.filter
		// })
		// 	.then((doctors) => {
		// 		setTotal(doctors.total);
		// 		setData(doctors.data);
		// 		console.log(doctors);
		// 	})
		// 	.catch((error) => {
		// 		showErrorToast(error.message);
		// 	})
		// 	.finally(() => {
		// 		setTimeout(() => {
		// 			closeMainOverlay();
		// 		}, 300);
		// 	})
	}, [branchId, filter.filter, search.filter, page, perPage, orderBy.filter]);

	useEffect(() => {
		console.log('page', page);
		console.log('perPage', perPage);
	}, [page, perPage]);

	return (
		<ReportDayrDashBoardContext.Provider value={{
			activeModal: open,
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
			</Modal>
			<EnterpriseResourcePlanningTable<DoctorSchema>
				//phai them 1 cai dòng tong ở trong enter nữa
				name={"Báo cáo > Báo cáo bán hàng  "}
				data={tableData}
				keyName={"doctor_id"}
				render={data}
				filter={filterComponent}
				total={total}
				toolBox={<ReportDayrDashboardToolBox />}
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