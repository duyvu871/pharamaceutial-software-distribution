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

	public static subscriptionPaymentStatus = z.object({
		paymentStatus: z.enum(["total", "unregistered", "paid", "unpaid", "pending", "cancelled", "expired"]).optional(),
	});
}

export type SubscriptionTypeParam = z.infer<typeof SubscriptionValidation.subscriptionTypeParam>;
export type RegisterSubscription = z.infer<typeof SubscriptionValidation.registerSubscription>;
export type SubscriptionPaymentStatus = z.infer<typeof SubscriptionValidation.subscriptionPaymentStatus>;