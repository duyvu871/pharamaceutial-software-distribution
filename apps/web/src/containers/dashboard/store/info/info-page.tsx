"use client";

import React from 'react';
import { Card, Text, Group, Badge, Accordion, Grid, Container, Title, Paper, ThemeIcon, List } from '@mantine/core';
import { IconMapPin, IconUser, IconCertificate, IconCalendar } from '@tabler/icons-react';
import { Typography } from '@component/Typography';

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
		<Container size="xl" py="xl">
			<Typography size={"h3"} weight={"bold"} className={"mb-5"}>Thông Tin Chi Tiết Nhà Thuốc</Typography>
			<Paper shadow="md" p="md">
				<Grid>
					<Grid.Col span={12}>
						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Group mb="xs">
								<Text fw={500} size="lg">{pharmacy.ten_nha_thuoc}</Text>
								<Badge color="blue" variant="light">
									{pharmacy.loai_hinh}
								</Badge>
							</Group>
							<Text size="sm" color="dimmed">Số đăng ký: {pharmacy.so_dang_ky}</Text>
						</Card>
					</Grid.Col>

					<Grid.Col span={6}>
						<Accordion multiple>
							<Accordion.Item value="location">
								<Accordion.Control icon={<IconMapPin size={20} />}>
									Địa chỉ
								</Accordion.Control>
								<Accordion.Panel>
									<Text>{pharmacy.dia_chi}</Text>
									<Text>
										{pharmacy.huyen}, {pharmacy.tinh}
									</Text>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="representatives">
								<Accordion.Control icon={<IconUser size={20} />}>
									Người đại diện
								</Accordion.Control>
								<Accordion.Panel>
									<List
										spacing="xs"
										size="sm"
										center
										icon={
											<ThemeIcon color="teal" size={24} radius="xl">
												<IconUser size={16} />
											</ThemeIcon>
										}
									>
										<List.Item>{pharmacy.nguoi_dai_dien}</List.Item>
										<List.Item>{pharmacy.nguoi_chiu_trach_nhiem}</List.Item>
										<List.Item>{pharmacy.nguoi_chiu_trach_nhiem_chuyen_mon}</List.Item>
									</List>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</Grid.Col>

					<Grid.Col span={6}>
						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Group>
								<ThemeIcon variant="light" size={40}>
									<IconCertificate size={20} />
								</ThemeIcon>
								<div>
									<Text fw={500}>Số chứng chỉ hành nghề</Text>
									<Text size="sm">{pharmacy.so_chung_chi_hanh_nghe}</Text>
								</div>
							</Group>
						</Card>

						<Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
							<Group>
								<ThemeIcon variant="light" size={40}>
									<IconCalendar size={20} />
								</ThemeIcon>
								<div>
									<Text fw={500}>Thông tin thời gian</Text>
									<Text size="xs">Tạo lúc: {new Date(pharmacy.createdAt).toLocaleString()}</Text>
									<Text size="xs">Cập nhật lúc: {new Date(pharmacy.updatedAt).toLocaleString()}</Text>
								</div>
							</Group>
						</Card>
					</Grid.Col>
				</Grid>
			</Paper>
		</Container>
	);
};

export default PharmacyInfo;

