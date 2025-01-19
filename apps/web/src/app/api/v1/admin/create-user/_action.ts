import { PrismaClient } from '@prisma/client';
 // Replace with actual path
import { z } from 'zod'
import bcrypt from 'bcrypt';
import { UserSchema } from '@schema/admin/admin-schema.ts';
import prisma from '@lib/prisma.ts';

type UserInput = z.infer<typeof UserSchema>;

const createUser = async (userData: UserInput) => {
	try {
		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const user = await prisma.users.create({
			data: {
				username: userData.username,
				password: hashedPassword,
				email: userData.email,
				phone_number: userData.phone,
				address: userData.address,
			},
		});

		return user;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error; // Or handle the error as needed
	}
};

const createAdmin = async (userData: UserInput) => {
	try {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		const admin = await prisma.admins.create({
			data: {
				username: userData.username,
				password: hashedPassword,
				email: userData.email,
				phone_number: userData.phone,
				address: userData.address,
				first_name: userData.firstName || "",
				last_name: userData.lastName || "",
				postal_code: userData.zipCode,
				gender: userData.gender as "male" | "female" | "other",
			}
		});
		return admin;
	}
	catch(error) {
		console.error('Error creating admin', error)
		throw error;
	}
}

const createMembership = async(userData: UserInput, branchId: string) => {
	try{
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		const membership = await prisma.memberships.create({
			data: {
				username: userData.username,
				password: hashedPassword,
				email: userData.email,
				phone_number: userData.phone,
				address: userData.address,
				first_name: userData.firstName || "",
				last_name: userData.lastName || "",
				branch_id: branchId,
				hire_date: new Date(),
				employee_status: "active",
			}
		});
		return membership;
	}
	catch(error){
		console.error("Error creating membership", error)
		throw error;
	}
}
// Function to create new store,
const createStore = async (userData: UserInput, branchId: string) => {
	try {
		const store = await prisma.stores.create({
			data: {
				store_name: userData.store,
				address: userData.address || "",
				branch_id: branchId,
			}
		})
		return store;
	}
	catch(error) {
		console.error("Error creating store", error);
		throw error;
	}
}

export {
	createUser,
	createAdmin,
	createMembership,
	createStore
}