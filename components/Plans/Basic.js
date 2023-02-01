import Link from 'next/link';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { formatCurrency } from 'utils/formatter';

import { basicPlanUsageLimit, paymentOptions, siteUrls, tiers } from 'constants/index';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
const signUpUrl = isProduction ? siteUrls.signup : siteUrls.localSignup;

export const BasicFeatureList = ({ className = '' }) => {
	return (
		<div className={`mb-0 mt-4 flex flex-col justify-center text-left text-white ${className}`}>
			<span className="m-1 ml-0 flex items-center  text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				Trend visualization with charts
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				<span>Add up to {basicPlanUsageLimit} total entries</span>
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				Track subscription billing dates
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				Choose preferred currency display
			</span>

			<span className="m-1 ml-0 flex items-center text-[15px]">
				<CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" />
				Email support available
			</span>
		</div>
	);
};

export default function Basic() {
	return (
		<div className="min-w-[330px] divide-y divide-zinc-600 rounded-lg bg-zinc-900 text-left shadow-sm sm:mr-8">
			<div className="p-5 py-6">
				<h2 className="text-3xl font-extrabold leading-6 text-white">Basic</h2>
				<p className="font-default mt-2 mb-2 text-zinc-300">Free forever with limits.</p>
				<p className="mt-4">
					<span className="text-3xl font-extrabold text-white">
						{formatCurrency(tiers.monthly.basic, paymentOptions.currency, paymentOptions.locale, 0, 0)}
					</span>
					<span className="text-base  text-zinc-100">{' / month'}</span>
				</p>

				<BasicFeatureList />

				<Link
					href={signUpUrl}
					className="mt-10 block w-full rounded-md bg-white py-2 text-center text-sm font-semibold text-black hover:bg-gray-200"
				>
					Start for free
				</Link>
			</div>
		</div>
	);
}
