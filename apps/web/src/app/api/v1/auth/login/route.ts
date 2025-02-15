import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { CookieAccessToken, CookieRefreshToken } from '@type/token.ts';
import { ExternalLoginAPIResponse } from '@type/api/auth.ts';

export async function POST(req: NextRequest) {
	const incomingBody = await req.json() as { username: string, password: string, role: string };

	try {
		const login = await axios.post<ExternalLoginAPIResponse>('http://localhost:4001/api/v1/auth/login', {
			username: incomingBody.username,
			password: incomingBody.password,
			type: incomingBody.role,
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
			const accessCookieSet: CookieAccessToken = {
				userId: response.id,
				accessToken: {
					access_token: accessToken.token,
					expire_access_token: accessToken.expire_access_token,
					token_type: accessToken.token_type,
					// refresh_token: accessToken.refresh_token,
					// expire_refresh_token: accessToken.expire_refresh_token,
				}
			}
			const refreshCookieSet: CookieRefreshToken = {
				userId: response.id,
				refreshToken: {
					refresh_token: accessToken.refresh_token,
					expire_refresh_token: accessToken.expire_refresh_token,
					token_type: accessToken.token_type,
				}
			}

			cookies().set('refreshToken', JSON.stringify(refreshCookieSet), {
				// httpOnly: true,
				// secure: true,
				sameSite: 'lax', // lax stand for "same-site cookie" is the most secure
				expires: new Date(accessToken.expire_refresh_token),
				maxAge: accessToken.expire_refresh_token || 60 * 60 * 24 * 30, // 30 days
			});

			cookies().set('accessToken', JSON.stringify(accessCookieSet), {
				// httpOnly: true,
				// secure: true,
				sameSite: 'lax', // lax is default, is
				expires: new Date(accessToken.expire_access_token),
				maxAge: accessToken.expire_access_token || 60 * 60 * 24, // 1 day
			});
		}

		return new NextResponse(JSON.stringify({
			status: 200,
			message: "Login success",
			data: {
				...response,
				role: incomingBody.role,
			},
		}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error: any) {
		console.log('error', error.message, error.response.data);
		if (error instanceof AxiosError) {
			return new NextResponse(JSON.stringify(error.response?.data), {
				status: error?.status || 500,
				headers: {
					'Content-Type': 'application/json',
				}
			});
		}
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