const fs = require('fs');
const XLSX = require('xlsx');
const fastCSV = require('fast-csv');
const {Document} = require('flexsearch');
const path = require('node:path');

let searchIndex = new Document({
	tokenize: 'forward',
	cache: true,
	document: {
		id: 'drug_code',
		store: [
			'drug_name',
			'active_ingredient',
			'manufacturer',
			'country_of_origin',
			'dosage_form',
			'drug_type'
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
});;

const csvFilePath = path.join(__dirname, "../src/migrations/danh_muc_thuoc_bo_sung.csv");

console.log('data path:', csvFilePath);

const convertXlsxToArray = (filePath) => {
	try {
		// Read the file as binary
		const fileData = fs.readFileSync(filePath);

		// Parse the workbook
		const workbook = XLSX.read(fileData, { type: 'buffer' });

		// Get the first sheet
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];

		// Convert sheet to JSON (array of objects)
		const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

		return jsonData;
	} catch (error) {
		console.error('Error reading XLSX file:', error);
		return [];
	}
};

// const xlsxData = convertXlsxToArray(csvFilePath);
// const start_convert_xlsx = performance.now();
// console.log('xlsxData:', xlsxData);
// console.log('xlsxData.length:', xlsxData.length);
// const end_convert_xlsx = performance.now();
// console.log('convert xlsx to array:', end_convert_xlsx - start_convert_xlsx, 'ms');



async function createIndex() {
	const stream = fs.createReadStream(csvFilePath);

	try {
		const start_index = performance.now();
		const csvData = await new Promise((resolve, reject) => {
			const data = [];
			fastCSV.parseStream(stream, { headers: true })
				.on('data', async (row) => {
					const modelize = {
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
						prescription_required: row['Thuốc kê đơn'],  // You might want to convert this to a boolean later
						drug_identifier: row['Mã định danh thuốc'],
					};
					searchIndex.add(modelize);
					data.push(modelize);
				})
				.on('end', () => resolve(data))
				.on('error', reject);
		});

		// console.log('csvData:', csvData);
		console.log('csvData.length:', csvData.length);

		const end_index = performance.now();
		console.log('indexing:', end_index - start_index, 'ms');
	} catch (error) {
		console.error('Error reading CSV file:', error);
	}
}

async function exportIndex(filePath = 'flexsearch_index.json') {
	try {
		const exportedData = await searchIndex.export();  // Use exportAsync for asynchronous export

		fs.writeFileSync(filePath, JSON.stringify(exportedData, null, 2)); // Save to a file (e.g., index.json)
		console.log(`FlexSearch index exported to ${filePath}`);

		// Example of storing the exported index in a variable instead of a file:
		// const indexData = JSON.stringify(exportedData);
		// You can then use 'indexData' to store it elsewhere (e.g., a database)

		// return exportedData // If you want to directly return the exported data
	} catch (error) {
		console.error('Error exporting index:', error);
		// Handle the error appropriately (e.g., send an error response)
	}
}

const search = async (query) => {
	const results = await searchIndex.search(query);
	console.log('results key:', searchIndex.store['DQG00058625']);
	console.log('results:', results);
}

createIndex().then( async () => {
	await search('Bình');
	// await exportIndex();
});




