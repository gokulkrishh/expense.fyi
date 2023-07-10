'use client';

import { useUser } from 'components/context/auth-provider';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader } from 'components/ui/card';

import { formatCurrency } from 'lib/formatter';

import { basicPlan, premiumPlan } from 'constants/usage';

const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		className="mr-1.5 h-5 w-5 text-green-600"
	>
		<path
			fill-rule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
			clip-rule="evenodd"
		></path>
	</svg>
);

export default function Plans() {
	const user = useUser();
	return (
		<div className="mt-10 w-full">
			<div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:gap-10 md:mt-0 lg:grid-cols-2">
				<Card className="w-full">
					<CardHeader>
						<h2 className="font-semibold text-primary dark:text-white">Basic</h2>
						<p className="text-sm text-muted-foreground">Free forever with limited features.</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center text-lg">
							<span className="inline-flex text-3xl font-extrabold text-primary">
								{formatCurrency({ value: 0, locale: user.locale, currency: user.currency })}
							</span>
							<span className="ml-[6px] text-base text-primary">per month</span>
						</div>
						<div className="mt-4 flex flex-col justify-center">
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Trend visualisation with charts
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Add up to {basicPlan.limit} total entries
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Track subscription billing dates
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Choose preferred currency display
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Email support available
							</span>
						</div>
						<Button className="mb-3 mt-3 w-full text-sm" size={'sm'}>
							Change plan
						</Button>
					</CardContent>
				</Card>
				<Card className="w-full mt-8 sm:mt-0 mb-2">
					<CardHeader>
						<h2 className="font-semibold text-primary dark:text-white">Premium</h2>
						<p className="text-sm text-muted-foreground">Access to all premium features.</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center text-lg">
							<span className="inline-flex text-3xl font-extrabold text-primary">
								{formatCurrency({ value: 20, locale: 'en', currency: 'USD' })}
							</span>
							<span className="ml-[6px] text-base text-primary">per year</span>
						</div>
						<div className="mt-4 flex flex-col justify-center">
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Everything in Basic plan
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Add up to {premiumPlan.limit} total entries
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Advanced trend visualisation
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Export data as CSV
							</span>
							<span className="mb-3 flex text-sm">
								<CheckIcon />
								Priority support with quick reply
							</span>
						</div>
						<Button className="mb-3 mt-3 w-full text-sm" size={'sm'}>
							Change plan
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
