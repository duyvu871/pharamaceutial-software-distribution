import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(req: NextRequest) {
	try {
		const userId = (await req.json()).userId;

		if (!userId) {
			return new NextResponse(JSON.stringify({
				message: "user id not found",
			}), {
				status: 401,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const refreshToken = cookies().get('refreshToken')?.value;
		const parsedRefreshToken = refreshToken ? JSON.parse(refreshToken) : null;

		if (!parsedRefreshToken) {
			return new NextResponse(JSON.stringify({
				message: "refresh token not found",
			}), {
				status: 401,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const response = await axios.post('http://localhost:4001/api/v1/auth/refresh', {
			userId: parsedRefreshToken.userId,
			refreshToken: parsedRefreshToken.refreshToken,
		})

		console.log('rf:',response.data);

		return new NextResponse(JSON.stringify({
			message: "refresh token success",
		}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});

	} catch {
			return new NextResponse(JSON.stringify({
				message: "refresh token not found",
			}), {
				status: 401,
				headers: {
					'Content-Type': 'application/json',
				},
			});
	}
}