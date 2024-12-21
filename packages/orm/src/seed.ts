import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Dữ liệu mẫu cho các Providers
	const providers = [
		{
			id: "7f83e1d8-8a5d-4b09-9f63-1c7892e2e890", // UUID tự tạo hoặc để Prisma tự động
			companyName: "Công ty Hùng Vĩ",
			phoneNumber: "0324515648",
			email: "hungvi@example.com",
			taxCode: "123456789",
			address: "123 Đường ABC, Phường XYZ",
			city: "Hà Nội",
			district: "Đống Đa",
			wards: "Trung Tự",
			note: "Ghi chú cho công ty Hùng Vĩ",
			storeId: "f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e", // UUID liên kết đến store
		},
		{
			id: "5c2b0e27-7f77-4f68-87fc-bd9d1d2e3f2e",
			companyName: "Công ty Minh Đức",
			phoneNumber: "0987654321",
			email: "minhduc@example.com",
			taxCode: null,
			address: "456 Đường DEF, Phường GHI",
			city: "Hồ Chí Minh",
			district: "Quận 1",
			wards: "Phường Bến Nghé",
			note: null,
			storeId: "f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e",
		},
		{
			id: "d8b0f94c-3aef-40e2-9422-317a7f2a43a1",
			companyName: "Công ty Ánh Dương",
			phoneNumber: "0912345678",
			email: null,
			taxCode: "987654321",
			address: "789 Đường XYZ, Phường LMN",
			city: "Đà Nẵng",
			district: "Hải Châu",
			wards: "Phường Thạch Thang",
			note: "Nhà cung cấp thân thiết",
			storeId: "f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e",
		},
	];

	// Thêm dữ liệu vào bảng Providers
	for (const provider of providers) {
		await prisma.providers.create({
			data: provider,
		});
	}

	console.log("Providers seeding completed!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
