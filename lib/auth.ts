import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextFetchEvent } from 'next/server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import messages from 'constants/messages';

export const checkAuth = async () => {
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getUser();
	const { user = { email: '', id: '' } } = data;

	if (!user) {
		return NextResponse.json({ message: messages.account.unauthorized }, { status: 401 });
	}

	return user;
};
