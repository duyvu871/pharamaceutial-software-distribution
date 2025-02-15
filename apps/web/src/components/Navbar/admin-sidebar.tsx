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
import { useState, useEffect, useMemo } from "react";
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
import { IoIosSettings } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import NextImage from 'next/image';
import {Button, Image} from '@mantine/core'


interface NavItemProps {
	item: SidebarItem;
	depth?: number;
}

export interface SidebarItem {
	icon?: React.ElementType;
	label: string;
	href?: string;
	active?: boolean;
	initiallyOpened?: boolean;
	children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
	{
		icon: IconLayoutDashboard,
		label: "Dashboard",
		href: "/admin/dashboard",
	},
	{
		icon: IconUser,
		label: "Quản lý Admin",
		href: "/admin/dashboard/admins",
	},
	{
		icon: IconUser,
		label: "Quản lý đại lý",
		href: "/admin/dashboard/agents",
	},
	{
		icon: IconBuildingStore,
		label: "Danh sách cửa hàng",
		href: "/admin/dashboard/branches",
	},
	{
		icon: IconSettings,
		label: "Cài đặt",
		children: [
			{
				label: "Gói dịch vụ - cửa hàng",
				href: "/admin/dashboard/settings/branch-plan",
			},
			{
				label: "Gói dịch vụ - admin",
				href: "/admin/dashboard/settings/branch-plan",
			},
			{
				label: "Chung",
				href: "/admin/dashboard/settings/general",
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
];

function NavItem({ item, depth = 0 }: NavItemProps) {
	const { isHighEndAdmin } = useProtectHighEndAdmin();
	const pathname = usePathname();
	const [opened, setOpened] = useState(item.initiallyOpened || false);
	const hasChildren = item.children && item.children.length > 0;
	const isActive = item.href === pathname;

	const shouldHideItem = useMemo(() => {
		return !isHighEndAdmin && item.href && blockHighEndRoute.some(route =>
			item.href?.startsWith(route)
		);
	}, [isHighEndAdmin, item.href]);

	console.log("shouldHideItem", shouldHideItem);

	useEffect(() => {
		if (item.children) {
			const hasActiveChild = item.children.some(child =>
				child.href === pathname || pathname?.startsWith(child.href || "")
			);
			setOpened(hasActiveChild);
		}
	}, [pathname, item.children, isHighEndAdmin]);

	const toggleOpen = () => hasChildren && setOpened(o => !o);

	if (shouldHideItem) return null;

	return (
		<Stack gap={0}>
			<UnstyledButton
				component={item.href ? Link : undefined}
				href={item.href || '#'}
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
						<item.icon
							size={26}
							className={cn({
								"text-white": isActive,
								"!text-zinc-100 group-hover:!text-white": !isActive
							})}
						/>
					)}
					<Text
						className={cn(
							"flex-grow !text-xl font-medium",
							{
								"!text-white": isActive,
								"!text-zinc-100 group-hover:!text-white": !isActive
							}
						)}
					>
						{item.label}
					</Text>
					{hasChildren && (
						<IconChevronRight
							className={`transition-transform duration-200 ease-in-out ${
								opened ? "rotate-90" : ""
							} ${isActive ? "text-white" : "text-zinc-100"}`}
							size={16}
						/>
					)}
				</Group>
			</UnstyledButton>

			{hasChildren && (
				<Collapse in={opened}>
					<Stack
						gap={0}
						className={`ml-${depth * 4 + 4} mt-1 border-l border-zinc-200 pl-2`}
					>
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
	const { logout } = useAuth();
	const { isHighEndAdmin } = useProtectHighEndAdmin();

	const filteredItems = useMemo(() =>
			sidebarItems.filter(item =>
					isHighEndAdmin || !blockHighEndRoute.some(route =>
						item.href?.startsWith(route)
					)
			),
		[isHighEndAdmin]
	);

	return (
		<div className="min-h-screen bg-teal-600 p-4 flex flex-col justify-between border-r border-zinc-100">
			<div>
				<div className="mb-6 p-4 py-2 flex items-center gap-2 bg-zinc-100 rounded-md">
					<Image component={NextImage} src={"/images/logo-MP-thuoc.png"} alt={"logo"} width={200} height={200}
								 className={"!w-8"} />
					<Typography
						size="h3"
						weight="bold"
						color="primary"
						className="px-3"
					>
						Quản Trị
					</Typography>
				</div>
				<Stack gap="xs">
					{filteredItems.map((item, index) => (
						<NavItem key={index} item={item} />
					))}
				</Stack>
			</div>

			<Stack gap="xs">
				<NavLink
					className="!p-3 !bg-teal-50 rounded-lg hover:!bg-teal-100 transition-colors"
					active={false}
					label={
						<Typography size="h5" weight="semibold" color="primary">
							Đăng xuất
						</Typography>
					}
					leftSection={<IoExitOutline size={24} className="text-teal-600" />}
					onClick={() => logout("/admin/login")}
				/>
			</Stack>
		</div>
	);
}