import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import messages from 'constants/messages';

export const checkAuth = async (callback: Function) => {
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getUser();
	const { user } = data;
	if (user) {
		return callback(user);
	} else {
		return NextResponse.json({ message: messages.account.unauthorized }, { status: 401 });
	}
};
