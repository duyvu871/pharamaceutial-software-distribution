import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from 'server/repository';
import { BranchSchema } from 'server/repository/branch';

export interface BranchDetailAttributes {
	id: string; // UUID
	branch_id: string; // UUID
	so_dang_ky: string; // Số đăng ký
	ten_nha_thuoc: string; // Tên nhà thuốc
	loai_hinh: string; // Loại hình
	tinh: string; // Tỉnh
	huyen: string; // Huyện
	dia_chi: string; // Địa chỉ
	nguoi_dai_dien: string; // Người đại diện
	nguoi_chiu_trach_nhiem: string; // Người chịu trách nhiệm
	nguoi_chiu_trach_nhiem_chuyen_mon: string; // Người chịu trách nhiệm chuyên môn
	so_chung_chi_hanh_nghe: string; // Số chứng chỉ hành nghề

	createdAt: Date | null;
	updatedAt: Date;
}

interface BranchDetailCreationAttributes extends Optional<BranchDetailAttributes, 'branch_id'> {}

export const BranchDetailPermission = {
	CREATE: 'BranchDetail.Create',
	READ: 'BranchDetail.Read',
	UPDATE: 'BranchDetail.Update',
	DELETE: 'BranchDetail.Delete',
	ALL: 'BranchDetail.All',
}

export default function(sequelize: Sequelize) {
	class BranchDetailSchema extends Model<BranchDetailAttributes, BranchDetailCreationAttributes> implements BranchDetailAttributes {
		declare id: string;
		declare branch_id: string;
		declare so_dang_ky: string;
		declare ten_nha_thuoc: string;
		declare loai_hinh: string;
		declare tinh: string;
		declare huyen: string;
		declare dia_chi: string;
		declare nguoi_dai_dien: string;
		declare nguoi_chiu_trach_nhiem: string;
		declare nguoi_chiu_trach_nhiem_chuyen_mon: string;
		declare so_chung_chi_hanh_nghe: string;

		declare readonly createdAt: Date;
		declare readonly updatedAt: Date;

		public static associate(models: { BranchSchema: typeof BranchSchema }) {
			BranchDetailSchema.belongsTo(models.BranchSchema, { foreignKey: 'branch_id', as: 'branch' });
		}

	}

	BranchDetailSchema.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		branch_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
		},
		so_dang_ky: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ten_nha_thuoc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		loai_hinh: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tinh: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		huyen: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dia_chi: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nguoi_dai_dien: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nguoi_chiu_trach_nhiem: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nguoi_chiu_trach_nhiem_chuyen_mon: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		so_chung_chi_hanh_nghe: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
	}, {
		sequelize,
		modelName: 'branch_details'
	});

	return BranchDetailSchema;
};