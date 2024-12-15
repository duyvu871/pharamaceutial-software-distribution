import { UserSchema } from 'repository/user';
import { BranchSchema } from 'repository/branch';
import { BranchDetailSchema } from 'repository/branch-detail';
import { ConsumerSchema } from 'repository/consumer';
import GroupSchema from 'repository/group/schema.ts';
import { MembershipSchema } from 'repository/membership';
import ProductSchema from 'repository/product/schema.ts';
import ProductUnitSchema from 'repository/product/product-unit/schema.ts';
import StoreSchema from 'repository/store/schema.ts';

const models = {
	UserSchema: UserSchema,
	BranchSchema: BranchSchema,
	StoreSchema: StoreSchema,
	BranchDetailSchema: BranchDetailSchema,
	ConsumerSchema: ConsumerSchema,
	GroupSchema: GroupSchema,
	MembershipSchema: MembershipSchema,
	ProductSchema: ProductSchema,
	ProductUnitSchema: ProductUnitSchema,
}

export const associate = () => {
	Object.keys(models).forEach((modelName) => {
		if (models[modelName].associate) {
			models[modelName].associate(models);
		}
	});
}

export { models };