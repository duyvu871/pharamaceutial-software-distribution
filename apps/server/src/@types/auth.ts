export type JWTPayload = {
		id: string;
		type: "USER"| "MEMBERSHIP" | "ADMIN"
}

export type Permissions = "Read"| "Update"| "Create"| "Delete"| "All";