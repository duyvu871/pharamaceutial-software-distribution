"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "@route/hooks";
import { CenterBox } from "@component/CenterBox";
import { cn } from "@lib/tailwind-merge.ts";
import { Typography } from "@component/Typography";
import {
	Group,
	Box,
	Stack,
	ScrollArea,
	Divider,
} from "@mantine/core";

export type RenderTab = {
	key: string;
	label: string;
	icon?: React.ElementType;
	action?: () => void;
	renderSection: () => React.ReactNode;
};

type TabSectionBaseProps = {
	tabRender: RenderTab[];
	targetPath?: string;
	classNames?: {
		tab?: string;
		tabStack?: string;
		tabTypography?: string;
		tabIcon?: string;
		wrapper?: string;
		scrollArea?: string;
	}
	tabKey?: string;
	defaultTab?: string;
};

export default function TabSectionBase({tabRender, targetPath, classNames, tabKey, defaultTab}: TabSectionBaseProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const currentPath = usePathname() as string;
	const tabsParam = searchParams?.get(tabKey || "tab") || defaultTab || tabRender[0].key;

	return (
		<CenterBox
			className={"flex-1 bg-zinc-100 h-full overflow-hidden"}
			classNames={{
				inner: "flex flex-col w-full max-w-full h-full",
			}}
		>
			<Group h={"100%"} wrap={"nowrap"} gap={0} className={cn("", classNames?.wrapper)}>
				<Stack h={"100%"} gap={0} className={cn("bg-white pt-5", classNames?.tabStack)}>
					{tabRender.map((tab) => (
						<div
							key={'tab-' + tab.key}
							className={
								cn(
									'px-5 py-3 cursor-pointer group border-r-4 flex flex-nowrap items-center',
									{
										'bg-teal-500/20 border-teal-500': tab.key === tabsParam,
										'border-zinc-400/0 hover:bg-zinc-400/20 hover:border-zinc-400 transition-all': tab.key !== tabsParam,
									},
									classNames?.tab,
								)}
							onClick={() =>
								router.push(`${targetPath ?? currentPath}?tab=${tab.key}`)
							}
						>
							{
								tab.icon && (
									<tab.icon className={cn('mr-2 w-5 h-5', classNames?.tabIcon)} />
								)
							}
							<Typography
								className={cn(
									'transition-all whitespace-nowrap',
									{
										'text-teal-600': tab.key === tabsParam,
									},
									classNames?.tabTypography,
								)}
								weight={'semibold'}
								size={'content'}
							>
								{tab.label}
							</Typography>
						</div>
					))}
				</Stack>
				<Divider orientation="vertical" />
				<Box h={"100%"} w={"100%"} className={"overflow-y-hidden bg-white"}>
					<ScrollArea style={{ height: "100%" }} className={cn("", classNames?.scrollArea)}>
						<Box h={"100%"} w={"100%"} className={" p-10"}>
							{tabRender.find((t) => t.key === tabsParam)?.renderSection()}
						</Box>
					</ScrollArea>
				</Box>
			</Group>
		</CenterBox>
	);
}
