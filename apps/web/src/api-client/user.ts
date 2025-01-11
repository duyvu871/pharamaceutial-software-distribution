'use server'
import { revalidatePath } from "next/cache";
import {prisma} from './prisma';  
import bcrypt from 'bcrypt'
import { useAuth } from '@hook/auth/use-auth';
import axiosWithAuth from '@lib/axios.ts';
import { API_URL } from 'config';
import { ProfilePayloadType } from '@schema/user-schema.ts';
import { SuccessResponse } from '@type/api/response.ts';
const {userSessionInfo} = useAuth();
export const getUserProfile = async (userId: any): Promise<ProfilePayloadType | null> => {
	try {
		const response = await axiosWithAuth<SuccessResponse<ProfilePayloadType>>(`${API_URL}/user/profile`, {
			params: {
				id: userId
			}
		});
		if (response.data.status !== 200) {
			return null
		}
		return response.data.data;
	} catch (error) {
		console.error('Error getting user profile:', error);
		return null;
	}
}


export async function createUserAction(formData: FormData, adminId: string) {
  const username = formData.get("username");
  const password = formData.get("password") as string;
  const email = formData.get("email");
  const age = formData.get("age") as string;
  const phone_number = formData.get("phone_number");
  const address = formData.get("address");

  const SlBam = 10;
  const hashedPassword = await bcrypt.hash(password, SlBam);

  try {
    // Tạo người dùng mới
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        age: age ? parseInt(age, 10) : null,
        phone_number,
        address,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const newAdminToUser = await prisma.admin_to_user.create({
      data: {
        adminId: userSessionInfo ,
        userId: newUser.id,  
      },
    });
	revalidatePath("/");

    return { newUser, newAdminToUser };

  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
}
