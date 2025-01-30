"use client"

import { AppShell, Burger } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { AdminSidebar } from '@component/Navbar/admin-sidebar.tsx';

export const AdminSidebarLayout = ({children}: {children: React.ReactNode}) => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			navbar={{
				width: 350,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			// padding="md"
		>
			<AppShell.Navbar>
				<AdminSidebar />
			</AppShell.Navbar>

			<AppShell.Main h={"100%"}>
				{
					children
				}
			</AppShell.Main>
		</AppShell>
	)
}