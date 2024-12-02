import { Request, Response, NextFunction } from 'express';
import AsyncMiddleware from 'server/utils/asyncHandler';
import path from 'path';
import fs from 'fs';
import XLSX from 'xlsx';
import csv from 'fast-csv'; 
// import { client } from './dbClient'; // chỗ này chưa tìm thấy phần kết nối với postgra đâu cả nên để tạm 


export class CsvPostgraValidation {
  public static CsvInput = AsyncMiddleware.asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const filePath = req.file.path;
      console.log(`File uploaded: ${filePath}`);
      
      // Kiểm tra file có phải là .xlsx không
      if (path.extname(req.file.originalname) === '.xlsx') {
        try {
          // Đọc file Excel và chuyển đổi sang CSV
          const workbook = XLSX.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
          
          // Tạo file CSV từ dữ liệu Excel
          const csvFilePath = filePath.replace('.xlsx', '.csv');
          fs.writeFile(csvFilePath, csvData, (err) => {
            if (err instanceof Error) {
              console.error(`Error during writing file: ${err.message}`);
              // Handle error appropriately here
            } else {
              console.log(`CSV file has been created: ${csvFilePath}`);
            }
          });
          

          // Xóa file Excel sau khi chuyển đổi thành công
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting Excel file:', unlinkErr);
            } else {
              console.log(`Deleted Excel file: ${filePath}`);
            }
          });

          // Tiến hành upload CSV lên cơ sở dữ liệu
          this.uploadcsv(csvFilePath);

          res.send(`File successfully converted to: ${csvFilePath}`);
        } catch (error) {
            console.error(`Error during import CSV:  ${error.errorMessage || error.message}`);
            throw error; 
        }
      }

      // Nếu là file CSV, trực tiếp upload vào cơ sở dữ liệu
      if (path.extname(req.file.originalname) === '.csv') {
        this.uploadcsv(filePath);
        res.send('CSV file uploaded successfully.');
      }
    }
  );

  private static uploadcsv(path: string) {
    const stream = fs.createReadStream(path);
    const csvDatColl: any[] = [];
    const fileStream = csv.parse();

    fileStream.on('data', (csvrow) => {
      csvDatColl.push(csvrow);
    });

    fileStream.on('end', () => {
      csvDatColl.shift(); // Remove headers if needed
    //   client
    //     .connect()
    //     .then(() => {
    //       const query = `INSERT INTO "medium_test" ("Tên khách hàng", "Tên công ty", "Chức vụ", "Số điện thoại", "Email") VALUES `;
    //       const valuePlaceholders = csvDatColl
    //         .map((_, index) => 
    //           `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`
    //         )
    //         .join(', ');

    //       const values = csvDatColl.flat();

    //       client.query(query + valuePlaceholders, values, (err, result) => {
    //         if (err) {
    //           console.error('Error executing query', err);
    //         } else {
    //           console.log('Query result:', result.rows);
    //         }
    //       });
    //     })
    //     .catch((error:any) => {
    //       console.error(`Error connecting to PostgreSQL database:${error.errorMessage || error.message}`);
    //     });
    });

    stream.pipe(fileStream);
  }
}
