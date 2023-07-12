'use client';

import { addYears, format } from 'date-fns';

import { useUser } from 'components/context/auth-provider';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import { Label } from 'components/ui/label';
import { Progress } from 'components/ui/progress';

import { formatDate } from 'lib/formatter';

import { dateFormat } from 'constants/date';
import { basicPlan, premiumPlan } from 'constants/usage';

export default function Usage() {
	const user = useUser();
	const { usage, locale, isPremium, isPremiumPlanEnded } = user;
	const usageLimit = isPremium ? premiumPlan.limit : basicPlan.limit;
	return (
		<Card className="w-full">
			<CardHeader>
				<h2 className="font-semibold text-primary dark:text-white">Usage</h2>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<Label className="mb-3 block" htmlFor="email">
						Entries Added
						<p className="mt-2 text-sm tabular-nums text-muted-foreground">
							{usage} of {usageLimit}
						</p>
					</Label>
					<p className="text-sm tabular-nums text-muted-foreground">{usageLimit - usage} entries left</p>
				</div>
				<Progress value={(usage / usageLimit) * 100} />
				<div className="mt-3 text-muted-foreground">
					{isPremium && !isPremiumPlanEnded ? (
						<p className="text-sm">
							Next billing at:{' '}
							{formatDate({ date: format(addYears(new Date(user.billing_start_date), 1), dateFormat), locale })}
						</p>
					) : null}

					{isPremiumPlanEnded ? <p className="text-sm">Premium plan ended, renew again.</p> : null}
				</div>
			</CardContent>
		</Card>
	);
}
