import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { addYears } from 'date-fns';
import PlanExpiredEmail from 'emails/plan-expired';
import UsageExceededEmail from 'emails/usage-limit-exceeded';

import messages, { emails } from 'constants/messages';
import { basicPlan, premiumPlan } from 'constants/usage';

import resend from './email';
import prisma from './prisma';

type UserData = {
	email: string;
	basic_usage_limit_email: boolean;
	premium_usage_limit_email: boolean;
	premium_plan_expired_email: boolean;
};

const hasPremiumPlanExpired = (billingCycleData: string) => {
	const todayDate = new Date();
	const endDateForBilling = addYears(new Date(billingCycleData), 1);
	return todayDate > endDateForBilling;
};

const getUserUsageLimit = (user: any) => {
	const { billing_start_date, plan_status, usage, order_status } = user;

	const isBasicUsageExceeded = plan_status === 'basic' && usage + 1 > basicPlan.limit;
	const isPremium = plan_status === 'premium' && order_status === 'paid';
	const isPremiumUsageExceeded = isPremium && usage + 1 > premiumPlan.limit;
	const isPremiumPlanExpired = isPremium && hasPremiumPlanExpired(billing_start_date);

	return { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired };
};

export const checkAuth = async (callback: Function, isGetMethod = true) => {
	const supabase = createServerActionClient({ cookies });
	const { data } = await supabase.auth.getSession();
	const { session } = data;

	if (session && session.user) {
		const user = await prisma.users.findUnique({ where: { id: session.user.id } });
		const { basic_usage_limit_email, premium_usage_limit_email, premium_plan_expired_email } = user as UserData;
		const { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired } = getUserUsageLimit(user);

		if (isBasicUsageExceeded && !isGetMethod && user) {
			if (!basic_usage_limit_email) {
				try {
					await resend.emails.send({
						from: emails.from,
						subject: emails.usageLimit.basic.subject,
						to: user.email,
						react: UsageExceededEmail({ maxUsageLimit: basicPlan.limit }),
					});
					await prisma.users.update({ where: { id: user?.id }, data: { basic_usage_limit_email: true } });
				} catch (error) {
					return NextResponse.json({ message: messages.serverError }, { status: 401 });
				}
			}
			return NextResponse.json({ message: emails.usageLimit.basic.message }, { status: 403 });
		}

		if (isPremiumPlanExpired && !isGetMethod && user) {
			if (!premium_plan_expired_email) {
				try {
					await resend.emails.send({
						from: emails.from,
						subject: emails.usageLimit.premiumExpired.subject,
						to: user.email,
						react: PlanExpiredEmail({ plan: 'Premium Plan' }),
					});
					await prisma.users.update({ where: { id: user?.id }, data: { premium_plan_expired_email: true } });
				} catch (error) {
					return NextResponse.json({ message: messages.serverError }, { status: 401 });
				}
			}
			return NextResponse.json({ message: emails.usageLimit.premiumExpired.message }, { status: 403 });
		}

		if (isPremiumUsageExceeded && !isGetMethod && user) {
			if (!premium_usage_limit_email) {
				try {
					await resend.emails.send({
						from: emails.from,
						subject: emails.usageLimit.premium.subject,
						to: user.email,
						react: UsageExceededEmail({ maxUsageLimit: premiumPlan.limit, plan: 'Premium Plan' }),
					});
					await prisma.users.update({ where: { id: user?.id }, data: { premium_usage_limit_email: true } });
				} catch (error) {
					return NextResponse.json({ message: messages.serverError }, { status: 401 });
				}
			}
			return NextResponse.json({ message: emails.usageLimit.premium.message }, { status: 403 });
		}
		return callback(session.user);
	} else {
		return NextResponse.json({ message: messages.account.unauthorized }, { status: 401 });
	}
};
