'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Package, Receipt, Users, ShoppingCart, Store, StoreIcon as Shop, Wallet, BarChart2, PieChart, TrendingUp, List, PlusCircle, History, FileText, UserPlus, Truck, ShoppingBag, Building, Info, Settings, DollarSign, Minus, BarChart, LineChart, Undo2, Pill, Building2, Stethoscope, UserCircle, PiggyBank, Calendar, BookOpen, UndoDot, ShoppingBasket, Factory, Hospital } from 'lucide-react'
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { Typography } from '@component/Typography';
import { usePathname } from '@route/hooks';
import { cn } from '@lib/tailwind-merge.ts';
import { Menu } from '@mantine/core';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { pathToRegex } from '@util/regex.ts';
import { FaFileInvoiceDollar, FaUserDoctor } from 'react-icons/fa6';

export type MenuItems = Array<{
	title: string,
	icon?: React.ElementType,
	href?: string | RegExp,
	path?: string,
	dropdownItems?: { title: string, href: string | RegExp, path: string, icon?: React.ElementType }[]
}>

export function NavbarFeatureDirect() {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const {branchId} = useDashboard();
	const pathname = usePathname();

	const menuItems: MenuItems = [
		{
			title: 'Tổng quan',
			icon: LayoutDashboard,
			path: `/dashboard/branch/${branchId}`,
			href: pathToRegex(`/dashboard/branch/${branchId}`),
		},
		{
			title: 'Quản lý kho',
			icon: Package,
			path: `/dashboard/products/${branchId}/list`,
			href: pathToRegex(`/dashboard/products/${branchId}`),
			dropdownItems: [
				{
					title: 'Thuốc',
					path: `/dashboard/products/${branchId}/thuoc`,
					href: pathToRegex(`/dashboard/products/${branchId}/thuoc`),
					// icon: List,
				},
				{
					title: 'Thực phẩm chức năng',
					path: `/dashboard/products/${branchId}/thuc-pham-chuc-nang`,
					href: pathToRegex(`/dashboard/products/${branchId}/thuc-pham-chuc-nang`),
					// icon: PlusCircle,
				},
				{
					title: 'Mỹ phẩm',
					path: `/dashboard/products/${branchId}/my-pham`,
					href: pathToRegex(`/dashboard/products/${branchId}/my-pham`),
					// icon: PlusCircle,
				},
				{
					title: 'Dụng cụ y tế',
					path: `/dashboard/products/${branchId}/dung-cu-y-te`,
					href: pathToRegex(`/dashboard/products/${branchId}/dung-cu-y-te`),
					// icon: PlusCircle,
				},
				{
					title: 'Hàng hóa khác',
					path: `/dashboard/products/${branchId}/hang-hoa-khac`,
					href: pathToRegex(`/dashboard/products/${branchId}/hang-hoa-khac`),
					// icon: PlusCircle,
				},
			],
		},
		{
			title: 'Giao dịch',
			icon: Receipt,
			path: '/dashboard/transactions',
			href: pathToRegex('/dashboard/transactions'),
			dropdownItems: [
				{
					title: 'Hóa đơn bán',
					path: `/dashboard/transactions/${branchId}/invoices`,
					href: pathToRegex(`/dashboard/transactions/${branchId}/invoices`),
					icon: LiaFileInvoiceDollarSolid,
				},
				{
					title: "Hóa đơn nhập",
					path: `/dashboard/transactions/${branchId}/bills`,
					href: pathToRegex(`/dashboard/transactions/${branchId}/bills`),
					icon: FaFileInvoiceDollar ,
				},
				{
					title: 'Lịch sử',
					path: `/dashboard/transactions/${branchId}/history`,
					href: pathToRegex(`/dashboard/transactions/${branchId}/history`),
					icon: History,
				},
				{
					title: "Trả hàng",
					path: `/dashboard/transactions/${branchId}/returns`,
					href: pathToRegex(`/dashboard/transactions/${branchId}/returns`),
					icon: Undo2
				},
				{
					title: "Trả hàng nhà cung cấp",
					path: `/dashboard/transactions/${branchId}/returns-to-provider`,
					href: pathToRegex(`/dashboard/transactions/${branchId}/returns-to-provider`),
					icon: UndoDot
				},
				{
					title: 'Thuốc bán theo đơn',
					path: `/dashboard/transactions/${branchId}/prescriptions`,
					href: pathToRegex(`/dashboard/transactions/${branchId}/prescriptions`),
					icon: Pill,
				},
			],
		},
		{
			title: 'Đối tác',
			icon: Users,
			path: '/dashboard/partners',
			href: pathToRegex('/dashboard/partners'),
			dropdownItems: [
				{
					title: 'Khách hàng',
					path: `/dashboard/partners/${branchId}/customers`,
					href: pathToRegex(`/dashboard/partners/${branchId}/customers`),
					icon: UserPlus,
				},
				{
					title: 'Nhà cung cấp',
					path: `/dashboard/partners/${branchId}/suppliers`,
					href: pathToRegex(`/dashboard/partners/${branchId}/suppliers`),
					icon: Factory,
				},
				{
					title: 'Cơ sở khám chữa bệnh',
					path: `/dashboard/partners/${branchId}/clinics`,
					href: pathToRegex(`/dashboard/partners/${branchId}/clinics`),
					icon: Hospital,
				},
				{
					title: 'Bác sĩ/dược sĩ',
					path: `/dashboard/partners/${branchId}/doctors`,
					href: pathToRegex(`/dashboard/partners/${branchId}/doctors`),
					icon: FaUserDoctor,
				},
			],
		},
		{
			title: 'Nhập hàng',
			icon: Truck,//ShoppingCart,
			path: `/dashboard/import/${branchId}/create`,
			href: pathToRegex(`/dashboard/import/${branchId}/create`),
			// dropdownItems: [
			// 	{
			// 		title: 'Tạo đơn',
			// 		path: `/dashboard/import/${branchId}/create`,
			// 		href: pathToRegex(`/dashboard/import/${branchId}/create`),
			// 		icon: PlusCircle,
			// 	},
			// 	{
			// 		title: 'Danh sách',
			// 		path: `/dashboard/import/${branchId}/list`,
			// 		href: pathToRegex(`/dashboard/import/${branchId}/list`),
			// 		icon: List,
			// 	},
			// ],
		},
		{
			title: 'Bán hàng',
			icon: ShoppingCart,
			path: `/dashboard/sales/${branchId}/retail`,
			href: pathToRegex(`/dashboard/sales/${branchId}/retail`),
			// dropdownItems: [
			// 	{
			// 		title: 'Bán lẻ',
			// 		path: `/dashboard/sales/${branchId}/retail`,
			// 		href: pathToRegex(`/dashboard/sales/${branchId}/retail`),
			// 		icon: ShoppingBag,
			// 	},
			// 	{
			// 		title: 'Bán sỉ',
			// 		path: `/dashboard/sales/${branchId}/wholesale`,
			// 		href: pathToRegex(`/dashboard/sales/${branchId}/wholesale`),
			// 		icon: Building,
			// 	},
			// ],
		},
		{
			title: 'Cửa hàng',
			icon: Shop,
			path: '/dashboard/store',
			href: pathToRegex('/dashboard/store'),
			dropdownItems: [
				{
					title: 'Thông tin',
					path: `/dashboard/store/${branchId}/info`,
					href: pathToRegex(`/dashboard/store/${branchId}/info`),
					icon: Info,
				},
				{
					title: 'Cài đặt',
					path: `/dashboard/store/${branchId}/settings`,
					href: pathToRegex(`/dashboard/store/${branchId}/settings`),
					icon: Settings,
				},
			],
		},
		{
			title: 'Số quỹ',
			icon: Wallet,
			path: '/dashboard/fund',
			href: pathToRegex('/dashboard/fund'),
			dropdownItems: [
				{
					title: 'Thu',
					path: `/dashboard/fund/${branchId}/income`,
					href: pathToRegex(`/dashboard/fund/${branchId}/income`),
					icon: DollarSign,
				},
				{
					title: 'Chi',
					path: `/dashboard/fund/${branchId}/expense`,
					href: pathToRegex(`/dashboard/fund/${branchId}/expense`),
					icon: Minus,
				},
			],
		},
		// {
		// 	title: 'Báo cáo',
		// 	icon: BarChart2,
		// 	path: '/dashboard/reports',
		// 	href: pathToRegex('/dashboard/reports'),
		// 	dropdownItems: [
		// 		{
		// 			title: 'Doanh thu',
		// 			path: `/dashboard/reports/${branchId}/revenue`,
		// 			href: pathToRegex(`/dashboard/reports/${branchId}/revenue`),
		// 			icon: BarChart,
		// 		},
		// 		{
		// 			title: 'Lợi nhuận',
		// 			path: `/dashboard/reports/${branchId}/profit`,
		// 			href: pathToRegex(`/dashboard/reports/${branchId}/profit`),
		// 			icon: LineChart,
		// 		},
		// 	],
		// },
		{
			title: 'Sổ sách nhà thuốc',
			icon: BookOpen,
			path: '/dashboard/reports',
			href: pathToRegex('/dashboard/reports'),
			dropdownItems: [
				{
					title: 'Báo cáo cuối ngày',
					path: `/dashboard/reports/${branchId}/end-of-day`,
					href: pathToRegex(`/dashboard/reports/${branchId}/end-of-day`),
					icon: Calendar,
				},
				{
					title: 'Báo cáo bán hàng',
					path: `/dashboard/reports/${branchId}/sales`,
					href: pathToRegex(`/dashboard/reports/${branchId}/sales`),
					icon: BarChart2,
				},
				{
					title: 'Báo cáo hàng hóa',
					path: `/dashboard/reports/${branchId}/inventory`,
					href: pathToRegex(`/dashboard/reports/${branchId}/inventory`),
					icon: Package,
				},
				{
					title: 'Báo cáo khách hàng',
					path: `/dashboard/reports/${branchId}/customers`,
					href: pathToRegex(`/dashboard/reports/${branchId}/customers`),
					icon: Users,
				},
				{
					title: 'Báo cáo nhà cung cấp',
					path: `/dashboard/reports/${branchId}/providers`,
					href: pathToRegex(`/dashboard/reports/${branchId}/providers`),
					icon: Building2,
				},
				{
					title: 'Báo cáo bác sĩ',
					path: `/dashboard/reports/${branchId}/doctors`,
					href: pathToRegex(`/dashboard/reports/${branchId}/doctors`),
					icon: Stethoscope,
				},
				{
					title: 'Báo cáo nhân viên',
					path: `/dashboard/reports/${branchId}/staff`,
					href: pathToRegex(`/dashboard/reports/${branchId}/staff`),
					icon: UserCircle,
				},
				{
					title: 'Báo cáo tài chính',
					path: `/dashboard/reports/${branchId}/finance`,
					href: pathToRegex(`/dashboard/reports/${branchId}/finance`),
					icon: PiggyBank,
				},
			],
		},
		{
			title: 'Nhân viên',
			icon: Users,
			path: `/dashboard/staff/${branchId}`,
			href: pathToRegex('/dashboard/staff'),
		},
		{
			title: "Bán buôn",
			icon: ShoppingBasket,
			path: `/dashboard/sales/${branchId}/wholesale`,
			href: pathToRegex(`/dashboard/sales/${branchId}/wholesale`),
		}
	];


	return (
		<nav className="bg-white shadow h-fit border-b border-b-zinc-200">
			<div className="max-w-full px-2 py-2">
				<div className="flex justify-between">
					<div className="flex justify-between flex-1">
						<div className="flex flex-wrap items-center gap-2">
							{menuItems.map((item) => {
								const active = pathname ?
									(item.href instanceof RegExp
										? item.href.test(pathname)
										: pathname.includes(item.href as string))
									: false
								const dropdownItems = item.dropdownItems?.map((dropdownItem) => (
									<Menu.Item
										key={dropdownItem.path}
										py={10}
										className={'text-gray-700 hover:bg-gray-50 group transition-colors hover:text-teal-500 text-sm'}
									>
										<Typography
											size={'content'}
											color={'text'}
											className={cn("whitespace-nowrap text-zinc-700 flex items-center gap-2 group-hover:text-teal-500")}
											href={dropdownItem.path}
										>
											{dropdownItem.icon && <dropdownItem.icon className="h-5 w-5 group-hover:text-teal-500" />}
											{dropdownItem.title}
										</Typography>
									</Menu.Item>
								));
								if (!item.dropdownItems) {
									return (
										<Link
											key={item.title}
											href={item.path || pathname || '/'}
											className={`cursor-pointer inline-flex gap-2 justify-center items-center px-4 p-2 text-sm font-medium rounded-md
                      ${active
												? 'text-white bg-teal-500 hover:bg-teal-600'
												: 'text-gray-700 hover:bg-gray-50 group transition-colors'}`}
										>
											{item.icon && <item.icon className={cn('h-5 w-5', {
												'group-hover:text-teal-500': !active,
												'text-white': active,
											})} />}
											<Typography
												size={'content'}
												color={active ? 'white' : 'text'}
												className={cn('whitespace-nowrap', {
													"group-hover:text-teal-500": !active,
												})}
											>{item.title}</Typography>
											{/*{item.dropdownItems && (*/}
											{/*	<ChevronDown className="h-4 w-4 ml-1" />*/}
											{/*)}*/}
										</Link>
									)
								}
								return (
									<Menu
										key={item.title}
										trigger="hover"
										position={'bottom-start'}
										transitionProps={{ exitDuration: 0 }}
										withinPortal
									>
										<Menu.Target>
											<div
												key={item.title}
												className="relative group"
											>
												<Typography
													className={`cursor-pointer inline-flex gap-2 justify-center items-center px-4 p-2 text-sm font-medium rounded-md
														${active
														? 'text-white bg-teal-500 hover:bg-teal-600'
														: 'text-gray-700 hover:bg-gray-50 group transition-colors'}`}
												>
													{item.icon && <item.icon className={cn('h-5 w-5', {
														'group-hover:text-teal-500': !active,
														'text-white': active,
													})} />}
													<span
														className={cn('whitespace-nowrap', {
															'group-hover:text-teal-500': !active,
														})}
													>{item.title}</span>
												</Typography>
											</div>
										</Menu.Target>
										<Menu.Dropdown className={'!min-w-[200px]'}>
											{dropdownItems}
										</Menu.Dropdown>
									</Menu>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

