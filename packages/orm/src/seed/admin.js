import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding admins and admin_to_user...');

	// Function to hash a password
	const hashPassword = async (password) => {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	};
	const adminCreatedTask = []
	// Seed Admins
	const adminsData = [
		{
			username: 'admin',
			last_name: 'Kiên',
			first_name: 'Nguyễn',
			gender: 'male',
			password: await hashPassword("era8.com.vn"), // hashed password
			email: 'era8@gmail.com',
			phone_number: '111-222-3333',
			postal_code: '99999',
			address: 'Ha Noi, Viet Nam',
			avatar: null,
			notes: '',
			bio: '',
			is_active: true,
			last_login: new Date(),
			permission: [
				"Brand.All",
				'Report.All',
				'Supplier.All',
				'Medicine.All',
				'Membership.All',
				'Promotion.All',
				'User.All',
				'Admin.All',],
			createdAt: new Date(),
			updatedAt: new Date()
		},
	];

	// Create admins
	for (const adminData of adminsData) {
		adminCreatedTask.push(prisma.admins.create({
			data: adminData,
		}));
	}

	const result = await Promise.all(adminCreatedTask)

	// Seed Admin to User connections (assuming you have a seed for users)
	const adminToUserData = [
		{
			adminId: result[0].id,
			userId: 'f1b1e7d0-1a9e-4b1b-8c8e-1d3f9c1c1b1e', // Replace with a user ID you've seeded
			createdAt: new Date(),
			updatedAt: new Date()
		},
	];

	// Create admin to users
	for (const adminToUser of adminToUserData) {
		await prisma.admin_to_user.create({
			data: adminToUser,
		});
	}

	console.log('Seeding complete!');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});