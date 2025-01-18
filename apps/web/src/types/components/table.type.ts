export type TableRender<item> = {
	title: string;
	render: (data: item) => React.ReactNode;
}[]

export type ActionItemRender<item> = {
	label: (data: item) => React.ReactNode;
	icon?: (data: item) => React.ReactElement;
	action: (data: item) => void;
}