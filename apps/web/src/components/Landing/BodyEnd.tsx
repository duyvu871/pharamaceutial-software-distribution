import { Box, Button, Container, Grid, Table, Text, Textarea, Title } from '@mantine/core';
import { Input } from '@mantine/core';
import { IconMapPins, IconPhone ,IconMail  } from '@tabler/icons-react';
export default function BodyEnd() {
	return (
		<Box maw="100%"  h="auto"   bg="linear-gradient(to right, #6372ff 0%, #5ca9fb 100%)">
			<Container maw="80%"  size={700} p="100px 0px 75px">
				<Grid>
					<Grid.Col span={{ base: 12, md: 5 , lg: 8 }}>
						<Title order={1} className='custom-underline2'  c="white" size='36px' p="0 0 15px">LIÊN HỆ</Title>
						<Text  p="15px 0 25px"  c="white">Để biết thêm chi tiết hoặc nhận hỗ trợ, vui lòng liên hệ với chúng tôi và đội ngũ của chúng tôi sẽ đáp ứng nhanh chóng.</Text>
						<Table >
							<tbody >
							<tr >
								<td style={{ padding: '0px 15px 0px 0px' }}>
									<Input placeholder="HỌ VÀ TÊN" />
								</td>
								<td style={{ padding: '15px' }}>
									<Input placeholder="EMAIL" />
								</td>
							</tr>
							<tr>
								<td colSpan={2} style={{ padding : " 0px 15px 0px 0px" }}>  {/* Đặt colSpan để chiếm toàn bộ chiều rộng của bảng */}
									<Textarea
										size="lg"
										radius="md"
										placeholder="Câu hỏi "

									/>
								</td>
							</tr>

							</tbody>
						</Table>
						<Button variant="outline" color="white " size="lg" radius="xl" m="15px 0px ">SEND MESSAGE</Button>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 5 , lg: 3 }}>
						<Text  m="75px 0 25px" p="0 0 20px" size='20px' c="white">Thông Tin Liên Hệ Trực Tiếp
						</Text>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<IconMapPins stroke={2} color="white" />
							<Text c="white">Địa chỉ</Text>
						</div>
						<Text  c="white" m="0 0 15px">Nhà Số 7/55, Tổ Dân Phố Bình Minh, Đường Nguyễn Đức Thuận, Thị Trấn Trâu Quỳ, Huyện Gia Lâm, Thành phố Hà Nội</Text>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<IconPhone stroke={2}  color="white" />
							<Text c="white">Số điện thoại</Text>
						</div>
						<Text  c="white" m="0 0 10px">0559 582056</Text>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<IconMail stroke={2} color="white" />
							<Text c="white">email</Text>
						</div>
						<Text  c="white"  m="0 0 10px">duocphamera@gmail.com</Text>
					</Grid.Col>
				</Grid>
			</Container>
		</Box>
	);
}