"use client";

import React from 'react';
import { Card, Text, Group, Badge, Accordion, Grid, Container, Title, Paper, ThemeIcon, List, AppShell, Burger, Skeleton, Box, Stack, Tabs, ScrollArea, Divider } from '@mantine/core';
import { IconMapPin, IconUser, IconCertificate, IconCalendar } from '@tabler/icons-react';
import { Typography } from '@component/Typography';
import { TbLicense } from "react-icons/tb";
import { Hospital } from 'lucide-react';
import LicenseTab from '@container/dashboard/store/info/license-tab.tsx';
import PharmacyForm from '@component/Form/pharmacy-form.tsx';
import RewardPointForm from '@component/Form/reward-point-form.tsx';
import { useSearchParams, useRouter } from '@route/hooks';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import PaymentForm from '@component/Form/payment-form.tsx';
import QRSupportForm from '@component/Form/qr-payment-form.tsx';
import { cn } from '@lib/tailwind-merge.ts';
import { CenterBox } from '@component/CenterBox';

interface PharmacyDetails {
	id: string;
	branch_id: string;
	so_dang_ky: string;
	ten_nha_thuoc: string;
	loai_hinh: string;
	tinh: string;
	huyen: string;
	dia_chi: string;
	nguoi_dai_dien: string;
	nguoi_chiu_trach_nhiem: string;
	nguoi_chiu_trach_nhiem_chuyen_mon: string;
	so_chung_chi_hanh_nghe: string;
	createdAt: string;
	updatedAt: string;
}

const PharmacyInfo: React.FC<{ branchId?: string }> = ({ branchId }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tab = searchParams?.get("tab");
	const pharmacyDetails = {
		id: "123",
		branch_id: "456",
		so_dang_ky: "ABC123",
		ten_nha_thuoc: "Nhà Thuốc Sức Khỏe",
		loai_hinh: "Bán lẻ",
		tinh: "Hà Nội",
		huyen: "Cầu Giấy",
		dia_chi: "123 Đường ABC",
		nguoi_dai_dien: "Nguyễn Văn A",
		nguoi_chiu_trach_nhiem: "Trần Thị B",
		nguoi_chiu_trach_nhiem_chuyen_mon: "Lê Văn C",
		so_chung_chi_hanh_nghe: "XYZ789",
		createdAt: "2023-06-01T00:00:00Z",
		updatedAt: "2023-06-15T00:00:00Z",
	};

	const [pharmacy, setPharmacy] = React.useState<PharmacyDetails | null>(pharmacyDetails);

	if (!pharmacy) {
		return (
			<Container size="lg" py="xl">
				<Text >No pharmacy information available.</Text>
			</Container>
		);
	}

	const tabsParam = (searchParams?.get("tab") || "license")

	const tabs = [
		{
			key: "license",
			label: "Cài đặt giấy phép",
			icon: TbLicense,
			renderSection: () => <LicenseTab />
		},
		{
			key: "pharmacy",
			label: "Thông tin nhà thuốc",
			icon: Hospital,
			renderSection: () => (
				<Group align={'start'} className="h-full overflow-hidden !gap-10">
					<PharmacyForm />
					<QRSupportForm />
				</Group>
			)
		},
		{
			key: "reward",
			label: "Thông tin tích điểm",
			icon: IconCertificate,
			renderSection: () => <RewardPointForm />
		},
		{
			key: "payment",
			label: "Thông tin thanh toán",
			icon: IconCalendar,
			renderSection: () => <PaymentForm />
		}
	]

	return (
		<CenterBox
			className={'flex-1 bg-zinc-100 h-full overflow-hidden'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full'
			}}
		>
			<Group h={"100%"} wrap={"nowrap"} gap={0}>
				<Stack h={"100%"} gap={0} className={"bg-white pt-5"}>
					{tabs.map((tab) => (
						<div
							key={'tab-' + tab.key}
							className={cn(
								"px-5 py-3 cursor-pointer group border-r-4 ",
								{
									"bg-teal-500/20 border-teal-500": tab.key === tabsParam,
									"border-zinc-400/0 hover:bg-zinc-400/20 hover:border-zinc-400 transition-all": tab.key !== tabsParam
								}
							)}
							onClick={() => router.push(`/dashboard/store/${branchId}/info?tab=${tab.key}`)}
						>
							<Typography
								className={cn(
									"transition-all whitespace-nowrap",
									{
										"text-teal-600": tab.key === tabsParam
									}
								)}
								weight={"semibold"}
								size={"content"}
							>{tab.label}</Typography>
						</div>
					))}
				</Stack>
				<Divider orientation="vertical" />
				<Box h={"100%"} w={"100%"} className={"overflow-y-hidden bg-white"}>
					<ScrollArea style={{ height: '100%' }}>
						<Box h={"100%"} w={"100%"} className={" p-10"}>
							{tabs.find((t) => t.key === tabsParam)?.renderSection()}
						</Box>
					</ScrollArea>
				</Box>
			</Group>
		</CenterBox>
	);
};

export default PharmacyInfo;

