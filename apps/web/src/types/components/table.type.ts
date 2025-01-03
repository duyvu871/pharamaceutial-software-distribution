export type TableRender<item> = {
	title: string;
	render: (data: item) => React.ReactNode;
}[]