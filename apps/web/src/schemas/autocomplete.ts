export type SearchProductType = {
	drug_code: string; // Mã thuốc
	drug_name: string; // Tên thuốc
	registration_number: string; // Số đăng ký
	active_ingredient: string; // Thành phần hoạt chất
	packaging: string; // Quy cách đóng gói
	manufacturer: string; // Nhà sản xuất
	country_of_origin: string; // Nước sản xuất
	unit: string; // Đơn vị tính
	declaration_facility: string; // Cơ sở sản xuất
	dosage_form: string; // Hình thức bào chế
	registration_country: string; // Nước đăng ký
	registration_address: string; // Địa chỉ đăng ký
	manufacturing_address: string; // Địa chỉ sản xuất
	drug_type: string; // Loại thuốc
	prescription_required: boolean; // Thuốc kê đơn
	drug_identifier: string; // Mã vạch
}

export type SearchRegionResponseType = {
	refType: 'tinh'|'huyen'|'xa';
	result: {
		value: string;
		id: string;
		ref: string;
	}[];
}

