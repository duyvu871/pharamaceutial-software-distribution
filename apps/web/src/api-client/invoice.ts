import { InvoiceState } from '@store/state/overview/invoice.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';

export interface InvoiceResponse {
	id: string
	branchId: string
	saleDate: string
	saleTime: string
	customerName: string
	priceList: string
	isPrescriptionSale: boolean
	totalPrice: number
	discount: number
	amountDue: number
	amountPaid: number
	debit: number
	notes: string
	autoPrintInvoice: boolean
	printBatchNumber: boolean
	userType: string
	userId: string
	createdAt: string
	updatedAt: string
	customerId: string | null

	items: {
		id: string
		invoiceId: string
		productName: string
		productId: string
		quantity: number
		price: number
		total: number
		unit: string
		note: string
	}[]

	otherCharges: {
		id: string
		invoiceId: string
		name: string
		value: number
	}[]

	userInfo: {
		id: string
		username: string
		type: string
	}
}

export const submitInvoice = async (data: InvoiceState) => {
	try {
		const invoicePayload = data.invoiceData;
		if (!invoicePayload.branchId) {
			console.error('Branch ID is required');
			return false;
		}
		const response = await axiosWithAuth.post(`/invoice/${invoicePayload.branchId}`, invoicePayload);
		return response.data.data;
	} catch (error: any) {
		console.error(`Error submitting invoice: ${error.message}`);
		return false
	}
}

export const getInvoiceList = async (
	filter: {
		branchId: string;
		page: number;
		limit: number;
		orderBy?: string;
	}
): Promise<InvoiceResponse[]> => {
	const { branchId, page, limit } = filter;
	if (!branchId) {
		console.error('Branch ID is required');
		return [];
	}
	try {
		const response = await axiosWithAuth.get<SuccessResponse<InvoiceResponse[]>>(`/invoice/${branchId}`, {
			params: {
				page,
				limit,
				orderBy: filter.orderBy || 'createdAt:DESC', // Order by createdAt in descending order
			},
		});
		return response.data.data;
	} catch (error: any) {
		console.error(`Error getting invoice list: ${error.message}`);
		return [];
	}
}