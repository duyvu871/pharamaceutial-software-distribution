import { z } from 'zod';


// Zod Schema cho Product
export const ProductZodSchema = z.object({
	store_id: z.number(),
	id: z.number(),
	product_type: z.string(),
	medicine_id: z.number().nullable(),
	barcode: z.string().nullable(),
	product_no: z.string(),
	product_name: z.string(),
	shortcut: z.string().nullable(),
	original_price: z.number(),
	sell_price: z.number(),
	weight: z.number().nullable(),
	quantity_of_stock: z.number(),
	group_id: z.number().nullable(),
	using_id: z.number(),
	base_unit: z.string(),
	status: z.number(),
	created_at: z.date(),
	updated_at: z.date(),
	min_quantity: z.number(),
	max_quantity: z.number(),
	description: z.string().nullable(),
	note: z.string().nullable(),
	manufacturer: z.string().nullable(),
	made_in: z.string().nullable(),
	deleted_at: z.date().nullable(),
	deleted_by: z.string().nullable(),
	avg_original_price: z.number(),
	default_image: z.string().nullable(),
	productUnit: z.string().nullable(),
	quantity: z.object({
		id: z.number(),
		store_id: z.number(),
		branch_id: z.number(),
		product_id: z.number(),
		number: z.number(),
	}),
});

// Type cho Product từ Zod Schema
export type ProductAttributes = z.infer<typeof ProductZodSchema>;

// // Sequelize Model
// interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}
//
// export default function(sequelize: Sequelize) {
// 	class ProductSchema extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
// 		declare store_id: number; //
// 		declare id: number;
// 		declare product_type: string; // Loại sản phẩm
// 		declare medicine_id: number | null; // ID thuốc
// 		declare barcode: string | null; // Mã vạch
// 		declare product_no: string; // Mã sản phẩm
// 		declare product_name: string; // Tên sản phẩm
// 		declare shortcut: string | null; // Tên viết tắt
// 		declare original_price: number; // Giá gốc
// 		declare sell_price: number; // Giá bán
// 		declare weight: number | null; // Trọng lượng
// 		declare quantity_of_stock: number; // Số lượng tồn kho
// 		declare group_id: number | null; // ID nhóm
// 		declare using_id: number; // ID người sử dụng
// 		declare base_unit: string; // Đơn vị cơ bản
// 		declare status: number; // 1: Active, 0: Inactive
// 		declare created_at: Date; // Thời gian tạo
// 		declare updated_at: Date; // Thời gian cập nhật
// 		declare min_quantity: number; // Số lượng tối thiểu
// 		declare max_quantity: number; // Số lượng tối đa
// 		declare description: string | null; // Mô tả
// 		declare note: string | null; // Ghi chú
// 		declare manufacturer: string | null; // Nhà sản xuất
// 		declare made_in: string | null; // Nơi sản xuất
// 		declare deleted_at: Date | null; // Thời gian xóa
// 		declare deleted_by: string | null; // ID người xóa
// 		declare avg_original_price: number; // Giá gốc trung bình
// 		declare default_image: string | null; // Ảnh mặc định
// 		declare productUnit: string; // id Đơn vị sản phẩm
// 		declare quantity: {
// 			id: number;
// 			store_id: number;
// 			branch_id: number;
// 			product_id: number;
// 			number: number;
// 		};
//
// 		public static associate(
// 			models: {
// 				StoreSchema: ReturnType<typeof StoreSchema>;
// 				ProductUnitSchema: ReturnType<typeof ProductUnitSchema>;
// 				GroupSchema: ReturnType<typeof GroupSchema>
// 			}
// 		) {
// 			// many-to-one
// 			ProductSchema.belongsTo(models.StoreSchema, {
// 				foreignKey: 'store_id',
// 				as: 'store',
// 			});
// 			console.log('ProductSchema -> StoreSchema');
//
// 			// many-to-many với Group thông qua bảng product_groups
// 			ProductSchema.belongsToMany(models.GroupSchema, {
// 				through: 'product_groups', // Tên bảng trung gian
// 				foreignKey: 'product_id', // Khóa ngoại trong bảng product_groups trỏ đến Product
// 				otherKey: 'group_id', // Khóa ngoại trong bảng product_groups trỏ đến Group
// 				as: 'groups', // Alias để sử dụng trong include
// 			});
// 			console.log('ProductSchema -> GroupSchema');
//
// 			// one-to-many với ProductUnit
// 			ProductSchema.belongsToMany(models.ProductUnitSchema, {
// 				through: 'product_unit_labels',
// 				foreignKey: 'product_id',
// 				otherKey: 'product_unit',
// 				as: 'productUnit',
// 			});
// 			console.log('ProductSchema -> ProductUnitSchema');
// 		}
// 	}
//
// 	ProductSchema.init(
// 		{
// 			store_id: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: 'stores', // Tên bảng branch
// 					key: 'store_id',
// 				},
// 				onUpdate: 'CASCADE', // Cập nhật dữ liệu liên quan
// 				onDelete: 'RESTRICT', // Xóa dữ liệu liên quan
// 			},
// 			id: {
// 				type: DataTypes.UUID,
// 				defaultValue: DataTypes.UUIDV4,
// 				primaryKey: true,
// 				allowNull: false,
// 			},
// 			product_type: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			medicine_id: {
// 				type: DataTypes.INTEGER,
// 				allowNull: true,
// 			},
// 			barcode: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			product_no: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			product_name: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			shortcut: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			original_price: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			sell_price: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			weight: {
// 				type: DataTypes.INTEGER,
// 				allowNull: true,
// 			},
// 			quantity_of_stock: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
//
// 			using_id: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			base_unit: {
// 				type: DataTypes.STRING,
// 				allowNull: false,
// 			},
// 			status: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			created_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			updated_at: {
// 				type: DataTypes.DATE,
// 				allowNull: false,
// 			},
// 			min_quantity: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			max_quantity: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			description: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			note: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			manufacturer: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			made_in: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			deleted_at: {
// 				type: DataTypes.DATE,
// 				allowNull: true,
// 			},
// 			deleted_by: {
// 				type: DataTypes.UUID,
// 				allowNull: true,
// 			},
// 			avg_original_price: {
// 				type: DataTypes.INTEGER,
// 				allowNull: false,
// 			},
// 			default_image: {
// 				type: DataTypes.STRING,
// 				allowNull: true,
// 			},
// 			group_id: {
// 				type: DataTypes.UUID,
// 				allowNull: true,
// 				references: {
// 					model: 'groups',
// 					key: 'id',
// 				}
// 			},
// 			productUnit: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: 'product_units',
// 					key: 'id',
// 				}
// 			},
// 			quantity: {
// 				type: DataTypes.JSON,
// 				allowNull: false,
// 			},
// 		},
// 		{
// 			sequelize,
// 			modelName: 'products',
// 			timestamps: false,
// 		}
// 	);
//
// 	return ProductSchema;
// };