"use client"
// src/components/ui/Header_with_mega_menu.tsx
import '@mantine/core/styles.css';

import {
	Group,
	Button,

	Text,

	Divider,
	Box,
	Burger,
	Drawer,
	ScrollArea,
	rem,
	Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderMegaMenu.module.css';
import { useRouter } from 'next/navigation';
//   import '@mantine/core/styles.layer.css';



export function HeaderMegaMenu() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

	const router = useRouter();


	return (
		<Box pb={136} >
			<header style={{ height: '80px', padding: '20px 0' }} className={classes.header}>
				<Group  gap={0} justify="space-between" h="100%">

					<Group h="100%" gap={0} visibleFrom="sm">
						<Text mr={{  md: '0px', lg: '150px' }}>  </Text>
						<a href="#" className={classes.link}>
							<Image src="\images\img\logoPMthuoc.png" alt="Logo" w="80px" h="60px" />
						</a>
						<Text mr={{  md: '-50px', lg: '350' }} >   </Text>
						<a href="#" style={{ color: '#555', textDecoration: 'none' }} className={classes.link} >TRANG CHỦ</a>
						<a href="#" style={{ color: '#555', textDecoration: 'none' }} className={classes.link}>SẢN PHẨM</a>
						<a href="#" style={{ color: '#555', textDecoration: 'none' }} className={classes.link}>HƯỚNG DẪN</a>
						<a href="#" style={{ color: '#555', textDecoration: 'none' }} className={classes.link}>GIỚI THIỆU</a>
					</Group>


					<Group visibleFrom="sm" mr={{  md: '0px', lg: '100px' }}>
						<Button variant="default" onClick={() => {
							router.push('/login');
						}}>ĐĂNG NHẬP</Button>
						<Button>ĐĂNG KÝ</Button>
					</Group>

					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="ERADO"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					<a href="#" className={classes.link}>TRANG CHỦ</a>

					<a href="#" className={classes.link}>SẢN PHẨM</a>
					<a href="#" className={classes.link}>HƯỚNG DẪN</a>
					<a href="#" className={classes.link}>GIỚI THIỆU</a>
					<Divider my="sm" />
					<Group justify="center" grow pb="xl" px="md">
						<Button variant="default">ĐĂNG NHẬP</Button>
						<Button>ĐĂNG KÝ</Button>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
