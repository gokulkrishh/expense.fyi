import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { addYears } from 'date-fns';
import AccountedDeleteEmail from 'emails/account-deleted';

import { checkAuth } from 'lib/auth';
import { Database } from 'lib/database.types';
import resend from 'lib/email';
import prisma from 'lib/prisma';

import messages, { emails } from 'constants/messages';

const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
	{ auth: { persistSession: false } }
);

export async function GET() {
	return await checkAuth(async (user: any) => {
		try {
			const data = await prisma.users.findUnique({
				where: { id: user.id },
				select: {
					currency: true,
					locale: true,
					billing_start_date: true,
					trial_start_date: true,
					order_status: true,
					usage: true,
					email: true,
					plan_status: true,
					new_signup_email: true,
				},
			});
			const isPremiumPlan = data?.order_status === 'paid' && data?.plan_status === 'premium';
			const isPremiumPlanEnded =
				isPremiumPlan && data?.billing_start_date && new Date() > addYears(new Date(data.billing_start_date), 1);
			const isPremium = isPremiumPlan && !isPremiumPlanEnded;

			return NextResponse.json({ ...data, isPremium, isPremiumPlanEnded }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

export async function PATCH(request: NextRequest) {
	const { currency, locale } = await request.json();
	return await checkAuth(async (user: any) => {
		try {
			await prisma.users.update({ data: { currency, locale }, where: { id: user.id } });
			return NextResponse.json('Updated');
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}

export async function POST(request: NextRequest) {
	return await checkAuth(async (user: any) => {
		try {
			const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
			if (error) {
				return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
			}
			await prisma.users.delete({ where: { id: user.id } });
			try {
				await resend.emails.send({
					from: emails.from,
					subject: emails.account.deleted,
					to: user.email,
					react: AccountedDeleteEmail(),
				});
			} catch (error) {
				throw error;
			}
			return NextResponse.json('Deleted');
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
