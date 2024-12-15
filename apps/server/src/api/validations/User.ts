import { z } from 'zod';

export class UserValidation {
	public static profileQuery = z.object({
		id: z.string().min(10, { message: 'User ID is invalid' })
	});
}

export type ProfileQuery = z.infer<typeof UserValidation.profileQuery>;