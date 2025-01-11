import { parentPort } from 'worker_threads';
import { MongoClient } from 'mongodb';
import * as path from 'path';
import * as fs from 'fs';
import * as fastCSV from 'fast-csv';
import { performance } from 'perf_hooks';
import { SearchProductType } from 'types/search-product';

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const client = new MongoClient(uri);
const dbName = 'searchDB';
const collectionName = 'products';

const createIndex = async (csvPath: string): Promise<void> => {
	const stream = fs.createReadStream(csvPath);
	try {
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		const start_index = performance.now();
		await new Promise((resolve, reject) => {
			const streamCSV = fastCSV.parseStream(stream, { headers: true })
			streamCSV.on('data', async (row: any) => {
					const modelize: SearchProductType = {
						drug_code: row['Mã thuốc'],
						drug_name: row['Tên thuốc'],
						registration_number: row['SO_DANG_KY'],
						active_ingredient: row['Hoạt chất - hàm lượng'],
						packaging: row['Quy cách đóng gói'],
						manufacturer: row['Hãng sản xuất'],
						country_of_origin: row['Nước sản xuất'],
						unit: row['Đơn vị tính'],
						declaration_facility: row['Cơ sở kê khai'],
						dosage_form: row['Dạng bào chế'],
						registration_country: row['Nước đăn ký'],
						registration_address: row['Địa chỉ đăng ký'],
						manufacturing_address: row['Địa chỉ sản xuất'],
						drug_type: row['Loại thuốc'],
						prescription_required: row['Thuốc kê đơn'],
						drug_identifier: row['Mã định danh thuốc'],
					};
					await collection.insertOne(modelize);
				})
			streamCSV.on('end', () => resolve('ok'))
			streamCSV.on('error', reject);
			streamCSV.end()
		});
		const end_index = performance.now();
		console.log('Indexing complete in', end_index - start_index, 'ms');
		parentPort?.postMessage({ status: 'indexing_complete', time: end_index - start_index });
		// await client.close();
	} catch (error) {
		parentPort?.postMessage({ status: 'error', error: (error as Error).message });
	} finally {
	}
};

const search = async (query: string, limit: number): Promise<void> => {
	try {
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		const results = await collection.find({ drug_name: new RegExp(query, 'i') }).limit(limit).toArray();
		parentPort?.postMessage({ status: 'search_complete', results });
	} catch (error) {
		parentPort?.postMessage({ status: 'error', error: (error as Error).message });
	} finally {
		// await client.close();
	}
};

const getDetail = async (id: string) => {
	try {
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		const detail = await collection.findOne({ drug_code: id });
		parentPort?.postMessage({ status: 'detail_complete', detail });
	} catch (error) {
		parentPort?.postMessage({ status: 'error', error: (error as Error).message });
	} finally {
		// await client.close();
	}
};

parentPort?.on('message', async (message: any) => {
	if (message.type === 'createIndex') {
		await createIndex(message.csvPath);
	} else if (message.type === 'search') {
		await search(message.query, message.limit);
	} else if (message.type === 'getDetail') {
		await getDetail(message.id);
	}
});