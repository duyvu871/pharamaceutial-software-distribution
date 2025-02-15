"use client";

import EnterpriseResourcePlanningTable from "@component/EnterpriseResourcePlanningTableLayout/table.tsx";
import { ActionItemRender, TableRender } from "@type/components/table.type";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import StateStatus from "@component/Status/state-status.tsx";

import { Typography } from "@component/Typography";
import {
	Badge,
	Button,
	Combobox,
	Group,
	InputBase,
	LoadingOverlay,
	Modal,
	Popover,
	Select,
	Stack,
    Tabs,
} from "@mantine/core";
import {
	Check,
	ChevronDown,
	ChevronUp,
	FilePenLine,
	FileSpreadsheet,
	LockKeyholeOpen,
	OctagonX,
	Plus,
	Printer,
	RotateCw,
	Search,
	Settings,
	Trash2,
	Upload,
} from "lucide-react";
import useToast from "@hook/client/use-toast-notification.ts";

import { useDisclosure } from "@mantine/hooks";
import { cn } from "@ui/tailwind-merge.ts";
import { Label } from "@component/label";
import { useFilterString } from "@hook/client/use-filter-string.ts";
import { useSearchParams } from "@route/hooks";
import { DatePicker, DateTimePicker } from "@mantine/dates";
import { AdminCreateSchema, AdminType, AminBranchFormFieldCreation } from '@schema/admin/admin-schema.ts';
import {
	createAdminData,
	createOrUpdateBranch,
	createOrUpdateUserSlave, deleteBranch,
	getAdminData, getBranches, getBranchPaymentStat,
	getUserSlaveList,
	updateAdminData, updatePaymentSubscriptionStatus,
} from '@api/admin/admin-curd.ts';
import { MdOutlineSubscriptions } from "react-icons/md";

import { useProtectHighEndAdmin } from '@layout/protect/high-end-admin.tsx';
import { TbCategoryPlus } from "react-icons/tb";
import { registerSubscription } from '@api/subscription.ts';
import { AdminPlans, PlanType } from '@schema/subscription-schema.ts';
import { AdminGettingBranches } from '@schema/branch-schema.ts';
import { BranchPlanType, PaymentStatus } from '@type/enum/branch';
import SubscriptionRegister from '@component/Subscription/subscription-register.tsx';
import AdminBranchUpsertForm from '@component/Form/admin-branch-upsert-form.tsx';
import BranchSubscriptionCollection from '@component/Subscription/branch-subscription-collection.tsx';

type DashboardContextType = {
	activeModal: () => void;
	update: (doctor: CreationSchema) => Promise<void>;
	reset: () => void;
};

const idKey = "branch_id";
const initFilter = 'createdAt:desc';

type Schema = AdminGettingBranches;
type CreationSchema = AminBranchFormFieldCreation;

export const DashBoardContext = createContext<DashboardContextType>({
	activeModal: () => {},
	update: async () => {},
	reset: () => {},
});

const DashboardToolBox = () => {
	const { activeModal, reset } = useContext(DashBoardContext);
	return (
		<>
			<button
				className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-600"
				onClick={activeModal}
			>
				<Plus className="w-4 h-4" />
				<span>Thêm mới</span>
			</button>

			{/*<button*/}
			{/*	className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">*/}
			{/*	<Upload className="w-4 h-4" />*/}
			{/*	<span>Tải lên</span>*/}
			{/*</button>*/}
			<button className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">
				<FileSpreadsheet className="w-4 h-4" />
				<span>Xuất Excel</span>
			</button>
			<button
				className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-600"
				onClick={reset}
			>
				<RotateCw className="w-4 h-4" />
				<span>Làm mới (F3)</span>
			</button>
		</>
	);
};

export default function BranchDashboard() {
	const {isHighEndAdmin} = useProtectHighEndAdmin();

	const [data, setData] = useState<Schema[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const search = useFilterString<Schema>("");
	const filter = useFilterString<Schema>("");
	const orderBy = useFilterString<Schema>(initFilter);
	const [activePaymentStatus, setActivePaymentStatus] = useState<string>("total");
	const [statByPaymentStatus, setStatByPaymentStatus] = useState<Record<string, number>>({});

	const [
		visibleActionOverlay,
		{ toggle, close: closeActionOverLay, open: openActionOverlay },
	] = useDisclosure(false);
	const [
		visibleMainOverlay,
		{ close: closeMainOverlay, open: openMainOverlay },
	] = useDisclosure(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [
		openedSubscription,
		{ open: openSubscription, close: closeSubscription },
	] = useDisclosure(false);
	const [
		openedSubscriptionEstablish,
		{ open: openSubscriptionEstablish, close: closeSubscriptionEstablish },
	] = useDisclosure(false);

	const [activeDetail, setActiveDetail] = useState<Schema | null>(null);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [detailOpen, setDetailOpen] = useState<string | null>(null);

	const toggleDetail = (id: string) =>
		setDetailOpen(detailOpen === id ? null : id);

	const { showErrorToast, showSuccessToast, showInfoToast, showWarningToast } = useToast();

	const updateOrCreate = useCallback(async (model: CreationSchema) => {
		try {
			setIsUpdating(true);
			openActionOverlay();
			if (model.branch_id) {
				const update = await createOrUpdateBranch(model);
				if (update) {
					setData((prev) => prev.map((item) => (item[idKey] === update[idKey] ? {...item, ...update} : item)));
					showSuccessToast('Cập nhật thông tin admin thành công');
					close();
				}
			} else {
				const create = await createOrUpdateBranch(model);
				if (create) {
					setData((prev) => [create, ...prev]);
					showSuccessToast('Tạo mới admin thành công');
					close();
				}
			}
		} catch (error: any) {
			showErrorToast(error.message);
		} finally {
			setIsUpdating(false);
			closeActionOverLay();
		}
	}, [openActionOverlay, showSuccessToast, showErrorToast, close]);

	const registerSubscriptionAction = useCallback(async (model: PlanType) => {
		try {
			if (!activeDetail) {
				showErrorToast("Không tìm thấy thông tin cửa hàng");
				return;
			}
			setIsUpdating(true);
			openActionOverlay();
			const create = await registerSubscription("branch", model.id, activeDetail.branch_id);
			if (create) {
				setData(
					data.map((item) =>
						item.branch_id === activeDetail.branch_id
							? {
								...item,
								subscriptions: [...item.subscriptions, create],
							}
							: item
					)
				);
				showSuccessToast('Đăng ký gói dịch vụ thành công');
			}
		} catch (error: any) {
			showErrorToast(error.message);
		} finally {
			setIsUpdating(false);
			closeActionOverLay();
		}
	}, [openActionOverlay, showSuccessToast, showErrorToast, closeActionOverLay, activeDetail, data]);

	const updatePaymentSubscriptionStatusAction = useCallback(async (id: string, status: string) => {
		try {
			// if (!activeDetail) {
			// 	showErrorToast("Không tìm thấy thông tin cửa hàng");
			// 	return;
			// }
			if (!id) {
				showErrorToast("Không tìm thấy thông tin gói dịch vụ");
				return;
			}
			if (!status) {
				showErrorToast("Không tìm thấy thông tin trạng thái");
				return;
			}
			const update = await updatePaymentSubscriptionStatus("branch", id, status);

			if (update) {
				setData((prev) =>
					prev.map((item) => {
						const newSubscriptions = item.subscriptions.map((sub) =>
							sub.id === id ? { ...sub, payment_status: status } : sub
						);
						return {
							...item,
							subscriptions: newSubscriptions,
						};
					})
				);
				showSuccessToast('Cập nhật trạng thái gói dịch vụ thành công');
			}

		} catch (error: any) {
			showErrorToast(error.message);
		}
	}, []);

	const getPaymentStat = useCallback(async () => {
		getBranchPaymentStat()
			.then((model) => {
				setStatByPaymentStatus(model);
			})
			.catch((error) => {
				showErrorToast(error.message);
			});
	}, [showErrorToast]);

	const resetFilter = () => {
		openMainOverlay();
		getPaymentStat();
		getBranches({
			page: 1,
			limit: perPage,
			orderBy: "createdAt:desc",
		})
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
			});
	};

	const iconProps = {
		size: 15,
		className: "text-zinc-600",
	};

	const BadgeColor = {
		unpaid: "bg-zinc-500/10 text-zinc-500",
		paid: "bg-green-500/10 text-green-500",
		pending: "bg-yellow-500/10 text-yellow-500",
		cancelled: "bg-zinc-500/10 text-zinc-500",
		expired: "bg-red-500/10 text-red-500",
	}

	const rowAction: ActionItemRender<Schema>[] = [
		{
			label: (model) => (
				<Group gap={5}>
					<FilePenLine {...iconProps} /> Xem chi tiết
				</Group>
			),
			action: (model) => {
				setActiveDetail(model);
				open();
			},
		},
		{
			label: (model) => (
				<Group gap={5}>
					<TbCategoryPlus  {...iconProps} /> Cài đặt gói
				</Group>
			),
			action: (model) => {
				// showWarningToast("Chức năng này đang được phát triển");
				setActiveDetail(model);
				openSubscriptionEstablish();
			},
		},
		{
			label: (model) => (
				<Group gap={5}>
					<MdOutlineSubscriptions {...iconProps} /> Xem gói dịch vụ
				</Group>
			),
			action: (model) => {
				// showWarningToast('Chức năng này đang được phát triển');
				setActiveDetail(model);
				console.log("model", model);
				openSubscription();
			},
		},
		{
			label: (model) => (
				<Group gap={5} className={cn({
					"opacity-50 cursor-not-allowed": !model
				})}>
					<Trash2 {...iconProps} /> Xóa
				</Group>
			),
			action: async (model) => {
				try {
					console.log("model", model);
					if (!model) {
						showErrorToast("Không tìm thấy thông tin cửa hàng");
						return;
					}

					const allowToRemove = confirm("Bạn có chắc chắn muốn xóa cửa hàng này không?");
					if (!allowToRemove) return;

					const remove = await deleteBranch(model.branch_id);
					if (remove) {
						setData(data.filter((item) => item.branch_id !== model.branch_id));
						showSuccessToast('Xóa cửa hàng thành công');
					}

				} catch (error: any) {
					showErrorToast(error.message);
				}
			},
		},
	];

	const PaymentStatusFilter = () => {
		return (
			<Tabs
				defaultValue="total"
				value={activePaymentStatus}
				color={"var(--main-color)"}
				onChange={(value) => value && setActivePaymentStatus(value)}
			>
				<Tabs.List>
					{
						Object.keys(statByPaymentStatus).map((key) => (
							<Tabs.Tab key={key} value={key} >
								<Group wrap={"nowrap"} gap={2}>
									{PaymentStatus[key as keyof typeof PaymentStatus]}
									<StateStatus
										state={key}
										customColor={BadgeColor}
										customText={{
											[key]: statByPaymentStatus[key].toString()
										}}
									/>
								</Group>
							</Tabs.Tab>
						))
					}
				</Tabs.List>
			</Tabs>
		)
	}

	const ActionButton = ({ data }: { data: Schema }) => {
		const [opened, setOpened] = useState<boolean>(false);

		return (
			<Popover
				opened={opened}
				onChange={setOpened}
				width={200}
				position="bottom-end"
				withArrow
				shadow="md"
			>
				<Popover.Target>
					<Button
						onClick={() => setOpened((o) => !o)}
						size={"sm"}
						px={5}
						h={20}
						color={"var(--main-color)"}
					>
						<Group gap={5}>
							<Settings size={15} />
							Thao tác <ChevronDown size={15} />
						</Group>
					</Button>
				</Popover.Target>
				<Popover.Dropdown p={5} className={"z-20"}>
					<Stack gap={5} pos={"relative"}>
						{rowAction.map((action, index) => (
							<Group
								key={`action-${data[idKey]}-${index}`}
								className={cn(
									"hover:bg-zinc-100 transition-all p-2 py-1 cursor-pointer",
									isUpdating && "opacity-50 cursor-not-allowed"
								)}
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
		);
	};

	const FilterComponent = () => {
		const searchParams = useSearchParams();
		const [tempStatus, setTempStatus] = useState<string>("");
		const [tempSearch, setTempSearch] = useState<string>("");

		const [startDate, setStartDate] = useState<Date>(new Date());
		const [endDate, setEndDate] = useState<Date>(new Date());

		const applySearch = () => {
			search.editMultipleFilter({
				branch_name: tempSearch,
			});
			filter.editMultipleFilter({
				createdAt: `[${startDate?.toISOString()}][${endDate?.toISOString()}]`
			});
		};

		return (
			<Group wrap={"nowrap"}>
				<Label label={"Từ ngày"} position={"top"}>
					<DateTimePicker
						placeholder={"Chọn ngày bắt đầu"}
						className={"w-40"}
						defaultValue={new Date()}
						onChange={(date) => date && setStartDate(date)}
					/>
				</Label>
				<Label label={"Đến ngày"} position={"top"}>
					<DateTimePicker
						placeholder={"Chọn ngày kết thúc"}
						className={"w-40"}
						defaultValue={new Date()}
						onChange={(date) => date && setEndDate(date)}
					/>
				</Label>
				<Label label={"Tìm kiếm"} position={"top"}>
					<Group wrap={"nowrap"} gap={5}>
						<InputBase
							placeholder={`Tìm kiếm theo tên, tài khoản`}
							className={"w-72"}
							onChange={(event) => setTempSearch(event.currentTarget.value)}
						/>
						<Button color={"var(--main-color)"} onClick={applySearch}>
							<Search className="w-4 h-4 mr-2" />
							Tìm kiếm
						</Button>
					</Group>
				</Label>
			</Group>
		);
	};

	const tableData: TableRender<Schema> = [
		{
			title: "Tên cửa hàng",
			render: (data) => data.branch_name,
		},
		{
			title: "Địa chỉ",
			render: (data) => data.address,
		},
		{
			title: "Tên đại lý",
			render: (data) => data.users.username,
		},
		{
			title: "Gói dịch vụ",
			render: (data) => (
				<Group gap={5} maw={200}>
					{data?.subscriptions?.map((sub) => (
						<Group gap={2} wrap={"nowrap"} p={5} className={"bg-zinc-100 rounded-md"}>
							{/*<StateStatus*/}
							{/*	state={sub?.branch_plans?.plan_type}*/}
							{/*	customColor={{*/}
							{/*		[BranchPlanType["30Day"]]: "bg-zinc-500/10 text-zinc-500",*/}
							{/*		[BranchPlanType["1Year"]]: "bg-yellow-500/10 text-yellow-500",*/}
							{/*	}}*/}
							{/*	customText={{*/}
							{/*		[BranchPlanType["30Day"]]: `30 ngày`,*/}
							{/*		[BranchPlanType["1Year"]]: "1 năm",*/}
							{/*	}}*/}
							{/*/>*/}
							{sub.branch_plans.plan_name}
							<StateStatus
								state={sub.payment_status ?? 'unpaid'}
								customColor={BadgeColor}
								customText={PaymentStatus}
							/>
						</Group>
					))}
					{data.subscriptions.length === 0 && (
						<Badge variant="light" color="gray">
							Chưa đăng ký gói dịch vụ
						</Badge>
					)}
				</Group>
			),
		},


		{
			title: "Số điện thoại",
			render: (data) => data.phone_number,
		},
		{
			title: 'Trạng thái',
			render: (data) => {
				return (
					<Badge color={data.branch_status === 'active' ? "var(--main-color)" : "red"}>
						{data.branch_status === 'active' ? "Hoạt động" : "Ngưng hoạt động"}
					</Badge>
				);
			},
		},
		{
			title: "Hành động",
			render: (data) => (
				<Group gap={6} w={"fit-content"}>
					<ActionButton data={data} />
				</Group>
			),
		},
	];

	const filterComponent = [
		<FilterComponent />,
		<PaymentStatusFilter />
	];

	useEffect(() => {
		if (!opened) {
			setActiveDetail(null);
			closeActionOverLay();
		}
	}, [opened]);

	useEffect(() => {
		if (!openedSubscription) {
			setActiveDetail(null);
			closeActionOverLay();
		}
	}, [openedSubscription]);

	useEffect(() => {
		if (!openedSubscriptionEstablish) {
			setActiveDetail(null);
			closeActionOverLay();
		}
	}, [openedSubscriptionEstablish]);

	useEffect(() => {
		openMainOverlay();
		getPaymentStat()
		getBranches({
			page: page,
			limit: perPage,
			filterBy: filter.filter,
			searchFields: search.filter,
			orderBy: orderBy.filter,
			paymentStatus: activePaymentStatus,
		})
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
			});
	}, [filter.filter, search.filter, page, perPage, orderBy.filter, activePaymentStatus]);

	useEffect(() => {
		console.log("page", page);
		console.log("perPage", perPage);
	}, [page, perPage]);

	// useEffect(() => {
	//
	// }, []);

	return (
		<DashBoardContext.Provider
			value={{
				activeModal: open,
				update: updateOrCreate,
				reset: resetFilter,
			}}
		>
			<Modal
				opened={openedSubscriptionEstablish}
				onClose={closeSubscriptionEstablish}
				title={
					<Typography size={"h5"} weight={"semibold"}>
						Cài đặt gói dịch vụ
					</Typography>
				}
				size="70vw"
				maw={"70vw"}
			>
				<LoadingOverlay
					visible={visibleActionOverlay}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
				{activeDetail && (
					<SubscriptionRegister<PlanType, Partial<PlanType>> onSelectPlan={registerSubscriptionAction}  type={"branch"}/>
				)}
			</Modal>
			<Modal
				opened={openedSubscription}
				onClose={closeSubscription}
				title={
					<Typography size={"h5"} weight={"semibold"}>
						Chi tiết gói dịch vụ
					</Typography>
				}
				size="70vw"
				maw={"70vw"}
			>
				<LoadingOverlay
					visible={visibleActionOverlay}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
				{activeDetail && (
					<BranchSubscriptionCollection
						subscriptions={activeDetail["subscriptions"]}
						updatePaymentStatus={updatePaymentSubscriptionStatusAction}
					/>
				)}
			</Modal>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Typography size={"h5"} weight={"semibold"}>
						{activeDetail ? "Cập nhật thông tin cửa hàng" : "Thêm mới cửa hàng"}
					</Typography>
				}
				size="70vw"
				maw={"70vw"}
			>
				<LoadingOverlay
					visible={visibleActionOverlay}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
				<AdminBranchUpsertForm defaultValue={activeDetail ?? undefined} onSubmit={updateOrCreate} />
			</Modal>
			<EnterpriseResourcePlanningTable<Schema>
				name={`Danh sách cửa hàng`}
				data={tableData}
				keyName={idKey}
				render={data}
				filter={filterComponent}
				total={total}
				toolBox={<DashboardToolBox />}
				getItem={(page, limit) => {
					console.log("page", page);
					console.log("limit", limit);
					page && setPage(page);
					limit && setPerPage(limit);
				}}
				visibleMainOverlay={visibleMainOverlay}
				// detail={(model) =>
				// 	<PrescriptionInvoiceDisplay data={model}/>
				// }
				// openDetail={detailOpen}
			/>
		</DashBoardContext.Provider>
	);
}
