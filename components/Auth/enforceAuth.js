import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import WelcomeEmail from 'emails/WelcomeEmail';

import resend from 'lib/email';
import prisma from 'lib/prisma';
import { hasPremiumBillingCycleEnded } from 'lib/usage';

import { sentFromEmailId, tierNames } from 'constants/index';

export default function enforceAuth(req, res) {
	return async (context) => {
		const supabase = createServerSupabaseClient(context);

		// Get auth table info
		const { data } = await supabase.auth.getSession();
		const { session } = data;

		if (!session) {
			return {
				redirect: { destination: '/signin', permanent: true },
			};
		}

		// Get public user table info
		const serializedUserData = JSON.parse(
			JSON.stringify(
				await prisma.users.findUnique({
					where: { id: session.user.id },
					select: {
						currency: true,
						locale: true,
						billing_start_date: true,
						trial_start_date: true,
						usage: true,
						email: true,
						plan_status: true,
						new_signup_email: true,
					},
				})
			)
		);

		// If its new signup, send welcome email once and update bool
		if (!serializedUserData.new_signup_email) {
			try {
				await resend.sendEmail({
					from: sentFromEmailId,
					subject: '✨ Welcome to Expense.fyi',
					to: session.user.email,
					react: <WelcomeEmail />,
				});
				await prisma.users.update({ where: { id: session.user.id }, data: { new_signup_email: true } });
			} catch (error) {
				throw error;
			}
		}

		const isBasicPlan = serializedUserData.plan_status === tierNames.basic.key;
		const isPremiumPlan = serializedUserData.plan_status === tierNames.premium.key;
		const isPremiumPlanEnded = isPremiumPlan && hasPremiumBillingCycleEnded(serializedUserData.billing_start_date);

		return {
			props: {
				initialSession: session,
				user: {
					...serializedUserData,
					isBasicPlan,
					isPremiumPlan,
					isPremiumPlanEnded,
				},
			},
		};
	};
}
