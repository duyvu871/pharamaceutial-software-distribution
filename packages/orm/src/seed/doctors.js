import { PrismaClient } from '@prisma/client';
import { faker, Faker, vi } from '@faker-js/faker';

const viFaker = new Faker({
	locale: [vi],
});

const prisma = new PrismaClient();

async function seedDoctors() {
	const numberOfDoctors = 10; // Adjust the number of doctors you want to create

	for (let i = 0; i < numberOfDoctors; i++) {
		const tenBacSi = viFaker.person.fullName();
		const tenSlug = viFaker.helpers.slugify(tenBacSi).toLowerCase();
		const count = await prisma.doctors.count({
			where: {
				branch_id: "f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e",
			}
		});
		await prisma.doctors.create({
			data: {
				doctor_id: "BS" + (count + 1).toString().padStart(6, "0"),
				branch_id: "f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e", // In a real application, you'd likely select an existing branch_id
				specialization: faker.person.jobTitle(),
				email: faker.internet.email(),
				status: viFaker.helpers.arrayElement([0, 1, 2]), // Example status values
				chuyen_khoa: faker.person.jobArea(),
				dia_chi: faker.location.streetAddress(),
				sdt: viFaker.phone.number(),
				ghi_chu: viFaker.lorem.sentence(),
				is_active: viFaker.datatype.boolean(),
				is_deleted: viFaker.datatype.boolean(),
				loai_so_quy: viFaker.number.int({ min: 0, max: 5 }), // Example range for loai_so_quy
				noi_cong_tac: viFaker.company.name(),
				ten_bac_si: tenBacSi,
				ten_slug: tenSlug,
				trinh_do: viFaker.helpers.arrayElement(['Thạc sĩ', 'Tiến sĩ', 'Bác sĩ chuyên khoa I', 'Bác sĩ chuyên khoa II']),
				created_at: viFaker.date.past(),
				updated_at: viFaker.date.recent(),
				deleted_at: viFaker.datatype.boolean() ? viFaker.date.past() : null,
				// storesId: faker.string.uuid(), //  In a real application, you'd likely select an existing storesId or leave it null
			},
		});
		console.log(`Created doctor ${i + 1}`);
	}
}

async function main() {
	console.log('Seeding doctors...');
	try {
		await seedDoctors();
		console.log('Successfully seeded doctors.');
	} catch (error) {
		console.error('Error seeding doctors:', error);
	} finally {
		await prisma.$disconnect();
	}
}

main();