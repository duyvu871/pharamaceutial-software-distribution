import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { CookieAccessToken } from '@type/token.ts';
import { ExternalLoginAPIResponse } from '@type/api/auth.ts';

export async function POST(req: NextRequest) {
	const incomingBody = await req.json() as { username: string, password: string };

	try {
		const login = await axios.post<ExternalLoginAPIResponse>('http://localhost:4001/api/v1/login', {
			username: incomingBody.username,
			password: incomingBody.password
		});

		console.log('login', login.data);

		if (login.status !== 200) {
			return new NextResponse(JSON.stringify(login.data), {
				status: login.status,
				headers: {
					'Content-Type': 'application/json',
				}
			});
		}

		const accessToken = login.data.accessToken;
		const response = login.data.user as {
			id: string,
			username: string,
			email: string,
			age: number,
			phone_number: string,
		};

		if (accessToken) {
			const cookieSet: CookieAccessToken = {
				userId: response.id,
				accessToken: {
					access_token: accessToken.token,
					expire_access_token: accessToken.expire_access_token,
					token_type: accessToken.token_type,
					refresh_token: accessToken.refresh_token,
					expire_refresh_token: accessToken.expire_refresh_token,
				}
			}
			cookies().set('accessToken', JSON.stringify(cookieSet), {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 1 week
			});
		}

		return new NextResponse(JSON.stringify(response), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error: any) {
		console.log('error', error);
		return new NextResponse(JSON.stringify({
			message: "Internal Server Error"

		}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			}
		});
	}
}