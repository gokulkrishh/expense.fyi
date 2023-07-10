import { NextRequest, NextResponse } from 'next/server';

import { addYears } from 'date-fns';
import WelcomeEmail from 'emails/welcome';

import { checkAuth } from 'lib/auth';
import resend from 'lib/email';
import prisma from 'lib/prisma';

import messages, { emails } from 'constants/messages';

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
			const isPremium = data?.order_status === 'paid' && data?.plan_status === 'premium';
			const isPremiumPlanEnded =
				isPremium && data?.billing_start_date && new Date() > addYears(new Date(data.billing_start_date), 1);

			if (!data?.new_signup_email) {
				try {
					await resend.sendEmail({
						from: emails.from,
						subject: emails.welcome.subject,
						to: user.email,
						react: WelcomeEmail(),
					});
					await prisma.users.update({ where: { id: user.id }, data: { new_signup_email: true } });
				} catch (error) {
					throw error;
				}
			}

			return NextResponse.json({ ...data, isPremium, isPremiumPlanEnded }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ error, message: messages.request.failed }, { status: 500 });
		}
	});
}
