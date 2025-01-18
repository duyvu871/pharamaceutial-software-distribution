import {z} from 'zod';
import { MembershipZodSchema } from 'server/repository/membership/schema.ts';
import { dateString } from 'validations/common.ts';

export class MembershipValidation {
	public static createMembership = z.object({
		id: MembershipZodSchema.shape.id.optional(),
		username: MembershipZodSchema.shape.username,
		password: MembershipZodSchema.shape.password,
		email: MembershipZodSchema.shape.email,
		phone_number: MembershipZodSchema.shape.phone_number,
		hire_date: dateString,
		first_name: MembershipZodSchema.shape.first_name,
		last_name: MembershipZodSchema.shape.last_name,
		avatar: MembershipZodSchema.shape.avatar.optional(),
		notes: MembershipZodSchema.shape.notes.optional(),
	});
}

export type CreateMembership = z.infer<typeof MembershipValidation.createMembership>;