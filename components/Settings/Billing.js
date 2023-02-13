import { useState } from 'react';

import Badge from 'components/Badge';
import Loader from 'components/Loader';
import { BasicFeatureList } from 'components/Plans/Basic';
import { PremiumFeatureList } from 'components/Plans/Premium';
import { showToast } from 'components/Toast';

import { formatCurrency } from 'utils/formatter';

import { paymentOptions, tiers } from 'constants/index';

const checkoutUrl =
	'https://gokulkrishh.lemonsqueezy.com/checkout/buy/46fa70e1-32ef-4689-aa2d-468f8cc62cf2?embed=1&desc=0&discount=0';

export default function Billing({ user }) {
	const [loading, setLoading] = useState(false);

	return (
		<div className="mt-8 mb-2 flex w-full flex-col justify-center md:flex-row">
			<div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:gap-10 md:mt-0 lg:grid-cols-2">
				<div className={`rounded-lg bg-white p-5 text-left shadow ${user.isBasicPlan ? 'border-blue-700' : ''}`}>
					<div className="relative flex items-center justify-between">
						<h3 className="mb-1 flex items-center text-xl font-extrabold leading-6 text-black ">
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
							className={`mt-12 flex w-full justify-center rounded-md bg-zinc-500 py-2 text-center text-sm font-semibold text-white hover:bg-zinc-500`}
						>
							{user.isBasicPlan ? 'Current plan' : 'Expired'}
						</button>
					</div>
				</div>

				<div className={`rounded-lg bg-white p-5 text-left shadow ${user.isPremiumPlan ? 'border-blue-700' : ''}`}>
					<div className="relative flex items-center justify-between">
						<h3 className="mb-1 flex items-center text-xl font-extrabold leading-6 text-black">
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
									setLoading(true);
									window.LemonSqueezy?.Url?.Open?.(checkoutUrl);
									setTimeout(() => setLoading(false));
								}
							}}
							disabled={(user.isPremiumPlan && !user.isPremiumPlanEnded) || loading}
							className={`mt-12 flex w-full justify-center rounded-md py-2 text-center text-sm font-semibold text-white ${
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
