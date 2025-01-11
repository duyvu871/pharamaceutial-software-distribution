import { Document, Worker } from 'flexsearch';
import * as fastCSV from 'fast-csv';
import * as process from 'node:process';
import * as path from 'node:path';
import { SearchProductType } from 'types/search-product';
import fs from 'fs';
import { toLowerCaseNonAccentVietnamese } from 'utils/non-acent-vietnam.ts';
// import pLimit from 'p-limit';

export type DocumentProductSearch = Document<SearchProductType, (keyof SearchProductType)[]> & {
	store?: Record<string, SearchProductType>;
	get?: (id: string) => SearchProductType|null;
}

export default class ProductSearch {
	public static searchIndex: DocumentProductSearch|null = null;
	public static productSearchPath = path.join(process.cwd(), "storage/danh_muc_thuoc/default/danh_muc_thuoc_bo_sung.csv");

	public static loadSearchIndex(): DocumentProductSearch {
		if (!this.searchIndex) {
			this.searchIndex = new Document<SearchProductType, (keyof SearchProductType)[]>({
				tokenize: 'forward',
				cache: false,
				// async: true,
				optimize: true,
				language: 'vi',
				resolution: 9, // 9 is the default value
				worker: true, // true is the default value
				document: {
					id: 'drug_code',
					store: [
						'drug_name',
						'active_ingredient',
						'manufacturer',
						'country_of_origin',
						'dosage_form',
						'drug_type',
						'prescription_required',
						'drug_identifier',
						'packaging',
						'unit',
						'declaration_facility',
						'registration_number',
						'registration_country',
						'registration_address',
						'drug_code',
						'manufacturing_address',
					],
					index: [
						'drug_name',
						// 'active_ingredient',
						// 'manufacturer',
						// 'country_of_origin',
						// 'dosage_form',
						// 'drug_type'
					],
				}
			});
		}
		return this.searchIndex;
	}

	public static async createIndex(csvPath?: string) {
		const stream = fs.createReadStream(csvPath || this.productSearchPath);
		const searchIndexInstance = this.loadSearchIndex();
		// const limit = pLimit(1);
		try {
			const start_index = performance.now();
			const csvData = await new Promise<'ok'>((resolve, reject) => {
				const batchSizes = 100;
				let batch: SearchProductType[] = [];
				let unitStore = {};
				// console.log('fastCSV:', fastCSV);
				fastCSV.parseStream(stream, { headers: true })
					.on('data', async (row) => {
						const modelize: SearchProductType = {
							drug_code: row['Mã thuốc'],
							drug_name: row['Tên thuốc'],
							registration_number: row['SO_DANG_KY'],
							active_ingredient: row['Hoạt chất - hàm lượng'],
							packaging: row['Quy cách đóng gói'],
							manufacturer: row['Hãng sản xuất'],
							country_of_origin: row['Nước sản xuất'],
							unit: toLowerCaseNonAccentVietnamese(row['Đơn vị tính']),
							declaration_facility: row['Cơ sở kê khai'],
							dosage_form: row['Dạng bào chế'],
							registration_country: row['Nước đăn ký'],
							registration_address: row['Địa chỉ đăng ký'],
							manufacturing_address: row['Địa chỉ sản xuất'],
							drug_type: row['Loại thuốc'],
							prescription_required: Boolean(row['Thuốc kê đơn']),  // You might want to convert this to a boolean later
							drug_identifier: row['Mã định danh thuốc'],
						};

						// trim all fields
						Object.keys(modelize).forEach((key) => {
							if (typeof modelize[key] === 'string') {
								modelize[key] = modelize[key].trim();
							}
						});

						unitStore[modelize.unit] = (unitStore[modelize.unit] || 0) + 1;

						batch.push(modelize);
						// searchIndexInstance.add(modelize);
						if (batch.length >= batchSizes) {
							batch.forEach((item) => {
								// searchIndexInstance.remove(item.drug_name);
								searchIndexInstance.add(`${item.drug_name}-${item.drug_code}`, item);
							});
							batch = [];
						}
						// data.push(modelize);
					})
					.on('end', () => {
						if (batch.length > 0) {
							batch.forEach((item) => {
								// searchIndexInstance.remove(item.drug_name);
								searchIndexInstance.add(`${item.drug_name}-${item.drug_code}`, item);
							}); // Add the last batch
						}
						console.log('Processing complete');
						console.table(unitStore);

						stream.close();
						resolve('ok')
					})
					.on('error', (e) => {
						stream.destroy();
					});
			});

			// console.log('csvData:', csvData);
			// console.log('csvData.length:', csvData.length);

			const end_index = performance.now();
			console.log('indexing:', end_index - start_index, 'ms');
		} catch (error) {
			console.error('Error reading CSV file:', error);
		}
	}

	public static clearIndex() {
		if (this.searchIndex) {
			this.searchIndex.store = {};
			this.searchIndex = null;
		}
	}

	public static async search(query: string, limit?: number) {
		const searchIndexInstance = this.loadSearchIndex();
		return await searchIndexInstance.searchAsync(query, limit);
	}

	public static getDetail(id: string) {
		const searchIndexInstance = this.loadSearchIndex();
		return searchIndexInstance.get
			? searchIndexInstance?.get(id) || null
			: searchIndexInstance.store?.[id] || null;
	}

}

