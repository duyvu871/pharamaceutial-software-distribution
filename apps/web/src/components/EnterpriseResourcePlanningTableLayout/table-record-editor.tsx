import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { TableRender } from '@type/components/table.type.ts';
import { Box, Table } from '@mantine/core';
import { useUID } from '@hook/common/useUID.ts';
import { cn } from '@lib/tailwind-merge.ts';
import { ProductRender } from '@schema/product-schema.ts';

type TableRecordEditorProps<ItemType extends Record<string, any>> = {
	keyName: keyof ItemType; // Key của bảng, dùng để tạo key cho các phần tử
	columns: TableRender<ItemType>; // Danh sách cột với tiêu đề và cách render nội dung
	rows: ItemType[]; // Dữ liệu hàng sẽ được hiển thị trong bảng
	detail?: (item: ItemType) => React.ReactNode; // Hàm render chi tiết của mỗi hàng
	openDetail?: string | null; // Mở chi tiết mặc định
	classNames?: {
		table?: string; // Classname của bảng
		tbody?: string; // Classname của tbody
		thead?: string; // Classname của thead
		trHead?: string; // Classname của hàng trong thead
		trBody?: string; // Classname của hàng trong tbody
		th?: string; // Classname của cột trong thead
		td?: string; // Classname của ô trong tbody
	}

	page?: number;
	perPage?: number;
	total?: number;
};

/**
 * TableRecordEditor
 *
 * Component này hiển thị một bảng dữ liệu có khả năng render động dựa trên các props `columns` (danh sách cột)
 * và `rows` (danh sách dữ liệu). Nó tích hợp với Mantine Table để tạo giao diện chuyên nghiệp.
 *
 * @template ItemType - Kiểu dữ liệu của từng hàng trong bảng
 * @param {TableRecordEditorProps<ItemType>} props - Props bao gồm thông tin về cột và hàng
 * @returns {React.ReactNode | null} - Giao diện bảng hoặc null nếu props không hợp lệ
 */
function TableRecordEditor<ItemType extends Record<string, any>>(props: TableRecordEditorProps<ItemType>): React.ReactNode | null {
	// Kiểm tra xem props `columns` và `rows` có hợp lệ không. Nếu không, log lỗi và trả về null.
	if (!Array.isArray(props.columns) || !Array.isArray(props.rows)) {
		console.error("Invalid props: `columns` and `rows` must be arrays.");
		return null;
	}

	if (props.keyName === undefined) {
		console.error("Invalid props: `keyName` is required.");
		return null;
	}

	// Tạo một ID duy nhất cho bảng, giúp tạo key ổn định cho các phần tử.
	const { generateUID } = useUID();
	const tableId = generateUID();

	const [productDetailActive, setProductDetailActive] = useState<string | null>(null)

	const toggleDetail = (item: ItemType) =>
		setProductDetailActive(
			productDetailActive === item[props.keyName] ? null : item[props.keyName]
		)

	console.log('keyName', props.keyName);
	console.log('items', props.rows);
	console.log('openDetail', props.openDetail);

	const page = props.page || 1;
	const perPage = props.perPage || 10;
	const total = props.total || 0;

	console.log('page', page);

	return (
		<div className="overflow-y-auto bg-white rounded-md shadow relative">
			{/* Mantine Table với giao diện mượt mà, hỗ trợ highlight khi hover */}
			<Table striped highlightOnHover className={cn("!rounded-md", props.classNames?.table)}>
				{/* Header của bảng */}
				<Table.Thead h="fit-content" className={cn("", props.classNames?.thead)}>
					<Table.Tr className={cn("", props.classNames?.trHead)}>
						{/* Cột đánh số thứ tự */}
						<Table.Th className={
							cn("bg-white sticky top-0 z-[100] whitespace-nowrap", props.classNames?.th)}
						>#</Table.Th>

						{/* Render các cột dựa trên props.columns */}
						{props.columns.map((column, colIndex) => (
							<Table.Th
								key={`${tableId}-th-${column.title}`}
								className={cn("bg-white sticky top-0 z-[100] whitespace-nowrap", props.classNames?.th)}
							>
								{column.title}
							</Table.Th>
						))}
					</Table.Tr>
				</Table.Thead>

				{/* Body của bảng */}
				<Table.Tbody className={cn("", props.classNames?.tbody)}>
					{props.rows.length === 0 ? (
						// Trường hợp không có dữ liệu
						<Table.Tr className={cn("", props.classNames?.trBody)}>
							<Table.Td colSpan={props.columns.length + 1} className="text-center py-4">
								Không có dữ liệu
							</Table.Td>
						</Table.Tr>
					) : (
						// Render các hàng dữ liệu
						props.rows.map((row, rowIndex) => (
							<Fragment key={`${tableId}-tr-${rowIndex}`}>
								<Table.Tr
									h={40}
									className={cn("", props.classNames?.trBody)}
									onClick={() =>{
										// if (props.openDetail === null) return;
										// (props.detail) && toggleDetail(row)
									}}
								>
									{/* Hiển thị số thứ tự */}
									<Table.Td>{(page - 1)*perPage + rowIndex + 1}</Table.Td>

									{/* Render từng ô dữ liệu dựa trên hàm render của mỗi cột */}
									{props.columns.map((column, colIndex) => (
										<Table.Td
											className={cn("", props.classNames?.td)}
											key={`${tableId}-td-${colIndex}`}
										>
											{column.render(row)}
										</Table.Td>
									))}
								</Table.Tr>
								{/* Thông tin chi tiết nếu có */}
								{props.detail && (
									<Table.Tr className={' overflow-hidden'}>
										<Table.Td p={0} colSpan={10}>
											<Box
												h={(props.openDetail) === row[props.keyName] ? '' : 0}
												className={'transition-all overflow-hidden'}
											>
												{props.detail(row)}
											</Box>
										</Table.Td>
									</Table.Tr>
								)}
							</Fragment>
						))
					)}
				</Table.Tbody>
			</Table>
		</div>
	);
}

export default TableRecordEditor;
