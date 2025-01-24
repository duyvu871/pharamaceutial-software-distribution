import { z } from "zod";

export class SubscriptionValidation {
	public static subscriptionTypeParam = z.object({
		subscriptionType: z.enum(["admin", "branch"]),
	})
	public static registerSubscription = z.object({
		planId: z.string().uuid({
			message: "Plan ID is not valid"
		}),
		registerId: z.string().uuid({
			message: "Register ID is not valid"
		}),
	});
}

export type SubscriptionTypeParam = z.infer<typeof SubscriptionValidation.subscriptionTypeParam>;
export type RegisterSubscription = z.infer<typeof SubscriptionValidation.registerSubscription>;