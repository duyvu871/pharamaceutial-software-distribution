import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TableRender } from '@type/components/table.type.ts';
import { CenterBox } from '@component/CenterBox';
import { Group, LoadingOverlay } from '@mantine/core';
import TablePagination from '@component/EnterpriseResourcePlanningTableLayout/table-pagination.tsx';
import TableRecordEditor from '@component/EnterpriseResourcePlanningTableLayout/table-record-editor.tsx';
import TableHeader from '@component/EnterpriseResourcePlanningTableLayout/table-header.tsx';

type EnterpriseResourcePlanningTableProps<item extends Record<string, any>> = {
	name: string;
	total?: number;
	data: TableRender<item>;
	keyName: keyof item;
	render: item[];
	filter: React.ReactNode[]
	toolBox?: React.ReactNode
	detail?: (detail: item) => React.ReactNode;
	classNames?: {
		table?: string; // Classname của bảng
		tbody?: string; // Classname của tbody
		thead?: string; // Classname của thead
		trHead?: string; // Classname của hàng trong thead
		trBody?: string; // Classname của hàng trong tbody
		th?: string; // Classname của cột trong thead
		td?: string; // Classname của ô trong tbody
	}
	customPaginate?: React.ReactNode;
	customFilter?: React.ReactNode;

	getItem?: (page: number, limit: number) => void

	openDetail?: string | null;

	visibleMainOverlay?: boolean;
}

function EnterpriseResourcePlanningTable<item extends Record<string, any>>(props: EnterpriseResourcePlanningTableProps<item>) {
	const [render, setRender] = useState<item[]>(props.render || [])
	const [total, setTotal] = useState<number>(props.total || 0);
	const [perPage, setPerPage] = useState<number>(10);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		if (page && perPage) {
			props.getItem && props.getItem(page, perPage)
		}
	}, [page, perPage]);

	useEffect(() => {
		props.total && setTotal(props.total)
	}, [props.total]);

	useEffect(() => {
		props.render && setRender(props.render)
	}, [props.render]);

	return (
		<CenterBox
			className={'flex-1 bg-zinc-100/50 h-full overflow-hidden'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full relative',
			}}
		>
			<LoadingOverlay visible={props.visibleMainOverlay} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
			<Group align={'start'} className="h-full overflow-hidden !flex-nowrap" gap={0}>
				<div className="flex-1 p-4 h-full flex flex-col">
					{/*Header*/}
					{props.customFilter
						||
						<TableHeader
							total={total}
							name={props.name}
							filter={props.filter}
							toolBox={props.toolBox}
						/>
					}
					{/*Table*/}
					<TableRecordEditor<item>
						keyName={props.keyName}
						columns={props.data}
						rows={render}
						detail={props.detail}
						classNames={props.classNames}
						openDetail={props.openDetail}
						page={page}
						total={total}
						perPage={perPage}
					/>
					{/*Pagination*/}
					{props.customPaginate
						||
						<TablePagination
							pageSize={props.render.length}
							total={total}
							activePage={page}
							setActivePage={setPage}
							itemsPerPage={perPage}
							setItemsPerPage={setPerPage}
						/>
					}
				</div>
			</Group>
		</CenterBox>
	);
}

export default EnterpriseResourcePlanningTable;