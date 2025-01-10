import {  Box } from '@mantine/core';
import { FeaturesGrid } from './ui/Features/Features_with_monotone_icons';

export const MOCKDATA5 = [
	{
		icon: '\\images\\img\\lanhuong.png',
		title: 'Phần mềm giúp chúng tôi quản lý hiệu quả hơn với giao diện dễ sử dụng và hỗ trợ tận tình. Rất hài lòng!',
		description:
			'Nguyễn Thị Lan, Chủ nhà thuốc Lan Hương:'  },
	{
		icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2m1crotr8hDLdv5qeoStWbhmv9df5XUA6vQ&s' ,
		title: 'Chúng tôi rất ấn tượng với hiệu quả và tính năng của phần mềm.Báo cáo chi tiết và dịch vụ hỗ trợ đều tuyệt vời.',
		description:
			'Lê Minh Tâm, Dược sĩ tại Nhà thuốc Tâm Đức',
	},
	{
		icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR31y7YoGK9E0fGioIaj3EulWq2yrwc5pVVtA&s',
		title: 'Phần mềm dễ sử dụng và tính năng tra cứu thuốc rất hữu ích.Dịch vụ hỗ trợ nhanh chóng và tận tình.',
		description:
			'Trần Văn Hùng, Quản lý chuỗi nhà thuốc Hưng Thịnh',
	},
	{
		icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsCfNSu6Myi5aRDnk0J5JeBjtGlBbDFAD-_w&s',
		title: 'Phần mềm hoạt động ổn định và dễ tùy chỉnh theo nhu cầu.Dịch vụ hỗ trợ khách hàng rất chuyên nghiệp',
		description:
			'Phạm Thị Mai, Chủ nhà thuốc Mai Hương',
	},
	{
		icon: 'https://cosp.com.vn/uploaded/thu/nha-thuoc/thiet-ke-nha-thuoc-son-phuong-1.jpg',
		title: 'Chúng tôi đánh giá cao tính năng kết nối CSDL dược quốc gia.Phần mềm giúp việc quản lý bán thuốc trở nên dễ dàng và hiệu quả hơn.',
		description:
			'Hoàng Văn Sơn, Quản lý nhà thuốc Sơn Phương',
	},
	{
		icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAABfM0njfqfHAgfTDBTpFEd7dQQAXt1iCqkgT_-kmHcx7byetllJRThPffv8jjQuTvM&usqp=CAU',
		title: 'Phần mềm rất trực quan và dễ sử dụng.Thư viện thuốc phong phú và hỗ trợ lâu dài là những điểm mạnh nổi bật',
		description:
			'Nguyễn Thị Thu, Dược sĩ tại Nhà thuốc Thu Hương',
	},
];
export default function BodyFive() {
	return (
		<Box maw="100%"  h="auto"  mt="-26px" bg="#f6f6f6">
			<FeaturesGrid source="bodyfive"></FeaturesGrid>
		</Box>
	);
}