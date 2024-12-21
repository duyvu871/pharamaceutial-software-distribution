import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {UserSchema} from 'server/repository/user';
import * as zod from 'zod';

export interface BranchAttributes {
	branch_id: string; // UUID
	branch_name: string; // Name of the branch
	address: string; // Physical address of the branch
	phone_number: string; // Contact number of the branch
	branch_status: 'active' | 'inactive'; // Status of the branch
	owner_id: string; // UUID of the owner of the branch

	createdAt: Date | null;
	updatedAt: Date | null;
}

interface BranchCreationAttributes extends Optional<BranchAttributes, 'branch_id'> {}

export const BranchPermission = {
	CREATE: 'Branch.Create',
	READ: 'Branch.Read',
	UPDATE: 'Branch.Update',
	DELETE: 'Branch.Delete',
	ALL: 'Branch.All',
}

// export default function(sequelize: Sequelize) {
// 	class BranchSchema extends Model<BranchAttributes, BranchCreationAttributes> implements BranchAttributes {
// 		declare branch_id: string;
// 		declare branch_name: string;
// 		declare address: string;
// 		declare phone_number: string;
// 		declare branch_status: 'active' | 'inactive';
// 		declare owner_id: string;
//
// 		declare readonly createdAt: Date;
// 		declare readonly updatedAt: Date;
//
// 		public static associate(models: {
// 			UserSchema: ReturnType<typeof UserSchema>;
// 		}) {
// 			BranchSchema.belongsTo(models.UserSchema, { foreignKey: 'owner_id', as: 'owner' });
// 		}
//
// 	}
// 	BranchSchema.init({
// 		branch_id: {
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4,
// 			primaryKey: true,
// 			allowNull: false,
// 		},
// 		branch_name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		address: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		phone_number: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		branch_status: {
// 			type: DataTypes.ENUM('active', 'inactive'),
// 			allowNull: false,
// 		},
// 		owner_id: {
// 			type: DataTypes.UUID,
// 			allowNull: false,
// 		},
// 		createdAt: {
// 			type: DataTypes.DATE,
// 			defaultValue: DataTypes.NOW,
// 			allowNull: true,
// 		},
// 		updatedAt: {
// 			type: DataTypes.DATE,
// 			defaultValue: DataTypes.NOW,
// 			allowNull: true,
// 		},
// 	}, {
// 		sequelize,
// 		modelName: 'branches'
// 	});
//
// 	return BranchSchema;
// };