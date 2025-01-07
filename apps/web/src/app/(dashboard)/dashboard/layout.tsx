
import "@app/globals.css";
import "@ui/styles.css";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import type { Metadata } from "next";
import { Inter as FontSans, Montserrat } from "next/font/google";
import {cn} from "@lib/tailwind-merge";
import { ThemeProvider } from "@layout/global-theme";
import 'dayjs/locale/vi';
import dayjs from "dayjs";
dayjs().locale('vi')

const fontSans = Montserrat({
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
	// metadataBase: new URL("./public/graphics/feature_1.png"),
};

export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn(fontSans.className, "min-h-screen h-fit font-sans antialiased bg-[#ffffff]")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					disableTransitionOnChange
					// enableSystem
					forcedTheme={'light'}
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
