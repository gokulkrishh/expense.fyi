import { ProgressBar } from '@tremor/react';
import { addYears } from 'date-fns';

import { formatDate } from 'utils/formatter';

export default function Usage({ user, usageLimit }) {
	const { usage, locale, isBasicPlan, isPremiumPlan, isPremiumPlanEnded } = user;
	return (
		<div className="mt-4 w-full max-w-2xl rounded-lg border-[1px] border-zinc-200 bg-white text-left shadow-gray-200 md:mt-0">
			<h3 className="p-3 py-3 pb-0 text-xl font-bold text-black">Usage</h3>
			<div>
				{isBasicPlan ? (
					<p className=" px-3 py-3 pt-1 text-sm text-zinc-600">
						You are currently on <span className="font-semibold text-orange-600">Basic Plan</span> started at{' '}
						<span className="font-semibold text-orange-600">{formatDate(new Date(user.trial_start_date), locale)}</span>
						.
					</p>
				) : null}
				{isPremiumPlan && !isPremiumPlanEnded ? (
					<p className=" px-3 py-3 pt-1 text-sm text-zinc-600">
						You are currently on <span className="font-semibold text-orange-600">Premium Plan</span> started at{' '}
						<span className="font-semibold text-orange-600">
							{formatDate(new Date(user.billing_start_date), locale)}
						</span>{' '}
						and ends at{' '}
						<span className="font-semibold text-orange-600">
							{formatDate(addYears(new Date(user.billing_start_date), 1), locale)}
						</span>
						.
					</p>
				) : null}

				{isPremiumPlan && isPremiumPlanEnded ? (
					<p className=" px-3 py-3 pt-1 text-sm text-zinc-600">
						Your <span className="font-semibold text-orange-600">Premium Plan</span> ended at{' '}
						<span className="font-semibold text-orange-600">
							{formatDate(addYears(new Date(user.billing_start_date), 1), locale)}
						</span>
						. Renew to continue enjoy the premium features.
					</p>
				) : null}
			</div>
			<div className="border-b-[1px] border-zinc-200 py-[2px]" />
			<div className="p-3 py-3 text-sm text-black">
				<p className="mt-0 text-base font-medium text-black">Entries added</p>
				<p className="mt-2 mb-2 inline-block text-sm">
					{usage} / {usageLimit}
				</p>
				<ProgressBar percentageValue={(usage / usageLimit) * 100} showAnimation={true} color="blue" marginTop="mt-1" />
				<p className="mt-2 mb-1 text-[13px] text-zinc-600">{usageLimit - usage} entries left</p>
			</div>
		</div>
	);
}
