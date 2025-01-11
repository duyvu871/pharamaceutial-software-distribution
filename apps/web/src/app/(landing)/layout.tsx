import "@app/globals.css";
import "@ui/styles.css";
import '@mantine/core/styles.css';
<<<<<<< HEAD
import { MantineProvider } from '@mantine/core';

import type { Metadata } from "next";
=======
import type { Metadata, Viewport } from "next";
>>>>>>> 3cd4b395c4d91c0ab77564848256c4b782e730a0
import { Inter as FontSans } from "next/font/google";
import {cn} from "@lib/tailwind-merge";
import { ThemeProvider } from "@layout/global-theme";
import { redirect } from "next/navigation";
import RootLayoutClient from '@layout/root-layout-client.tsx';

const fontSans = FontSans({
	subsets: ['latin', 'vietnamese'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: "Era8 - Phần mềm quản lý nhà thuốc",
	description: "Phần mềm quản lý nhà thuốc giúp bạn quản lý thuốc, khách hàng, nhà cung cấp, hóa đơn, báo cáo, ...",
	generator: 'Era8',
	applicationName: 'Era8 - Phần mềm quản lý nhà thuốc',
	referrer: 'origin-when-cross-origin',
	keywords: ['Era8', 'thuốc', 'phần mềm', 'quản lý', 'nhà thuốc', 'pharmacy', 'management', 'software'],
	authors: [{ name: 'DuBui' }, { name: 'Du', url: 'v1.era8.vn' }],
	creator: 'BuiDu',
	publisher: 'BuiDu',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	manifest: "/manifest.json",
	// metadataBase: new URL("./public/graphics/feature_1.png"),
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// Also supported but less commonly used
	// interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode;
}): JSX.Element {
	// return redirect('/login');
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={"overscroll-contain scroll-smooth"}
		>
		{/*<head>*/}
		{/*	<link*/}
		{/*		rel="manifest"*/}
		{/*		href="/manifest.json"*/}
		{/*	/>*/}
		{/*	<title></title>*/}
		{/*</head>*/}
		<body className={cn(fontSans.className, "min-h-dvh  font-sans antialiased bg-[#ffffff]")}>
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			disableTransitionOnChange
			// enableSystem
			forcedTheme={'light'}
		>
<<<<<<< HEAD
			<MantineProvider>

			{children}
			</MantineProvider>

=======
			<RootLayoutClient>
				{children}
			</RootLayoutClient>
>>>>>>> 3cd4b395c4d91c0ab77564848256c4b782e730a0
		</ThemeProvider>
		</body>
		</html>
	);
}
