import fs from 'fs';
import * as fastCSV from 'fast-csv';

export const convertCsvToArray = async <DataLabel extends Record<string, any>>(filePath: string) => {
	try {
		const stream = fs.createReadStream(filePath);
		return await new Promise<DataLabel[]>((resolve, reject) => {
			const data: DataLabel[] = [];
			fastCSV.parseStream(stream, { headers: true })
				.on('data', async (row) => {
					data.push(row);
				})
				.on('end', () => resolve(data))
				.on('error', reject);
		});
	} catch (error) {
		console.error('Error reading CSV file:', error);
		return [];
	}
}