export type JWTPayload = {
		id: string;
		type: "USER"| "MEMBERSHIP" | "ADMIN"
}