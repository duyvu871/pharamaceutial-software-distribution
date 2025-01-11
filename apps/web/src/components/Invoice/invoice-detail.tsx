import React from 'react';
import { Card, Group, Text, Table, Badge, Grid, Paper } from '@mantine/core';
import { InvoiceType } from '@schema/invoice-schema';
import { InvoiceResponse } from '@api/invoice.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'


interface InvoiceDetailProps {
	invoice: InvoiceResponse;
}

export default function InvoiceDetail({ invoice }: InvoiceDetailProps) {
	return (
		<Card shadow="sm" padding="lg">
			<Grid>
				<Grid.Col span={6}>
					<Text size="xl" fw={700} mb="md">Chi tiết hóa đơn</Text>
					<Group>
						<Text fw={500}>Mã hóa đơn:</Text>
						<Text>{invoice.id}</Text>
					</Group>
					<Group>
						<Text fw={500}>Ngày bán:</Text>
						<Text>{new Date(invoice.saleDate).toLocaleDateString('vi-VN')}</Text>
					</Group>
					<Group>
						<Text fw={500}>Giờ bán:</Text>
						<Text>{new Date(Number(invoice.saleTime)).toLocaleTimeString('vi-VN')}</Text>
					</Group>
					<Group>
						<Text fw={500}>Khách hàng:</Text>
						<Text>{invoice.customerName || 'Khách lẻ'}</Text>
					</Group>
					<Group>
						<Text fw={500}>Trạng thái:</Text>
						<Badge color={invoice.amountPaid >= invoice.totalPrice ? 'green' : 'yellow'}>
							{invoice.amountPaid >= invoice.totalPrice ? 'Đã thanh toán' : 'Chưa thanh toán'}
						</Badge>
					</Group>
				</Grid.Col>
				<Grid.Col span={6}>
					<Paper shadow="xs" p="md" withBorder>
						<Text fw={500} mb="xs">Tổng quan thanh toán</Text>
						<Group>
							<Text>Tổng tiền:</Text>
							<Text fw={500}>{invoice.totalPrice.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>Giảm giá:</Text>
							<Text fw={500}>{invoice.discount.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>Số tiền phải trả:</Text>
							<Text fw={500}>{invoice.amountDue.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>Đã thanh toán:</Text>
							<Text fw={500}>{invoice.amountPaid.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>Còn nợ:</Text>
							<Text fw={500} color="red">{Math.abs(invoice.debit).toLocaleString('vi-VN')} đ</Text>
						</Group>
					</Paper>
				</Grid.Col>
			</Grid>

			<Text size="lg" fw={500} mt="xl" mb="md">Danh sách sản phẩm</Text>
			<Table striped highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Tên sản phẩm</Table.Th>
						<Table.Th>Số lượng</Table.Th>
						<Table.Th>Đơn vị</Table.Th>
						<Table.Th>Đơn giá</Table.Th>
						<Table.Th>Thành tiền</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{invoice.items.map((item: InvoiceResponse['items'][number]) => (
						<Table.Tr key={item.id}>
							<Table.Td>{item.productName}</Table.Td>
							<Table.Td>{item.quantity}</Table.Td>
							<Table.Td>{item.unit}</Table.Td>
							<Table.Td>{item.price.toLocaleString('vi-VN')} đ</Table.Td>
							<Table.Td>{item.total.toLocaleString('vi-VN')} đ</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>

			{invoice.otherCharges && invoice.otherCharges.length > 0 && (
				<>
					<Text size="lg" fw={500} mt="xl" mb="md">Phí khác</Text>
					<Table striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Tên phí</Table.Th>
								<Table.Th>Giá trị</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{invoice.otherCharges.map((charge: InvoiceResponse['otherCharges'][number]) => (
								<Table.Tr key={charge.id}>
									<Table.Td>{charge.name}</Table.Td>
									<Table.Td>{charge.value.toLocaleString('vi-VN')} đ</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</>
			)}

			{invoice.notes && (
				<Paper shadow="xs" p="md" withBorder mt="xl">
					<Text fw={500} mb="xs">Ghi chú</Text>
					<Text>{invoice.notes}</Text>
				</Paper>
			)}

			<Group mt="xl">
				<Badge color={invoice.isPrescriptionSale ? 'blue' : 'gray'}>
					{invoice.isPrescriptionSale ? 'Đơn thuốc kê' : 'Không phải đơn thuốc kê'}
				</Badge>
				{/*<Badge color={invoice.autoPrintInvoice ? 'green' : 'gray'}>*/}
				{/*	{invoice.autoPrintInvoice ? 'Tự động in hóa đơn' : 'Không tự động in hóa đơn'}*/}
				{/*</Badge>*/}
				{/*<Badge color={invoice.printBatchNumber ? 'purple' : 'gray'}>*/}
				{/*	{invoice.printBatchNumber ? 'In số lô' : 'Không in số lô'}*/}
				{/*</Badge>*/}
			</Group>
		</Card>
	);
}

