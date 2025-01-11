import { z } from "zod";

const ProviderSchema = z.object({
	id: z.number().int(), // Assuming id is an auto-incrementing integer
	companyName: z.string().min(1).max(255), // Required field
	taxCode: z.string().nullable(), // Nullable string
	phoneNumber: z.string().nullable(), // Nullable string
	email: z.string().nullable(), // Nullable string
	address: z.string().nullable(), // Nullable string
	city: z.string().nullable(), // Nullable string
	district: z.string().nullable(), // Nullable string
	wards: z.string().nullable(), // Nullable string
	note: z.string().nullable(), // Nullable string
	createdAt: z.date(), // Required Date field
	updatedAt: z.date(), // Required Date field
	storeId: z.number().int(), // Foreign key reference
});

export type ProviderAttributes = z.infer<typeof ProviderSchema>;

export { ProviderSchema };
