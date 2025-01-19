'use client'
import { useState } from 'react';
import {
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons-react';
import { Stack, Text, Tooltip, UnstyledButton, AppShell, Group, Burger } from '@mantine/core';
import classes from './NavbarMinimal.module.css';
import LayerDashboard from './LayerDashboard/1dashboard';
import AdminManager from './AdminManagement/AdminManager';
import StoreManager from './StoreManagement/StoreManager';
import UserManager from './userManager/userManager';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
        <Text size="md" ml="xs"> {label}</Text>
      </UnstyledButton>
    </Tooltip>
  );
}

const Data = [
  { icon: IconHome2, label: 'Dashboard' },
  { icon: IconGauge, label: 'Quản lý Admin' },
  { icon: IconDeviceDesktopAnalytics, label: 'Quản lý Đại lý' },
  { icon: IconUser, label: 'Danh sách cửa hàng' },
];

const components = [
  <LayerDashboard key="dashboard" />,
  <AdminManager key="adminManager" />,
  <StoreManager key="storeManager" />,
  <UserManager key="userManager" />,
];


export function NavbarMinimal() {
  const [active, setActive] = useState(0); // Chọn mặc định là Dashboard (index 0)
  const [opened, setOpened] = useState(false);

  const toggle = () => setOpened((prev) => !prev);

  const links = Data.map((link, index) => (
    <NavbarLink 
      {...link}
      key={link.label} // Đảm bảo key đã được thêm
      active={index === active}
      onClick={() => setActive(index)} // Cập nhật active index khi click
    />
  ));

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={{
        width: 300,
        
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: { backgroundColor: '#f7f7f7' }, // Đặt nền trắng cho nội dung chính
        header: { background: "#0066CC" },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* ddoan nay o dung NextImage  thêm cái ảnh logo */}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar pt="lg" >
        <div className={classes.navbarMain}>
        <Stack   gap="sm"   align="flex-start" h="250px" fw={900} >  

            {links} 
          </Stack>
        </div>
        <Stack  gap="sm"align="flex-start"  h="100px"  >  
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        {/* Hiển thị component dựa trên active index */}
        {components[active]}
      </AppShell.Main>
    </AppShell>
  );
}
