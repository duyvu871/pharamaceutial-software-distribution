import { Pagination, Select } from '@mantine/core';
import React from 'react';

type TablePaginationProps = {
	pageSize?: number;
	total?: number;
	activePage?: number;
	itemsPerPage?: number;
	setActivePage?: (page: number) => void;
	setItemsPerPage?: (limit: number) => void;
}

function TablePagination(props: TablePaginationProps) {
	const itemsPerPage = props.itemsPerPage || 10;
	const total = props.total || 0;

	return (
		<div className="flex justify-between items-center mt-4">
			<Pagination
				color={"var(--main-color)"}
				value={props?.activePage || 1}
				onChange={(value) => props.setActivePage && props.setActivePage(value)}
				total={Math.ceil(total/itemsPerPage) || 0}
				siblings={3}
				boundaries={2}
				withEdges
			/>
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-600">Hiển thị:</span>
				<Select
					value={String(props?.itemsPerPage || 10)}
					onChange={(value) => props.setItemsPerPage && props.setItemsPerPage(Number(value) || 20)}
					data={['10', '20', '30', '50'].map(value => ({ value, label: value }))}
					styles={{
						input: {
							width: '70px',
						},
					}}
				/>
				<span className="text-sm text-gray-600">{props.pageSize || 0} / {props.total || 0}</span>
			</div>
		</div>
	);
}

export default TablePagination;