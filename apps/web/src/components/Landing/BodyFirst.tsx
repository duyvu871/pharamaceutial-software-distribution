import {  Center, Box, Button, Title, Grid } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { BackgroundContent, BackgroundContent2, BackgroundContent3, BackgroundContent4 } from './ui/bgextrension';

export default function BodyFirst() {

	const autoplay = useRef(Autoplay({ delay: 2000 }));


	return (
		<Box maw="100%" pb="200px" mt="-56px" style={{ position: 'relative' }}>
			<Grid>
				<Grid.Col span={{ base:6, md: 6, lg: 6 }}>
					<Center p='lg' mt="20px">
						<Title
							order={1}
							maw="90%" // Tăng độ rộng tối đa cho thiết bị di động
							fw={600}
							size="60px"
							c="black"
							className="titlee2"
						>
							PHẦN MỀM QUẢN LÝ NHÀ THUỐC CHUẨN GPP
						</Title>
					</Center>
					<Center p='lg'>
						<Title
							order={2}
							c="black"
							fw={600}
							maw="90%" // Tăng độ rộng tối đa cho thiết bị di động
							className="titlee"

						>
							Tối ưu hóa quản lý nhà thuốc với phần mềm chuẩn GPP – Đảm bảo chất lượng, nâng cao hiệu suất!
						</Title>
					</Center>
					<Box p={{ base:"25px", md: "50px", lg: "50px" }}>

						<Button size="lg" radius="xl" className="responsive-button">
							Xem Thêm
						</Button>
					</Box>
				</Grid.Col>

				<Grid.Col span={{ base:5, md: 6, lg: 5 }}
				>
					<Carousel
						withIndicators
						height={600}
						plugins={[autoplay.current]}
						onMouseEnter={autoplay.current.stop}
						onMouseLeave={autoplay.current.reset}
					>
						<Carousel.Slide><BackgroundContent/></Carousel.Slide>
						<Carousel.Slide><BackgroundContent2/></Carousel.Slide>
						<Carousel.Slide><BackgroundContent3/></Carousel.Slide>
						<Carousel.Slide><BackgroundContent4/></Carousel.Slide>

					</Carousel>
				</Grid.Col>
			</Grid>
		</Box>
	);
}