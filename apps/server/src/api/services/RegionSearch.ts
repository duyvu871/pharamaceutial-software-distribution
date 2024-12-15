import { Document, Worker } from 'flexsearch';
import { Huyen, Tinh, Xa } from 'types/search-region';
import path from 'node:path';
import { convertCsvToArray } from 'utils/csv';
import appLogger from 'utils/logger';

export type DocumentRegionSearch<
	Doc extends Huyen|Tinh|Xa,
> = Document<Doc, (keyof (Huyen|Tinh|Xa))[]> & {
	store?: Record<string, (Doc extends Tinh ? Tinh : Doc extends Huyen ? Huyen : Xa)>;
	get?: (id: string) => Doc|null;
}

const DanhMucHuyen = path.join(__dirname, "../assets/DanhMucHuyen.csv");
const DanhMucTinh = path.join(__dirname, "../assets/DanhMucTinh.csv");
const DanhMucXa = path.join(__dirname, "../assets/DanhMucXa.csv");

export class RegionSearch {
	public static instance: {
		Tinh: DocumentRegionSearch<Tinh>,
		Huyen: DocumentRegionSearch<Huyen>
		Xa: DocumentRegionSearch<Xa>
	}
	public static init() {
		this.instance = {
			Tinh: new Document<Tinh, (keyof Tinh)[]>({
				tokenize: 'forward',
				cache: true,
				document: {
					id: 'TinhId',
					store: ['TenTinh', 'TinhId'],
					index: ['TenTinh'],
				}
			}),
			Huyen: new Document({
				tokenize: 'forward',
				cache: true,
				document: {
					id: 'HuyenId',
					store: ['TenHuyen', 'HuyenId', 'TinhId'],
					index: ['TenHuyen'],
				}
			}),
			Xa: new Document({
				tokenize: 'forward',
				cache: true,
				document: {
					id: 'TenXa',
					store: ['TenXa', 'HuyenId'],
					index: ['TenXa'],
				}
			})}
	}

	public static getSearchIndex() {
		if (!this.instance) {
			this.init();
		}
		return this.instance;
	}

	public static async createIndexing() {
		const search = this.getSearchIndex();
		const tinhData = await convertCsvToArray<Tinh>(DanhMucTinh);
		const huyenData = await convertCsvToArray<Huyen>(DanhMucHuyen);
		const xaData = await convertCsvToArray<Xa>(DanhMucXa);

		tinhData.forEach(tinh => search.Tinh.add(tinh));
		appLogger.info('Tinh data added to search index');
		huyenData.forEach(huyen => search.Huyen.add(huyen));
		appLogger.info('Huyen data added to search index');
		xaData.forEach(xa => search.Xa.add(xa));
		appLogger.info('Xa data added to search index');
	}

	public static async search(search: string, type: 'Tinh'|'Huyen'|'Xa') {
		const searchIndexInstance = this.getSearchIndex()[type];
		return searchIndexInstance.search(search);
	}

	public static getStore<T extends 'Tinh' | 'Huyen' | 'Xa'>(group: T)
	{
		const searchIndexInstance = this.getSearchIndex()[group];
		return searchIndexInstance.store as Record<string, (T extends 'Tinh' ? Tinh : T extends 'Huyen' ? Huyen : Xa)>;
	}

	public static parseStoreAsArray<T extends 'Tinh' | 'Huyen' | 'Xa'>(group: T):
		(T extends 'Tinh' ? Tinh : T extends 'Huyen' ? Huyen : Xa)[]
	{
		const searchIndexInstance = this.getSearchIndex()[group];
		const toArray = Object.values(searchIndexInstance.store || {}) as (Tinh|Huyen|Xa)[];
		return toArray.map(item => JSON.stringify(item)).map(item => JSON.parse(item));
	}

	public static getDetail<T extends 'Tinh' | 'Huyen' | 'Xa'>(id: string, type: T) {
		const searchIndexInstance = this.getSearchIndex()[type];
		return (searchIndexInstance.get
			? searchIndexInstance?.get(id) || null
			: searchIndexInstance.store?.[id] || null) as (T extends 'Tinh' ? Tinh : T extends 'Huyen' ? Huyen : Xa) | null;
	}
}