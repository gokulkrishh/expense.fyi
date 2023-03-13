import { ProgressBar } from '@tremor/react';
import { addYears } from 'date-fns';

import { formatDate } from 'utils/formatter';

import { tierNames } from 'constants/index';

const { premium, basic } = tierNames;

export default function Usage({ user }) {
	const { usage, locale, isPremiumPlan, isPremiumPlanEnded } = user;
	const usageLimit = user.isPremiumPlan ? premium.usageLimit : basic.usageLimit;
	return (
		<div className="mt-4 w-full max-w-2xl rounded-lg bg-white p-3 text-left shadow shadow-gray-200 md:mt-0">
			<h3 className="p-3 py-3 text-xl font-extrabold leading-6 text-black">Plan Usage</h3>
			<div className="mx-2 border-b-[1px] border-zinc-200 px-3 py-1" />
			<div className="p-3 py-3 text-sm text-black">
				<div className="flex items-center justify-between">
					<div className="mt-1 mb-2">
						<p className="text-base font-medium text-slate-700">Entries added</p>
						<p className="mt-2 inline-block text-sm">
							{usage} of {usageLimit}
						</p>
					</div>
					<p className="relative top-[15px] text-zinc-600">{usageLimit - usage} entries left</p>
				</div>
				<ProgressBar percentageValue={(usage / usageLimit) * 100} showAnimation={true} color="blue" className="mt-1" />
			</div>
			<div className="p-3 py-0 pb-3 font-medium text-slate-700">
				{isPremiumPlan && !isPremiumPlanEnded ? (
					<p className="text-sm">
						Next billing at: {formatDate(addYears(new Date(user.billing_start_date), 1), locale)}
					</p>
				) : null}

				{isPremiumPlanEnded ? <p className="text-sm">Premium plan ended, renew again.</p> : null}
			</div>
		</div>
	);
}
