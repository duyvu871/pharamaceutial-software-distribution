import { InvoiceState } from '@store/state/overview/invoice.ts';
import axiosWithAuth from '@lib/axios.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { InvoiceType, PrescriptionCreationSchema, PrescriptionSchema } from '@schema/invoice-schema.ts';
import { FilterParams } from '@type/api/params.ts';
import { DoctorSchema } from '@schema/doctor-schema.ts';

export interface InvoiceResponse {
	id: string
	branchId: string
	invoice_id: string
	saleDate: string
	vat: number
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

	invoice_prescriptions: (PrescriptionSchema & {doctor: DoctorSchema})[]
}

export const submitInvoice = async (data: InvoiceState, prescription?: PrescriptionCreationSchema) => {
	try {
		const invoicePayload = data.invoiceData;
		if (!invoicePayload.branchId) {
			console.error('Branch ID is required');
			return false;
		}
		const response = await axiosWithAuth.post(`/invoice/${invoicePayload.branchId}`, {
			...invoicePayload,
			...(invoicePayload.isPrescriptionSale && prescription ? { prescription } : {}),
		});
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

export const getInvoicePrescription = async (
	filter: FilterParams
) => {
	try {
		if (!filter.branchId) {
			throw new Error('Branch ID is required');
		}
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<PrescriptionSchema & {invoices: InvoiceResponse, doctor: DoctorSchema, userInfo: {username: string, id: string, type: string}}>>>
		(`/invoice/${filter.branchId}/prescription`, {
			params: filter,
		});
		return response.data.data;
	} catch (error: any) {
		console.error(`Error getting invoice list: ${error.message}`);
		throw error
	}
}