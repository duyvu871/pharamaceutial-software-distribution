import { PrismaClient } from '@prisma/client';
import { Faker, vi, faker } from '@faker-js/faker';

const viFaker = new Faker({
	locale: [vi],
});

const prisma = new PrismaClient();

async function seedConsumers() {

	// Replace with actual branch id from your database
	const branchId = 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e';

	const genderOptions = ['male', 'female', null];
	const numberOfConsumers = 10

	try {

		for(let i = 0; i < numberOfConsumers; i++) {
			await prisma.consumers.create({
				data: {
					branch_id: branchId,
					consumer_name: viFaker.person.fullName(),
					gender: faker.helpers.arrayElement(genderOptions) ,
					consumer_email: faker.internet.email(),
					phone_number: viFaker.phone.number({
						format: '0xxxxxxxxx',
					}),
					tax_code: faker.string.alphanumeric({length: 10}),
					company_name: faker.company.name(),
					date_of_birth: faker.date.birthdate(),
					facebook: faker.internet.url(),
					address: faker.location.streetAddress(),
					notes: faker.lorem.sentence(),
					province_city: faker.location.city(),
					district: faker.location.county(),
					ward: faker.location.street(),
					revenue: faker.number.bigInt({min: 0, max: 10000000}),
					debit: faker.number.bigInt({min: 0, max: 5000000}),
					createdAt: faker.date.past(),
					updatedAt: faker.date.recent(),
				},
			});
		}

		console.log('Successfully seeded consumers');
	} catch (error) {
		console.error('Error seeding consumers:', error);
	} finally {
		await prisma.$disconnect();
	}
}

async function main() {
	await seedConsumers();
}
main();