"use client";

import Link from "next/link";
import {
	IconHome,
	IconUser,
	IconSettings,
	IconLayoutDashboard,
	IconBuildingStore,
	IconChevronRight
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import {
	UnstyledButton,
	Group,
	Text,
	Collapse,
	Stack,
	useMantineTheme,
	NavLink,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import { cn } from "@lib/tailwind-merge";
import { useProtectHighEndAdmin } from '@layout/protect/high-end-admin.tsx';
import { useAuth } from '@hook/auth';
import { Typography } from '@component/Typography';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosSettings,  } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
interface NavItemProps {
	item: SidebarItem;
	depth?: number;
}

export interface SidebarItem {
	icon?: React.ElementType;
	label: string;
	href?:string;
	active?:boolean;
	initiallyOpened?: boolean;
	children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
	{
		icon: IconLayoutDashboard,
		label: "Dashboard",
		href:"/admin/dashboard",
	},
	{
		icon: IconUser,
		label: "Quản lý Admin",
		href:"/admin/dashboard/admins",
	},
	{
		icon: IconUser,
		label: "Quản lý đại lý",
		href: "/admin/dashboard/agents",
	},
	{
		icon: IconBuildingStore,
		label: "Danh sách cửa hàng",
		href:"/admin/dashboard/branches",
	},
	{
		icon: IconSettings,
		label: "Cài đặt",
		children: [
			{
				label: "Chung",
				href:"/admin/dashboard/settings/general",
			},
			{
				label: "Bảo mật",
				href: "/admin/dashboard/settings/security",
			},
		],
	},
];

const blockHighEndRoute = [
	"/admin/dashboard/admins",
]

function NavItem({ item, depth = 0 }: NavItemProps) {
	const {isHighEndAdmin} = useProtectHighEndAdmin();

	const pathname = usePathname();

	const [opened, setOpened] = useState(item.initiallyOpened || false);
	const hasChildren = item.children && item.children.length > 0;
	const isActive = item.href === pathname
	const toggleOpen = () => {
		if (hasChildren) {
			setOpened((o) => !o);
		}
	};

	useEffect(() => {
		if(item.children) {
			if(item.children.some((child) => child.href === pathname)) {
				setOpened(true)
			} else {
				setOpened(false)
			}
		}
	}, [pathname, item.children])

	if(!isHighEndAdmin && (item.href && blockHighEndRoute.includes(item.href))) return null;

	return (
		<Stack gap={0}>
			<UnstyledButton
				component={item.href ? Link : undefined}
				href={item.href || "#"}
				onClick={toggleOpen}
				className={cn(
					"w-full !p-3 rounded-lg transition-colors duration-200 ease-in-out group",
					{
						"!bg-teal-500": isActive,
						'hover:!bg-teal-500': !isActive
					}
				)}
			>
				<Group className="items-center">
					{item.icon && (
						<span
							className={cn(
								"text-zinc-100",
								{
									"group-hover:text-white": !isActive,
									"text-white": isActive
								}
							)}
						>
              <item.icon size={26} />
            </span>
					)}
					<Text
						color="white"
						className={cn(
							"flex-grow !text-xl font-medium ",
							{
								"group-hover:text-white": !isActive,
								"text-white": isActive
							}
						)}
					>
						{item.label}
					</Text>
					{hasChildren && (
						<IconChevronRight
							className={`transition-transform duration-200 ease-in-out text-zinc-100 ${
								opened ? "rotate-90" : ""
							}`}
							size={16}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasChildren && (
				<Collapse in={opened}>
					<Stack gap={0} className={`ml-${depth * 4 + 4} mt-1 border-l border-zinc-100 pl-2`}>
						{item.children?.map((child, index) => (
							<NavItem key={index} item={child} depth={depth + 1} />
						))}
					</Stack>
				</Collapse>
			)}
		</Stack>
	);
}

export function AdminSidebar() {
	const {logout} = useAuth()

	return (
		<div className="min-h-screen bg-[var(--main-color)] p-4 flex flex-col justify-between">
			<div>
				<div className="mb-6">
					<Text color="white" className="!text-3xl !font-semibold px-3">
						Quản Trị
					</Text>
				</div>
				<Stack gap={"xs"}>
					{sidebarItems.map((item, index) => (
						<NavItem key={index} item={item} />
					))}
				</Stack>
			</div>
			<Stack gap={"xs"}>
				<NavLink
					className="!p-3 !bg-white rounded-lg transition-colors duration-200 ease-in-out group"
					color={'var(--main-color)'}
					active={true}
					label={
						<Typography size={'h5'} weight={'semibold'} color={'primary'}>Đăng xuất</Typography>
					}
					description={''}
					leftSection={<IoExitOutline  size={30} />}
					onClick={() => {
						console.log('Đăng xuất');
						logout("/admin/login");
					}}
				/>
			</Stack>
		</div>
	);
}