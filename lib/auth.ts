import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

import messages from 'constants/messages';

export const checkAuth = async (callback: Function) => {
	const supabase = createServerActionClient({ cookies });
	const { data } = await supabase.auth.getSession();
	const { session } = data;

	if (session && session.user) {
		return callback(session.user);
	} else {
		return NextResponse.json({ message: messages.account.unauthorized }, { status: 401 });
	}
};
