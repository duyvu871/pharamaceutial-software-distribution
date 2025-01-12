"use client"

import React from 'react';
import { useRouter, useSearchParams } from '@route/hooks';
import LicenseTab from '@container/dashboard/store/info/license-tab.tsx';
import PharmacyForm from '@component/Form/pharmacy-form.tsx';
import QRSupportForm from '@component/Form/qr-payment-form.tsx';
import RewardPointForm from '@component/Form/reward-point-form.tsx';
import PaymentForm from '@component/Form/payment-form.tsx';
import { CenterBox } from '@component/CenterBox';
import { cn } from '@lib/tailwind-merge.ts';
import { Typography } from '@component/Typography';
import { TbLicense } from "react-icons/tb";
import { Hospital } from 'lucide-react';
import { IconMapPin, IconUser, IconCertificate, IconCalendar } from '@tabler/icons-react';
import { Card, Text, Group, Badge, Accordion, Grid, Container, Title, Paper, ThemeIcon, List, AppShell, Burger, Skeleton, Box, Stack, Tabs, ScrollArea, Divider } from '@mantine/core';
import TabSectionBase from '@component/Tab/tab-section-base.tsx';


export default function UserSetting() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tab = searchParams?.get("tab");

	const tabsParam = (searchParams?.get("tab") || "license")

	const tabs = [
		{
			key: "config",
			label: "Cài đặt tài khoản",
			// icon: TbLicense,
			renderSection: () => <UserSetting />
		},

	]

	return (
		<TabSectionBase
			tabRender={tabs}
		/>
	);
}