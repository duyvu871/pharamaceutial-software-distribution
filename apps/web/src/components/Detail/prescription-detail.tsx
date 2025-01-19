import {
	Box,
	Grid,
	Group,
	Paper,
	Stack,
	Title,
	Text,
	Divider,
	Flex,
	Table,
} from "@mantine/core";
import dayjs from "dayjs";
import { InvoiceType, PrescriptionSchema } from "@schema/invoice-schema.ts";
import { DoctorSchema } from "@schema/doctor-schema.ts";
import { InvoiceResponse } from '@api/invoice.ts';

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY");
};

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(amount);
};

type InfoItemProps = {
	label: string;
	value: React.ReactNode;
};

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
	<Group justify="space-between">
		<Text fw={500}>{label}:</Text>
		<Text>{value}</Text>
	</Group>
);

export default function PrescriptionInvoiceDisplay({
																										 data,
																									 }: {
	data: PrescriptionSchema & { invoices: InvoiceResponse; doctor: DoctorSchema };
}) {
	const { invoices, doctor } = data;

	return (
		<Box p="md" pt={0}>
			<Paper p="md" pt={0}>
				<Group wrap={"nowrap"} gap="xl" align={"start"}>
					<Stack>
						<Paper withBorder p="md">
							<Title order={3} mb="md">
								Thông tin bác sĩ
							</Title>
							<Grid>
								<Grid.Col span={6}>
									<Stack gap="xs">
										<InfoItem label="Tên bác sĩ" value={doctor.ten_bac_si} />
										<InfoItem label="Mã bác sĩ" value={doctor.doctor_id} />
										<InfoItem label="Chuyên khoa" value={doctor.chuyen_khoa} />
										<InfoItem label="Trình độ" value={doctor.trinh_do} />
									</Stack>
								</Grid.Col>
								<Grid.Col span={6}>
									<Stack gap="xs">
										<InfoItem label="Nơi công tác" value={doctor.noi_cong_tac} />
										<InfoItem label="Số điện thoại" value={doctor.sdt} />
										<InfoItem label="Email" value={doctor.email} />
										<InfoItem
											label="Trạng thái"
											value={doctor.is_active ? "Hoạt động" : "Không hoạt động"}
										/>
									</Stack>
								</Grid.Col>
							</Grid>
						</Paper>

						<Paper withBorder p="md">
							<Title order={3} mb="md">
								Chi tiết đơn hàng
							</Title>
							<Table highlightOnHover>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Sản phẩm</Table.Th>
										<Table.Th>Số lượng</Table.Th>
										<Table.Th>Đơn giá</Table.Th>
										<Table.Th>Thành tiền</Table.Th>
										<Table.Th>Ghi chú</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{invoices.items.map((item) => (
										<Table.Tr key={item.id}>
											<Table.Td>
												<Text fw={500}>{item.productName}</Text>
											</Table.Td>
											<Table.Td>
												{item.quantity} {item.unit}
											</Table.Td>
											<Table.Td>
												{formatCurrency(item.price)}
											</Table.Td>
											<Table.Td>
												{formatCurrency(item.total)}
											</Table.Td>
											<Table.Td>
												{item.note && <Text size="sm" color="dimmed">{item.note}</Text>}
											</Table.Td>
										</Table.Tr>
									))}
								</Table.Tbody>
							</Table>
						</Paper>
					</Stack>

					<Grid columns={6}>
						<Grid.Col span={6}>
							<Paper withBorder p="md">
								<Title order={3} mb="md">
									Thông tin đơn thuốc
								</Title>
								<Stack gap="xs">
									<InfoItem
										label="Mã đơn thuốc"
										value={data.prescription_id || "Không có"}
									/>
									<InfoItem label="Ngày kê" value={formatDate(data.ngay_ke)} />
									<InfoItem label="Bệnh nhân" value={data.benh_nhan} />
									<InfoItem label="Năm sinh" value={data.nam_sinh} />
									<InfoItem
										label="Giới tính"
										value={data.gioi_tinh === 0 ? "Nam" : "Nữ"}
									/>
									<InfoItem label="Địa chỉ" value={data.dia_chi} />
									<InfoItem
										label="Người giám hộ"
										value={data.nguoi_giam_ho || "Không có"}
									/>
									<InfoItem label="Điện thoại" value={data.dien_thoai} />
								</Stack>
							</Paper>
						</Grid.Col>

						<Grid.Col span={6}>
							<Paper withBorder p="md">
								<Title order={3} mb="md">
									Thông tin hóa đơn
								</Title>
								<Stack gap="xs">
									<InfoItem label="Mã hóa đơn" value={invoices.invoice_id} />
									<InfoItem
										label="Ngày bán"
										value={formatDate(invoices.saleDate.toString())}
									/>
									<InfoItem label="Khách hàng" value={invoices.customerName} />
									<InfoItem
										label="Tổng tiền"
										value={formatCurrency(invoices.totalPrice)}
									/>
									<InfoItem
										label="Giảm giá"
										value={formatCurrency(invoices.discount)}
									/>
									<InfoItem
										label="Số tiền phải trả"
										value={formatCurrency(invoices.amountDue)}
									/>
									<InfoItem
										label="Đã thanh toán"
										value={formatCurrency(invoices.amountPaid)}
									/>
									<InfoItem
										label="Còn nợ"
										value={formatCurrency(Math.abs(invoices.debit))}
									/>
								</Stack>
							</Paper>
						</Grid.Col>
					</Grid>
				</Group>
			</Paper>
		</Box>
	);
}