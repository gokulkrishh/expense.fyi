import Link from 'next/link';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { formatCurrency } from 'utils/formatter';

import { paymentOptions, premiumPlanUsageLimit, siteUrls, tiers } from 'constants/index';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
const signUpUrl = isProduction ? siteUrls.signup : siteUrls.localSignup;

export const PremiumFeatureList = ({ className = '' }) => {
	return (
		<div className={`mb-0 ml-1 mt-4 flex flex-col justify-center text-left text-white ${className}`}>
			<span className="m-1 ml-0 flex items-center  text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				Everything in Basic plan
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				<span>Add up to {premiumPlanUsageLimit} total entries</span>
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				<span>Advanced trend visualization</span>
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				<span>Export data as CSV</span>
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				<span>Priority support with quick reply</span>
			</span>
		</div>
	);
};

export default function Premium({ subscription = '' }) {
	return (
		<div className="bg-pro-plan mt-8  min-w-[330px] divide-y divide-zinc-600 rounded-lg bg-zinc-900 text-left shadow-sm sm:mt-0">
			<div className="p-5 py-6">
				<h2 className="text-3xl font-extrabold leading-6 text-white">Premium</h2>
				<p className="font-default mt-2 mb-2 text-zinc-300">Access to all premium features.</p>

				<p className="mt-4">
					<span className="inline-flex text-3xl font-extrabold text-white">
						{formatCurrency(tiers.yearly.premium, paymentOptions.currency, paymentOptions.locale, 0, 0)}
					</span>
					<span className="text-base  text-zinc-100">{subscription === 'm' ? ' / month' : ' / year'}</span>
				</p>
				<PremiumFeatureList />

				<Link
					href={signUpUrl}
					className="mt-10 flex w-full justify-center rounded-md bg-white py-2 text-center text-sm font-semibold text-black hover:bg-gray-200"
				>
					Get started
				</Link>
			</div>
		</div>
	);
}
