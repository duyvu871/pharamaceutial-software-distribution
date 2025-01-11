
import { ThemeIcon, Text, Title, Container, SimpleGrid, rem, Box, Image } from '@mantine/core';
import classes from './FeaturesGrid.module.css';
import { MOCKDATA } from '@component/Landing/BodyFour';
import { MOCKDATA5 } from '@component/Landing/BodyFive';
import React, { CSSProperties } from 'react';

// Định nghĩa lại kiểu của icon
interface IconProps {
	stroke?: number | string;  // Độ dày của viền icon
	style?: CSSProperties; // Kiểu CSS cho icon
}
interface FeatureProps {
	icon: React.FC<IconProps> | string; // Sử dụng component icon

	title:React.ReactNode;
	description:React.ReactNode;
}


export function Feature4({ icon: Icon, title, description }: FeatureProps) {
	return (
		<div>
			<ThemeIcon variant="light" size={40} radius={40}>
				<Icon style={{ width: rem(50), height: rem(50), color:"white"}} stroke={2.5} />
			</ThemeIcon>
			<Text mt="md" mb={7}>
				{title}
			</Text>
			<Text size="sm" c="white" lh={1.6}  fw={200}   style={{ opacity: 0.8 }}

			>
				{description}
			</Text>
		</div>
	);
}
export function Feature5({ icon: Icon, title, description }: FeatureProps) {
	return (
		<div>
			<Image src= {Icon} alt='bsi'    style={{
				width: '64px',
				height: '64px',
				borderRadius: '50%',
				objectFit: 'cover',
			}}></Image>
			<Text size="sm"  lh={1.6} fw={700} fs="normal"         c="#333"
			>
				{description}
			</Text>
			<Text mt="sm" mb={7} fs="italic" fw={400}         c="#777">
				{title}
			</Text>


		</div>
	);
}

export function FeaturesGrid({ source }: { source: string }) {
	if (source === 'bodyfour') {
		const features = MOCKDATA.map((feature: React.JSX.IntrinsicAttributes & FeatureProps, index: React.Key | null | undefined) => <Feature4 {...feature} key={index}  />);

		return (
			<Container className={classes.wrapper}>
				<Title className={classes.title}>Cung Cấp Dịch Vụ
				</Title>
				<Box  style={{
					width: '70px',
					height: '4px',
					margin: '8px auto 0',
					background: 'linear-gradient(to right, #6a11cb, #2575fc)',
					borderRadius: '4px',
				}}></Box>      <Container size={560} p={15}>
				<Text size="md" className={classes.description}>
					Với hơn 10 năm kinh nghiệm cung cấp dịch vụ quản lý cho cơ sở bán lẻ thuốc.
					Chúng tôi biết bạn cần:
				</Text>
			</Container>

				<SimpleGrid
					mt={60}
					cols={{ base: 1, sm: 2, md: 3 }}
					spacing={{ base: 'xl', md: 50 }}
					verticalSpacing={{ base: 'xl', md: 50 }}
				>
					{features}
				</SimpleGrid>
			</Container>
		);
	}
	if (source === 'bodyfive') {
		const features = MOCKDATA5.map((feature: React.JSX.IntrinsicAttributes & FeatureProps, index: React.Key | null | undefined) => <Feature5 {...feature} key={index}  />);

		return (
			<Container className={classes.wrapper}>
				<Title className={classes.title}>What our clients say

				</Title>
				<Box  style={{
					width: '70px',
					height: '4px',
					margin: '8px auto 0',
					background: 'linear-gradient(to right, #6a11cb, #2575fc)',
					borderRadius: '4px',
				}}></Box>

				<SimpleGrid
					mt={60}
					cols={{ base: 1, sm: 2, md: 3 }}
					spacing={{ base: 'xl', md: 50 }}
					verticalSpacing={{ base: 'xl', md: 50 }}
				>
					{features}
				</SimpleGrid>
			</Container>
		);
	}
}