import axiosWithAuth from '@lib/axios.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { DoctorCreationSchema, DoctorSchema } from '@schema/doctor-schema.ts';
import { InvoiceWithPrescriptionType } from '@schema/invoice-schema.ts';

export const getDoctors = async (filter: {
	branchId: string;
	page: number;
	limit: number;
	search?: string; // search by fts
	searchFields?: string; // name:abc, name:def
	orderBy?: string; // created_at:desc, created_at:asc
	filterBy?: string; // status:1, status:0
}) => {
	try {
		if (!filter.branchId) {
			throw new Error('Branch ID is required');
		}
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<DoctorSchema>>>(`/doctor/${filter.branchId}`, {
			params: {
				page: filter.page,
				pageSize: filter.limit,
				search: filter.search,
				searchFields: filter.searchFields,
				orderBy: filter.orderBy,
				filterBy: filter.filterBy,
			},
		});
		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const upsertDoctor = async (branchId: string, doctor: DoctorCreationSchema) => {
	try {
		if (!branchId) {
			throw new Error('Branch ID is required');
		}
		const response = await axiosWithAuth.post<SuccessResponse<DoctorSchema>>(`/doctor/${branchId}`, doctor);
		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const getDoctorPrescriptions = async (
	branchId: string,
	filter: {
		doctorId: string,
		page: number;
		limit: number;
		search?: string | string[]; // search by fts
		searchFields?: [string, string][]; // [field, value]
	}
) => {
	try {
		if (!branchId) {
			throw new Error('Branch ID is required');
		}
		if (!filter.doctorId) {
			throw new Error('Doctor ID is required');
		}
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<InvoiceWithPrescriptionType[]>>>(`/doctor/${branchId}/${filter.doctorId}/prescription`);
		return response.data.data;
	} catch (error) {
		throw error;
	}
}