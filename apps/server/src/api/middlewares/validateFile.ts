import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'server/common/httpStatusCode';
import multer from 'multer';
import path from 'path';


// Nếu muốn kiểm tra thêm, bạn có thể thêm middleware khác
export const validateFile = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Kiểm tra nếu không có file
      if (!req.file) {
        return res.status(HttpStatusCode.BadRequest).json({
          message: 'File upload is required',
        });
      }
  
      // Thêm kiểm tra loại file (mime type) nếu cần
    
  
      next(); // File hợp lệ, tiếp tục xử lý
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal server error' });
    }
  };

  
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname +  "-" + Date.now() + path.extname(file.originalname))
  }
  })
  
  // Cấu hình multer
  let upload = multer({
    storage: storage
  })
  
// Middleware riêng để xử lý file upload
export const handleSingleFileUpload = upload.single('file');


