// import { Stat } from '../schema/stat';

import { Stat } from '@schema/test/stat.ts';

const main: Stat = {
	user:[],

	Admin: [
		{   id: 1,
			username: 'admin',
			fullName: 'Nguyễn Kiên',
			phoneNumber: '0123456789',
			address: 'Ha Noi, Viet Nam',
			email: 'era8@gmail.com',
			gender: 'Nam',
			birthDate: '',
			status: true,
		}
	],
	Store:[

	]

};
const Branch: Stat ={
	user:[],
	Admin: [],

	Store:[
		{
			id: 1,
			username: '0001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '0001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '0001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '00001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '00001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '00001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '00001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		},
		{
			id: 1,
			username: '00001',
			fullName: 'Trần Thị Vân',
			phoneNumber: '0912002797',
			address:'',
			email: '',
			gender: '',
			birthDate: '',
			status: true,
		}
	]
}
const sub: Stat = {
	Admin: [],
	Store: [],
	user: [
		{
			"createdAt": "2025-01-02T16:29:30.270Z",
			"updatedAt": "2025-01-02T16:29:30.000Z",
			"username": "0979363987",
			"dob": null,
			"firstName": "Phùng Thị Thảo",
			"lastName": null,
			"gender": null,
			"address": "Căn thương mại dịch vụ số TMDV08A, khối nhà U39.1, Dự án Masteri West Heights ( tòa B), khu đô thị mới Tây Mỗ - Đại Mỗ - Vinhomes",
			"wards": "Tây Mỗ",
			"district": "Nam Từ Liêm",
			"city": "Hà Nội",
			"postCode": null,
			"avatar": null,
			"bio": null,
			"email": null,
			"roleId": 2,
			"nextExtendDay": "2025-01-02T16:29:30.000Z",
			"extendDay": "2025-04-02T16:29:38.000Z",
			"id": 60,
			"code": "CH000060",
			"name": "NHÀ THUỐC THỦ ĐÔ",
			"phone": "0979363987",
			"managerId": 69,
			"storeGroupId": 6,
			"usernameLink": null,
			"level": 1,
			"active": true,
			"activeRewards": true,
			"rewardsPerPoint": 1,
			"pointPerRewards": 1,
			"paymentInfo": null,
			"groupStore": {
				"createdAt": "2024-09-27T14:35:05.761Z",
				"updatedAt": "2024-09-27T14:35:06.000Z",
				"id": 6,
				"code": "f9c36e83-221a-4565-97f0-3a1ed3421b4c",
				"tenant": {
					"createdAt": "2024-09-27T14:35:05.761Z",
					"updatedAt": "2024-09-27T14:40:37.787Z",
					"id": 6,
					"username": "admin",
					"dob": "1981-02-26T14:40:22.000Z",
					"phone": null,
					"name": null,
					"firstName": "Nguyễn",
					"lastName": "Kiên",
					"gender": "male",
					"address": "nhà D16 KĐT Đặng Xá",
					"wards": "Đặng Xá",
					"district": "Gia Lâm",
					"city": "Hà Nội",
					"postCode": null,
					"avatar": null,
					"bio": null,
					"email": "duocphamera@gmail.com",
					"active": true,
					"groupStoreId": 6
				}
			},
			"tenantId": 69,
			"tenantName": "Phùng Thị Thảo ",
			"tenantEmail": null
		},
	]
}
export const statMock = {
	main,
	sub,
	Branch,
};