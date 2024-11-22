import { NextRequest, NextResponse } from 'next/server';
import { paths } from '@route/path.ts';
import { cookies } from 'next/headers';
// import { decrypt } from '@lib/session.ts';

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']
const loginUrl = process.env.BASE_HOST + "/login";

export async function middleware(req: NextRequest) {

	const url = new URL(req.url);
	const origin = url.origin;
	const pathname = url.pathname;
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
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);


	const cookie = cookies().get('accessToken')?.value;
	// console.log("cookie", cookie);
	const parsedCookie = cookie ? JSON.parse(cookie) : null;

	if (isProtectedRoute && !parsedCookie?.userId) {
		return NextResponse.redirect(new URL('/login', req.nextUrl))
	}

	if (
		isPublicRoute &&
		parsedCookie?.userI &&
		!req.nextUrl.pathname.startsWith('/dashboard')
	) {
		return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
	}

	if (!cookie) {
		return isPublicRoute
			? NextResponse.next(initialRequest)
			: NextResponse.redirect(new URL(paths.auth.login, req.nextUrl));
	}
	const urlIsSignIn = req.nextUrl.pathname === paths.auth.login;
	// console.log('login url', loginUrl);

	if (cookie) {
		return urlIsSignIn
			? NextResponse.redirect(new URL(paths.auth.login, req.nextUrl))
			: NextResponse.next(initialRequest);
	} else {
		return urlIsSignIn
			? NextResponse.next(initialRequest)
			: NextResponse.redirect(new URL(paths.auth.login, req.nextUrl));
	}
}
