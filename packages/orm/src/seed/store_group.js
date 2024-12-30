import { PrismaClient } from '@prisma/client';
import storeGroup from './data/store_group.json' assert { type: 'json' };
const prisma = new PrismaClient();


async function main() {
	console.log(`Start seeding ...`)
	for (const g of storeGroup) {
		const store_group = await prisma.store_group.create({
			data: g,
		})
		console.log(`Created store group with id: ${store_group.id}`)
	}
	console.log(`Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
