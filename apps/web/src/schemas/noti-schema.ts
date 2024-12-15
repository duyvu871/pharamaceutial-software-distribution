export type Notification = {
	id: string
	title: string
	description: string
	type: 'info' | 'success' | 'warning' | 'error'
	isRead: boolean
}

export type NotiAction = {
	username: string;
	role: 'user' | 'membership' | 'admin'; //e.g., "admin", "user"
	entity: string; //e.g., "product", "order", "system"
	action: 'created'|'updated'|'deleted'|'purchased'|'canceled'|'returned'|'error'|'maintenance'; //e.g., "created", "updated", "purchased", "canceled"
	quantity?: number; //Optional quantity
	value: number; //Value in VND
	timestamp: string; //e.g., "24 ngày trước", or a more precise timestamp like "2024-03-15T10:30:00"
}