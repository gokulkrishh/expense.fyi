import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import PlanExpiredEmail from 'emails/PlanExpiredEmail';
import UsageExceededEmail from 'emails/UsageExceededEmail';

import { toastMessages } from 'components/Toast';

import resend from 'lib/email';
import prisma from 'lib/prisma';

import { basicPlanUsageLimit, premiumPlanUsageLimit, sentFromEmailId, tierNames } from 'constants/index';

import { hasBasicUsageLimitReached, hasPremiumBillingCycleEnded, hasPremiumUsageLimitReached } from './usage';

const userSelect = {
	usage: true,
	billing_start_date: true,
	plan_status: true,
	basic_usage_limit_email: true,
	premium_usage_limit_email: true,
	premium_plan_expired_email: true,
};

const defaultOptions = { allow: false };

export const withUserAuth = (handler, options = defaultOptions) => {
	return async (req, res) => {
		const supabaseServerClient = createServerSupabaseClient({ req, res });
		const { data } = await supabaseServerClient.auth.getUser();
		const { user } = data;

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized request' });
		}

		// To get data from public user table
		const userData = await prisma.users.findUnique({ where: { id: user.id }, select: userSelect });

		const {
			billing_start_date,
			plan_status,
			usage,
			basic_usage_limit_email,
			premium_usage_limit_email,
			premium_plan_expired_email,
		} = JSON.parse(JSON.stringify(userData));

		const isBasicPlan = plan_status === tierNames.basic.key;
		const isPremiumPlan = plan_status === tierNames.premium.key;
		const hasBasicPlanLimitReached = isBasicPlan && hasBasicUsageLimitReached(usage);
		const hasPremiumPlanExpired = isPremiumPlan && hasPremiumBillingCycleEnded(billing_start_date);
		const hasPremiumPlanLimitReached = !hasPremiumPlanExpired && hasPremiumUsageLimitReached(usage);

		if (options.allow) {
			return handler(req, res, user);
		}

		if (hasBasicPlanLimitReached && req.method !== 'GET') {
			if (!basic_usage_limit_email) {
				try {
					await resend.sendEmail({
						from: sentFromEmailId,
						subject: 'Your Basic Plan usage exceeded!',
						to: user.email,
						react: (
							<UsageExceeded limit={basicPlanUsageLimit} maxUsageLimit={premiumPlanUsageLimit} plan="Basic Plan" />
						),
					});
					await prisma.users.update({ where: { id: user.id }, data: { basic_usage_limit_email: true } });
				} catch (error) {
					return res.status(500).json({ message: toastMessages.error });
				}
			}
			return res.status(403).json({ message: 'Your basic plan limit is reached, upgrade to premium plan.' });
		}

		if (hasPremiumPlanExpired && req.method !== 'GET') {
			if (!premium_plan_expired_email) {
				try {
					await resend.sendEmail({
						from: sentFromEmailId,
						subject: 'Your Premium Plan Expired!',
						to: user.email,
						react: <PlanExpiredEmail />,
					});
					await prisma.users.update({ where: { id: user.id }, data: { premium_plan_expired_email: true } });
				} catch (error) {
					return res.status(500).json({ message: toastMessages.error });
				}
			}
			return res.status(403).json({ message: 'Your premium plan has expired, renew to continue.' });
		}

		if (hasPremiumPlanLimitReached && req.method !== 'GET') {
			if (!premium_usage_limit_email) {
				try {
					await resend.sendEmail({
						from: sentFromEmailId,
						subject: 'Your Premium Plan usage exceeded!',
						to: user.email,
						react: (
							<UsageExceededEmail
								limit={premiumPlanUsageLimit}
								maxUsageLimit={premiumPlanUsageLimit}
								plan="Premium Plan"
							/>
						),
					});
					await prisma.users.update({ where: { id: user.id }, data: { premium_usage_limit_email: true } });
				} catch (error) {
					return res.status(500).json({ message: toastMessages.error });
				}
			}
			return res.status(403).json({ message: 'Your premium plan limit is reached, renew again to continue.' });
		}

		return handler(req, res, user);
	};
};
