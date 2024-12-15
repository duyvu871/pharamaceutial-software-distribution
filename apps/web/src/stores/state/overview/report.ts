import { atom } from "jotai";
import { RevenueChartListResponse, TopSaleProduct } from '@schema/chart-schema.ts';
import { Stat } from '@schema/stat-schema.ts';

export const revenueReportAtom = atom<RevenueChartListResponse | null>(null);
export const topSaleReportAtom = atom<TopSaleProduct[]>([]);
export const statAtom = atom<Stat | null>(null);
