import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const res = NextResponse.next();

	const supabase = createMiddlewareSupabaseClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return NextResponse.json({ message: 'Unauthorized' });
	}

	return res;
}

export const config = {
	matcher: ['/api/subscriptions/:path*', '/api/users/:path*'],
};
