export type ImportSchema = {
	id: string
	store_id: string
	provider_id: string
	invoice_no: string
	name: string
	total_amount: number
	amount_due: number
	amount_paid: number
	debit: number
	notes: string
	vat: number
	status: number
	createdAt: string
	updatedAt: string
}

export type ImportInvoiceProductSchema = {
	id: string
	import_invoice: string
	product_id: string
	quantity: number
	price: number
	total: number
	createdAt: string
	updatedAt: string
}