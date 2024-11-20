import { NextRequest, NextResponse } from 'next/server';
import { paths } from '@route/path.ts';

// export const config = {
// 	matcher: ["(?!register|login|$)"],
// };

export async function middleware(req: NextRequest) {
	const cookie = req.cookies.get("accessToken");

	const urlIsSignIn = req.nextUrl.pathname === paths.auth.login;

	if (cookie?.value) {
		return urlIsSignIn
			? NextResponse.redirect(new URL("/", req.url))
			: NextResponse.next();
	} else {
		return urlIsSignIn
			? NextResponse.next()
			: NextResponse.redirect(new URL(paths.auth.login, req.url));
	}
}
