"use client";

import React from 'react';
import { Card, Text, Group, Badge, Accordion, Grid, Container, Title, Paper, ThemeIcon, List, AppShell, Burger, Skeleton, Box, Stack, Tabs, ScrollArea } from '@mantine/core';
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

	return (
			<Group h={"100%"} wrap={"nowrap"}>
				<Tabs
					color={"teal"}
					w={"100%"}
					h={"100%"}
					defaultValue="license"
					orientation="vertical"
					value={tab || "license"}
					onChange={(value) => {
						router.push(`/dashboard/store/${branchId}/info?tab=${value}`);
					}}
					styles={{
						tab: {
							// "--tab-border-width": "4px",
							borderRightWidth: "5px",
						}
					}}
					className={"[&[data-active]]:!bg-teal-500"}
				>
					<Tabs.List pt={20}>
						<Tabs.Tab className={cn("h-14 w-[230px] group", tab === "license" && "!bg-teal-500/20")} value="license">
							<Typography weight={"semibold"} className={"flex items-center gap-2 group-hover:text-teal-500  transition-all"}>
								Cài đặt giấy phép
							</Typography>
						</Tabs.Tab>
						<Tabs.Tab className={cn("h-14 w-[230px] group", tab === "pharmacy" && "!bg-teal-500/20")} value="pharmacy">
							<Typography weight={"semibold"} className={"flex items-center gap-2 group-hover:text-teal-500  transition-all"}>
								Thông tin nhà thuốc
							</Typography>
						</Tabs.Tab>
						<Tabs.Tab className={cn("h-14 w-[230px] group", tab === "reward" && "!bg-teal-500/20")} value="reward">
							<Typography weight={"semibold"} className={"flex items-center gap-2 group-hover:text-teal-500  transition-all"}>
								Thông tin tích điểm
							</Typography>
						</Tabs.Tab>
						<Tabs.Tab className={cn("h-14 w-[230px] group", tab === "payment" && "!bg-teal-500/20")} value="payment">
							<Typography weight={"semibold"} className={"flex items-center gap-2 group-hover:text-teal-500  transition-all"}>
								Thông tin thanh toán
							</Typography>
						</Tabs.Tab>
					</Tabs.List>

					{/*<Tabs.Panel p={20} value="gallery">Gallery tab content</Tabs.Panel>*/}
					{/*<Tabs.Panel p={20} value="messages">Messages tab content</Tabs.Panel>*/}
					{/*<Tabs.Panel p={20} value="settings">Settings tab content</Tabs.Panel>*/}
					<Tabs.Panel p={40} value="license" className={"overflow-y-auto "}>
						{/*<Container size={"xl"}>*/}
						{/*	<ScrollArea>*/}
								<LicenseTab />
							{/*</ScrollArea>*/}
						{/*</Container>*/}
					</Tabs.Panel>
					<Tabs.Panel p={40} value="pharmacy" className={"overflow-y-auto "}>
						{/*<ScrollArea>*/}
						<Group align={'start'} className="h-full overflow-hidden !flex-nowrap !gap-10">
							<PharmacyForm />
							<QRSupportForm />
						</Group>
							{/*</ScrollArea>*/}

					</Tabs.Panel>
					<Tabs.Panel p={40} value="reward">
						<RewardPointForm />
					</Tabs.Panel>
					<Tabs.Panel p={40} value="payment">
						<PaymentForm />
					</Tabs.Panel>
				</Tabs>
			</Group>
	);
};

export default PharmacyInfo;

