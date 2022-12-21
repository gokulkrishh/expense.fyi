import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const res = NextResponse.next();

	const supabase = createMiddlewareSupabaseClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return NextResponse.redirect(new URL('/api/unauthorized', req.url));
	}

	return res;
}

export const config = {
	matcher: ['/api/subscriptions/:path*', '/api/users/:path*'],
};
