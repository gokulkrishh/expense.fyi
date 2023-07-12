// Multi tenent domain: https://vercel.com/guides/nextjs-multi-tenant-application
import { NextResponse } from 'next/server';

import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { siteUrls } from 'constants/index';

export async function middleware(req) {
	const res = NextResponse.next();
	const url = req.nextUrl;

	// Get hostname of request (e.g. app.expense.fyi, app.localhost:3000)
	const hostname = req.headers.get('host') || siteUrls.app;

	// Get the pathname of the request (e.g. /, /home)
	const path = url.pathname;

	// Check user authenticated
	const supabase = createMiddlewareSupabaseClient({ req, res });
	const { data } = await supabase.auth.getSession();
	const { session } = data;

	const currentHost =
		process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
			? hostname.replace(siteUrls.subdomain, '')
			: hostname.replace(siteUrls.subdomainLocal, '');

	// rewrites for app pages
	if (currentHost === 'app') {
		if ((url.pathname === '/signin' || url.pathname === '/signup') && session) {
			url.pathname = '/';
			return NextResponse.redirect(url);
		}

		url.pathname = `/app${url.pathname}`;
		return NextResponse.rewrite(url);
	}

	// rewrite root application to `/home` folder
	if (hostname === siteUrls.local || hostname === siteUrls.home) {
		return NextResponse.rewrite(new URL(`/home${path}`, req.url));
	}
}

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /_next/ (Next.js internals)
		 * 3. /static (inside /public)
		 * 4. /_vercel (Vercel internals)
		 * 5. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|_proxy/|_auth/|_root/|static/|_vercel|[\\w-]+\\.\\w+).*)',
	],
};
