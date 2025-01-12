import { z } from 'zod'

export class UploadValidation {
	public static typeQuery = z.object({
		type: z.string()
	})
}

export type UploadTypeQuery = z.infer<typeof UploadValidation.typeQuery>