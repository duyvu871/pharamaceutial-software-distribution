import * as console from 'node:console';

export const localeVi = {
	branch: {
		active: 'Hoạt động',
		inactive: 'Không hoạt động',
	},
	activity: 'Hoạt động',
	add: 'Thêm',
	addBranch: 'Thêm chi nhánh',

	noti: {
		notiAction: {
			created: 'đã tạo',
			updated: 'đã cập nhật',
			deleted: 'đã xóa',
			purchased: 'đã mua',
			error: 'lỗi',
			canceled: 'đã hủy',
			maintenance: 'bảo trì',
			returned: 'đã trả',
		}
	}
} as const;

export const wordVi = {
	system: 'Hệ thống',
	admin: 'Quản trị viên',
	user: 'Quản lý chi nhánh',
	membership: 'Nhân viên',
	order: 'Đơn hàng',
	product: 'Sản phẩm',
	medicine: 'Thuốc',
	branch: 'Chi nhánh',
	activity: 'Hoạt động',
	noti: 'Thông báo',
} as const;

export const genderVi = {
	male: 'Nam',
	female: 'Nữ',
	other: 'Khác',
} as const

export const unitVi = {
	lo: 'Lọ',
	vien: 'Viên',
	vi: 'Vỉ',
	hop: 'Hộp',
	chai: 'Chai',
	tuyp: 'Tuýp',
	goi: "Gói",
} as const;