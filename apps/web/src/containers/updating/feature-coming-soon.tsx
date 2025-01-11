import { Container, Card, Title, Text, Stack, Badge, Center } from '@mantine/core';

function FeatureComingSoon() {
	return (
		<Center h={'100%'}>
			<Container size="sm">
				<Card shadow="sm" padding="lg" radius="md" withBorder>
					<Stack gap="lg">
						<Badge color="teal" size="xl">Tính năng mới</Badge>
						<Title order={1}>
							Sắp ra mắt!
						</Title>
						<Text color="dimmed">
							Chúng tôi đang phát triển tính năng này. Vui lòng quay lại sau!
							<br />
							Cảm ơn sự kiên nhẫn của bạn.
						</Text>
						<Text size="sm" mt={"md"}>
							<span style={{color: "teal", fontWeight: 500}}>Phần mềm phân phối dược phẩm</span>
							<br/>
							<span style={{color: "gray"}}>phiên bản 1.0.1</span>
						</Text>
					</Stack>
				</Card>
			</Container>
		</Center>
	);
}

export default FeatureComingSoon;