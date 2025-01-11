import React from 'react';
import { Card, Group, Text, Table, Badge, Grid, Paper } from '@mantine/core';
import { InvoiceType } from '@schema/invoice-schema';
import { InvoiceResponse } from '@api/invoice.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'
import { ResponseImportProductList } from '@api/import.ts';


interface InvoiceImportDetailProps {
	invoice: ResponseImportProductList['data'][number];
}

export default function ImportInvoiceDetail({ invoice }: InvoiceImportDetailProps) {
	return (
		<Card shadow="sm" padding="lg">
			<Grid grow>
				<Grid.Col span={6}>
					<Text size="xl" fw={700} mb="md">Chi tiết hóa đơn</Text>
					<Group>
						<Text fw={500}>Mã hóa đơn:</Text>
						<Text>{invoice.invoice_no}</Text>
					</Group>
					<Group>
						<Text fw={500}>Ngày bán:</Text>
						<Text>{new Date(invoice.createdAt).toLocaleDateString('vi-VN')}</Text>
					</Group>
					<Group>
						<Text fw={500}>Nhà cung cấp:</Text>
						<Text>{invoice.provider?.companyName || "Không có"}</Text>
					</Group>
					<Group>
						<Text fw={500}>Trạng thái:</Text>
						<Badge color={invoice.amount_paid >= invoice.total_amount ? 'green' : 'yellow'}>
							{invoice.amount_paid >= invoice.total_amount ? 'Đã thanh toán' : 'Chưa thanh toán'}
						</Badge>
					</Group>
				</Grid.Col>
				<Grid.Col span={2}>
					<Paper shadow="xs" p="md" withBorder>
						<Text fw={500} mb="xs">Tổng quan thanh toán</Text>
						<Group>
							<Text>Tổng tiền:</Text>
							<Text fw={500}>{invoice.total_amount.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>VAT:</Text>
							<Text fw={500}>{invoice.vat.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>Số tiền phải trả:</Text>
							<Text fw={500}>{invoice.amount_due.toLocaleString('vi-VN')} đ</Text>
						</Group>
						<Group>
							<Text>Đã thanh toán:</Text>
							<Text fw={500}>{invoice.amount_paid.toLocaleString('vi-VN')} đ</Text>
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
					{invoice.import_invoice_product.map((item) => (
						<Table.Tr key={item.id}>
							<Table.Td>{item?.product?.product_name || ""}</Table.Td>
							<Table.Td>{item.quantity}</Table.Td>
							<Table.Td>{item.product?.base_unit || ""}</Table.Td>
							<Table.Td>{item.price.toLocaleString('vi-VN')} đ</Table.Td>
							<Table.Td>{item.total.toLocaleString('vi-VN')} đ</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>

			{invoice.notes && (
				<Paper shadow="xs" p="md" withBorder mt="xl">
					<Text fw={500} mb="xs">Ghi chú</Text>
					<Text>{invoice.notes}</Text>
				</Paper>
			)}

			<Group mt="xl">
				{/*<Badge color={invoice.isPrescriptionSale ? 'blue' : 'gray'}>*/}
				{/*	{invoice.isPrescriptionSale ? 'Đơn thuốc kê' : 'Không phải đơn thuốc kê'}*/}
				{/*</Badge>*/}
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

