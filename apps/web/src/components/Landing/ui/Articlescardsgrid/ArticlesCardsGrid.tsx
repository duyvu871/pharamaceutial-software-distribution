import { AspectRatio, Card, Container, Image, SimpleGrid, Text } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';

const mockdata = [
	{
		title: 'Phác đồ cá thể hóa - chìa khóa mang lại hiệu quả tối ưu cho bệnh nhân ung thư vú',
		image:
			'https://www.vinmec.com/static//uploads/small_nurse_holding_her_patients_hand_dcaccfb1c4.jpg',
		date: 'August 18, 2024',
	},
	{
		title: 'Cuộc chiến với ung thư vú di căn bằng phương pháp điều trị cá thể hóa',
		image:
			'https://www.vinmec.com/static//uploads/small_daughter_holding_her_mothers_hand_hospital_642e48dd59.jpg',
		date: 'August 27, 2024',
	},
	{
		title: 'Đi chụp X-quang, bất ngờ phát hiện ung thư vú giai đoạn 0',
		image:
			'https://www.vinmec.com/static//uploads/small_covid_recovery_center_female_doctor_holding_elder_patient_s_hands_3dff202aa0.jpg',
		date: 'September 9, 2024',
	},
	{
		title: 'Cảnh báo u vú ở tuổi dậy thì',
		image:
			'https://www.vinmec.com/static//uploads/small_doctor_helping_patient_c6ca1c7eac.jpg',
		date: 'September 12, 2023',
	},
];

export function ArticlesCardsGrid() {
	const cards = mockdata.map((article) => (
		<Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
			<AspectRatio ratio={1920 / 1080}>
				<Image src={article.image} />
			</AspectRatio>
			<Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
				{article.date}
			</Text>
			<Text className={classes.title} mt={5}>
				{article.title}
			</Text>
		</Card>
	));

	return (
		<Container py="xl">
			<SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
		</Container>
	);
}