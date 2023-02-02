import { useState } from 'react';

import Badge from 'components/Badge';
import Loader from 'components/Loader';
import { BasicFeatureList } from 'components/Plans/Basic';
import { PremiumFeatureList } from 'components/Plans/Premium';
import { showToast } from 'components/Toast';

import { makePayment } from 'lib/razorpay';

import { formatCurrency } from 'utils/formatter';

import { paymentOptions, tiers } from 'constants/index';

const paymentData = {
	amount: tiers.yearly.premium,
	currency: paymentOptions.currency,
};

export default function Billing({ user }) {
	const [loading, setLoading] = useState(false);
	return (
		<div className="mt-0 mb-2 flex w-full flex-col md:flex-row">
			<div className="mt-4 grid w-full max-w-3xl grid-cols-1 gap-3 sm:gap-10 md:mt-0 lg:grid-cols-2">
				<div className={`rounded-lg border-[1px] bg-white p-4 text-left ${user.isBasicPlan ? 'border-blue-700' : ''}`}>
					<div className="relative flex items-center justify-between">
						<h3 className="mb-1 flex items-center text-2xl font-extrabold leading-6 text-black ">
							Basic{' '}
							{user.isBasicPlan ? (
								<Badge className="absolute right-[-10px] bg-blue-700 leading-[1.6] text-white" text={'Current'} />
							) : null}
						</h3>
					</div>
					<p className="pb-1 pt-1 text-sm font-medium text-slate-700">Free forever with limited features.</p>
					<div className="mt-3 mb-3">
						<div className="mt-3 mb-4 font-semibold text-slate-900">
							<span className="inline-flex text-3xl font-extrabold text-black">
								{formatCurrency(tiers.yearly.basic, paymentOptions.currency, paymentOptions.locale)}{' '}
							</span>
							<span className="ml-[6px] font-medium text-zinc-600">per month</span>
						</div>
						<BasicFeatureList className="!text-black" />
						<button
							disabled={true}
							title={'Current plan'}
							className={`mt-10 flex w-full justify-center rounded-md bg-zinc-500 py-2 text-center text-sm font-semibold text-white hover:bg-zinc-500`}
						>
							{user.isBasicPlan ? 'Current plan' : 'Expired'}
						</button>
					</div>
				</div>

				<div
					className={`rounded-lg border-[1px] bg-white p-4 text-left ${user.isPremiumPlan ? 'border-blue-700' : ''}`}
				>
					<div className="relative flex items-center justify-between">
						<h3 className="mb-1 flex items-center text-2xl font-extrabold leading-6 text-black">
							Premium{' '}
							{user.isPremiumPlan ? (
								<Badge
									className={`absolute right-[-10px] leading-[1.6] text-white ${
										user.isPremiumPlanEnded ? 'bg-red-400' : 'bg-blue-700'
									} `}
									text={user.isPremiumPlanEnded ? 'Expired' : 'Current'}
								/>
							) : null}
						</h3>
					</div>
					<p className="pb-1 pt-1 text-sm font-medium text-slate-700">Access to all premium features.</p>
					<div className="mt-3 mb-3">
						<div className="mt-3 mb-4 font-semibold text-slate-900">
							<span className="inline-flex text-3xl font-extrabold text-black">
								{formatCurrency(tiers.yearly.premium, paymentOptions.currency, paymentOptions.locale)}{' '}
							</span>
							<span className="ml-[6px] font-medium text-zinc-600">per year</span>
						</div>
						<PremiumFeatureList className="!text-black" />
						<button
							onClick={() => {
								if (user.isBasicPlan || user.isPremiumPlanEnded) {
									// setLoading(true);
									// makePayment({ ...paymentData, email: user.email, plan_status: user.plan_status });
									// setTimeout(() => {
									// 	setLoading(false);
									// }, 4000);
									showToast(`Payment portal is coming soon.`);
								}
							}}
							disabled={(user.isPremiumPlan && !user.isPremiumPlanEnded) || loading}
							className={`mt-10 flex w-full justify-center rounded-md py-2 text-center text-sm font-semibold text-white ${
								user.isPremiumPlan && !user.isPremiumPlanEnded
									? 'bg-zinc-500 hover:bg-zinc-500'
									: 'bg-zinc-900 hover:bg-zinc-800'
							}`}
						>
							{loading ? <Loader /> : user.isBasicPlan || user.isPremiumPlanEnded ? 'Upgrade plan' : 'Current plan'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
