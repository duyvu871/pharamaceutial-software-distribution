import { Prisma, users } from '@prisma/client';

export class AdminTask {
		public static login(username: string, password: string) {

		}

		public getUsersSlave(adminId: string) {

		}

		public createUserSlave(adminId: string, user: Omit<users, "id">) {

		}
		
		public updateUserSlave(adminId: string, userId: string, user: Prisma.usersUpdateInput) {

		}
}