import { Text, Box, Space, Title, Image, Grid, Table } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function BodyThree() {
	return (
		<Box maw="95%" h="auto" mx="auto" mt="-150px" p="0px 80px 80px 80px" style={{ '@media (maxWidth: 600px)': { padding: '20px' } }}>
			<Grid>
				<Grid.Col  span={{ base: 12, md: 5 , lg: 5 }} >
					<Image mt="-40px" src="https://png.pngtree.com/png-clipart/20231020/original/pngtree-pharmacy-and-medicine-and-pharmacist-png-image_13373032.png" alt="About Us" />
				</Grid.Col>
				<Grid.Col  span={{ base: 12, md: 6, lg: 6 }}  ml="xl" p="-8px">
					<Title order={1} className="custom-underline" style={{ fontSize: '2rem', '@media (maxWidth: 600px)': { fontSize: '1.5rem' } }}>
						VỀ CHÚNG TÔI
					</Title>
					<Space h="xl" />
					<Text style={{ fontSize: '1.2rem', '@media (maxWidth: 600px)': { fontSize: '1rem' } }}>
						Chào mừng bạn đến với Erado - giải pháp toàn diện dành cho quản lý bán thuốc tại nhà thuốc và quầy thuốc. Chúng tôi chuyên cung cấp phần mềm quản lý bán thuốc tiên tiến, giúp tối ưu hóa quy trình bán hàng, quản lý tồn kho, và chăm sóc khách hàng một cách hiệu quả, nhằm nâng cao chất lượng dịch vụ và tăng cường sự phát triển bền vững cho nhà thuốc của bạn.
					</Text>
					<Space h="md" />

					<Title order={3} style={{ fontSize: '1.5rem', '@media (maxWidth: 600px)': { fontSize: '1.2rem' } }}>
						Tại sao nên chọn chúng tôi?
					</Title>
					<Space h="sm" />

					<Table style={{ width: '100%' }}>
						<tbody>
						<tr>
							<td>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconCheck size={16} color="blue" />
									<Text>Dễ dàng sử dụng</Text>
								</div>
							</td>
							<td>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconCheck size={16} color="blue" />
									<Text>Dịch vụ hỗ trợ tận tình</Text>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconCheck size={16} color="blue" />
									<Text>Hiệu quả tối đa</Text>
								</div>
							</td>
							<td>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconCheck size={16} color="blue" />
									<Text>Tiết kiệm chi phí</Text>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconCheck size={16} color="blue" />
									<Text>Dịch vụ tốt nhất</Text>
								</div>
							</td>
							<td>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconCheck size={16} color="blue" />
									<Text>Hỗ trợ lâu dài</Text>
								</div>
							</td>
						</tr>
						</tbody>
					</Table>
				</Grid.Col>
			</Grid>
		</Box>
	);
}