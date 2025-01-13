import { NextRequest, NextResponse } from 'next/server';
import { paths } from '@route/path.ts';
import { cookies } from 'next/headers';
import { parseJson } from '@util/parse-json.ts';
import { CookieAccessToken } from '@type/token.ts';
// import { decrypt } from '@lib/session.ts';

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // Match all routes except /api
}

const protectedRoutes = ['/dashboard', '/admin/dashboard'];
const publicRoutes = ['/login', '/signup', '/admin/login'];

export async function middleware(req: NextRequest) {
	let loginUrl = process.env.BASE_HOST + "/login";
	let dashboardUrl = process.env.BASE_HOST + "/dashboard";
	let isAdminPath = false;

	const url = new URL(req.url);
	const origin = url.origin;
	const pathname = url.pathname;

	if (pathname.startsWith('/admin')) {
		isAdminPath = true;
		loginUrl = process.env.BASE_HOST + "/admin/login";
		dashboardUrl = process.env.BASE_HOST + "/admin/dashboard";
	}

	const requestHeaders = new Headers(req.headers);
	requestHeaders.set("x-url", req.url);
	requestHeaders.set("x-origin", origin);
	requestHeaders.set("x-pathname", pathname);

	const initialRequest = {
		request: {
			headers: requestHeaders,
		},
	}

	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))// protectedRoutes.includes(path);
	const isPublicRoute = !isProtectedRoute//publicRoutes.includes(path);

	if (isPublicRoute) {
		return NextResponse.next(initialRequest);
	}

	const cookie = cookies().get('accessToken')?.value;
	// const refreshToken = cookies().get('refreshToken')?.value;
	// console.log("cookie", cookie);
	if (isProtectedRoute && !cookie) {
		return NextResponse.redirect(loginUrl);
	}
	const parsedCookie = parseJson<CookieAccessToken>(cookie || '');
	// const parsedRefreshToken = parseJson(refreshToken || '');
	// console.log('url', new URL(paths.auth.login, req.nextUrl).href);
	// console.log('nextUrl', req.nextUrl.href);
	if (isProtectedRoute && !parsedCookie?.userId) {
		return NextResponse.redirect(loginUrl);
	}

	if (
		isPublicRoute &&
		parsedCookie?.userId &&
		!req.nextUrl.pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(dashboardUrl);
	}

	console.log('isProtectedRoute', isProtectedRoute);
	console.log('isPublicRoute', isPublicRoute);
	// if (!cookie) {
	// 	return isPublicRoute
	// 		? NextResponse.next(initialRequest)
	// 		: NextResponse.redirect(new URL('/login', req.nextUrl));
	// }

	return NextResponse.next(initialRequest);
}
