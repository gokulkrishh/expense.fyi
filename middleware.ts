import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import urls from 'constants/url';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const hostname = req.headers.get('host');
	const url = req.nextUrl;

	const currentHost = hostname?.replace(`.${urls.homeWithoutApp}`, '');

	const supabase = createMiddlewareClient({ req, res });
	const { data } = await supabase.auth.getSession();
	const { session } = data;

	if (currentHost === 'app') {
		if (url.pathname === '/signin' || url.pathname === '/signup') {
			if (session) {
				url.pathname = '/';
				return NextResponse.redirect(url);
			}
			return res;
		}

		url.pathname = `/dashboard${url.pathname}`;
		return NextResponse.rewrite(url);
	}

	return res;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
