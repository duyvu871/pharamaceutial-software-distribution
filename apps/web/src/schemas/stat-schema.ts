export type Stat = Record<'day'|'week'|'month', StatItem[]>
export type StatItem = {
	title: string;
	value: number,
	diff?: number;
	field: string;
}