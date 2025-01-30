import { Menu } from 'lucide-react';
import React, { Fragment } from 'react';

type TableHeaderProps = {
	toolBox?: React.ReactNode
	filter: React.ReactNode[]
	name?: string
	total?: number
}

function TableHeader(props: TableHeaderProps) {
	return (
		<div className="flex flex-col justify-center items-start mb-6">
			<div className={"w-full flex justify-between items-center"}>
				<div className={"flex flex-col gap-1"}>
					<div className="flex items-center gap-4">
						<h1 className="text-2xl font-medium"> {props.name || 'Danh sách'}</h1>
						<button className="lg:hidden">
							<Menu className="w-6 h-6" />
						</button>
					</div>
					<div>
						<span className="font-semibold text-sm text-gray-600">Số lượng bản ghi ({props.total || 0} kết quả)</span>
					</div>
				</div>
				<div className={"flex gap-2 items-center"}>
					{props.toolBox}
				</div>
			</div>
			<div className={"w-full h-[1px] bg-zinc-300"}/>
			<div className="flex flex-col gap-2 justify-start items-start mt-2">
				{props.filter.map((filter, index) => (
					<Fragment key={`filter-${index}`}>
						{filter}
					</Fragment>
				))}
			</div>
		</div>
	);
}

export default TableHeader;