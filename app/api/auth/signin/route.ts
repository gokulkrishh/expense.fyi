import { NextRequest, NextResponse } from 'next/server';

import messages, { emails } from '@/constants/messages';
import SignInEmail from '@/emails/signin';
import resend from '@/lib/email';
import prisma from '@/lib/prisma';
import { getRedirectUrl } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
	{
		auth: {
			persistSession: false,
		},
	}
);

export async function POST(request: NextRequest) {
	const { email } = await request.json();
	const user = await prisma.users.findFirst({ where: { email }, select: { email: true } });
	if (user) {
		try {
			const { data, error } = await supabaseAdmin.auth.admin.generateLink({
				type: 'magiclink',
				email,
				options: { redirectTo: getRedirectUrl() },
			});

			if (error) {
				throw error;
			}

			const { properties } = data;
			const { action_link } = properties;

			try {
				await resend.sendEmail({
					from: emails.from,
					subject: emails.signin.subject,
					to: email,
					react: SignInEmail({ action_link }),
				});
				return NextResponse.json({ message: emails.sent });
			} catch (err: any) {
				throw err;
			}
		} catch (error: any) {
			return NextResponse.json({ message: String(error) || messages.error }, { status: 500 });
		}
	} else {
		return NextResponse.json({ message: messages.account.doesntexist }, { status: 404 });
	}
}
