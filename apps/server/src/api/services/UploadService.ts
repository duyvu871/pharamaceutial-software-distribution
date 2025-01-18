import BadRequest from 'responses/clientErrors/BadRequest.ts';
import prisma from 'repository/prisma.ts';
import path from 'node:path';
import fs from 'fs';
import config from 'config/app-config';
import { v4 as uuidv4 } from 'uuid';

export class UploadService {
		public static type_enum = ['avatar', 'product', 'branch', 'category', 'service', 'promotion', 'membership', 'employee', 'customer', 'supplier', 'order', 'invoice', 'payment', 'expense', 'report', 'setting', 'other'];
		public static async uploadImage(image: Express.Multer.File, branchId: string, type: string, jwtPayload: Record<string | any, any>) {
			try {
				this.validateType(type);


				if (!image) {
					throw new BadRequest('invalid_file', 'Không có ảnh được upload', 'Invalid file');
				}

				const store = await prisma.stores.findFirst({
					where: { branch_id: branchId },
					select: { id: true }
				});

				if (!store) {
					throw new BadRequest('store_not_found', 'Store not found', 'Store not found');
				}
				const storeId = store.id;

				const imageOriginalName = image.originalname;
				const imageBuffer = image.buffer;
				const imageExtension = imageOriginalName.split('.').pop();

				if (!imageExtension) throw new BadRequest('invalid_file', 'Invalid file', 'Invalid file');

				const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

				if (!allowedExtensions.includes(imageExtension)) throw new BadRequest('invalid_file', 'Invalid file', 'Invalid file');


				const imagePath = `storage/image/${type}/${storeId}/${uuidv4()}.${imageExtension}`;
				const imageAbsolutePath = path.join(process.cwd(), imagePath);
				const mkdir = await fs.promises.mkdir(path.dirname(imageAbsolutePath), { recursive: true });

				// prisma.product_assets.create({})

				const tasks = await Promise.all([
					fs.promises.writeFile(imagePath, imageBuffer),
					prisma.assets.create({
						data: {
							name: imageOriginalName,
							type: image.mimetype,
							store_id: storeId,
							url: `${config.baseUrl}/storage/image/${type}/${storeId}/${path.basename(imagePath)}`,
							meta_data: {
								mime: image.mimetype,
								size: image.size,
								originalName: imageOriginalName,
								encoding: image.encoding,
								destination: `storage/image/branch/${storeId}`,
							},
							path: imagePath,
							from: jwtPayload?.id ? `${jwtPayload.id}_${jwtPayload.type}` : null,
							createdAt: new Date(),
							updatedAt: new Date()
						},
					})
				])

				return tasks[1];
			} catch (error) {
				console.error(`Error uploading image: ${error.message}`);
				throw error;
			}
		}

		public static validateType(type: string) {
			if (!UploadService.type_enum.includes(type)) {
				throw new Error(`Invalid type: ${type}`);
			}
		}
}

export type UploadType = typeof UploadService.type_enum[number];