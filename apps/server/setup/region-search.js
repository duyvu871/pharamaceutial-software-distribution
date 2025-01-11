const fs = require('fs');
const XLSX = require('xlsx');
const fastCSV = require('fast-csv');
const path = require('node:path');
const {Document} = require('flexsearch');

const DanhMucHuyen = path.join(__dirname, "../assets/DanhMucHuyen.csv");
const DanhMucTinh = path.join(__dirname, "../assets/DanhMucTinh.csv");
const DanhMucXa = path.join(__dirname, "../assets/DanhMucXa.csv");

const search = {
	Tinh: new Document({
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
	})
}

const convertCsvToArray = async (filePath) => {
	const stream = fs.createReadStream(filePath);
	try {
		const start_index = performance.now();
		const csvData = await new Promise((resolve, reject) => {
			const data = [];
			fastCSV.parseStream(stream, { headers: true })
				.on('data', async (row) => {
					data.push(row);
				})
				.on('end', () => resolve(data))
				.on('error', reject);
		});

		// console.log('csvData:', csvData);
		console.log('csvData.length:', csvData.length);

		const end_index = performance.now();
		console.log('indexing:', end_index - start_index, 'ms');
		return csvData;
	} catch (error) {
		console.error('Error reading CSV file:', error);
	}
}
const regionSearch = async (tinh, huyen, xa) => {
	const tinhData = await convertCsvToArray(DanhMucTinh);
	const huyenData = await convertCsvToArray(DanhMucHuyen);
	const xaData = await convertCsvToArray(DanhMucXa);

	// console.log('tinhData:', tinhData);
	// console.log('huyenData:', huyenData);
	// console.log('xaData:', xaData);

	tinhData.forEach(tinh => {
		search.Tinh.add(tinh);
	});
	huyenData.forEach(huyen => {
		search.Huyen.add(huyen);
	});
	xaData.forEach(xa => {
		search.Xa.add(xa);
	});

	// const resultTinh = Object.values(search.Tinh.store).map(JSON.stringify).map(JSON.parse);
	// console.log('resultTinh:', resultTinh);
	console.log('search.Tinh.get(1):', search.Huyen.search(''));
	console.log('search.Huyen.get(1):', search.Huyen.store['22503']);
	// console.log('result tinh detail:', resultTinh.map(tinh => tinh.result.map(id => search.Tinh.get(id).TenTinh)));
}

regionSearch();