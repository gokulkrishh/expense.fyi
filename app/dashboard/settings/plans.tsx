'use client';

import Script from 'next/script';

import { useState } from 'react';

import { format } from 'date-fns';
import { toast } from 'sonner';

import { useUser } from 'components/context/auth-provider';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader } from 'components/ui/card';

import { apiUrls } from 'lib/apiUrls';
import { formatCurrency } from 'lib/formatter';

import { dateFormat } from 'constants/date';
import messages from 'constants/messages';
import { basicPlan, premiumPlan } from 'constants/usage';

declare global {
	interface Window {
		createLemonSqueezy: any;
		LemonSqueezy: {
			Url: {
				Close: () => void;
				Open: (checkoutUrl: string) => void;
			};
			Setup: ({ eventHandler }: { eventHandler: any }) => void;
		};
	}
}

// Docs: https://docs.lemonsqueezy.com/api/orders#the-order-object

const checkoutUrl = `https://expensefyi.lemonsqueezy.com/checkout/buy/${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_ID}?embed=1&media=0&logo=0&desc=0&dark=1`;

const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		className="mr-1.5 h-5 w-5 text-green-600"
	>
		<path
			fillRule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
			clipRule="evenodd"
		></path>
	</svg>
);

export const paymentEvents = { success: 'Checkout.Success', closed: 'PaymentMethodUpdate.Closed' };

export default function Plans() {
	const user = useUser();
	const [loading, setLoading] = useState(false);
	const { isPremium, isPremiumEnded } = user;

	const onSuccess = async ({ order }: { order: any }, close: any) => {
		const { attributes } = order.data;
		try {
			const res = await fetch(apiUrls.user.upgrade, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					billing_start_date: format(new Date(), dateFormat),
					plan_status: premiumPlan.name,
					order_identifier: attributes.identifier,
					order_store_id: String(attributes.store_id),
					order_number: String(attributes.order_number),
					order_status: attributes.status,
				}),
			});
			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			} else {
				toast.success(messages.payments.success);
				setTimeout(() => window.location.reload(), 6000);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const onDismiss = () => {
		toast.info(messages.payments.dismissed);
	};

	const eventHandler = async ({ event, data }: { event: any; data: any }) => {
		if (event === paymentEvents.success && window.LemonSqueezy) {
			await onSuccess(data, window.LemonSqueezy?.Url?.Close);
		} else if (event === paymentEvents.closed) {
			onDismiss();
		}
		return false;
	};

	const setupLemonSqueezy = () => {
		window.createLemonSqueezy?.();
		window.LemonSqueezy?.Setup?.({ eventHandler });
	};

	return (
		<div className="w-full">
			<div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:gap-10 md:mt-0 lg:grid-cols-2">
				<Card className="w-full">
					<CardHeader>
						<h2 className="relative inline-block font-semibold text-primary dark:text-white">
							Basic{' '}
							{!isPremium ? (
								<span className="absolute right-0 top-0 w-fit rounded-full bg-blue-700 px-2 text-xs font-normal leading-[1.6] text-white">
									Active
								</span>
							) : null}
						</h2>
						<p className="text-sm text-muted-foreground">Free forever with limited features.</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center text-lg">
							<span className="inline-flex text-3xl font-extrabold tabular-nums text-primary">
								{formatCurrency({ value: 0, locale: 'en', currency: 'USD' })}
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
								Add up to {basicPlan.limit} entries per account
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
						<Button disabled={true} className="mb-3 mt-3 w-full text-sm" size={'sm'}>
							{!isPremium ? 'Current plan' : 'Expired'}
						</Button>
					</CardContent>
				</Card>
				<Card className="mb-2 mt-3.5 w-full sm:mt-0">
					<CardHeader>
						<h2 className="relative inline-block font-semibold text-primary dark:text-white">
							Premium{' '}
							{isPremium ? (
								<span className="absolute right-0 top-0 w-fit rounded-full bg-blue-700 px-2 text-xs font-normal leading-[1.6] text-white">
									Active
								</span>
							) : null}
						</h2>
						<p className="text-sm text-muted-foreground">Access to all premium features.</p>
					</CardHeader>
					<CardContent>
						<div className="flex items-center text-lg">
							<span className="inline-flex text-3xl font-extrabold tabular-nums text-primary">
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
								Add up to {premiumPlan.limit} entries per account
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
						<Button
							onClick={() => {
								if (!isPremium || isPremiumEnded) {
									setLoading(true);
									window.LemonSqueezy?.Url?.Open?.(checkoutUrl);
									setTimeout(() => setLoading(false));
								}
							}}
							disabled={(isPremium && !isPremiumEnded) || loading}
							className="mb-3 mt-3 w-full text-sm"
							size={'sm'}
						>
							{isPremium ? 'Current plan' : 'Go premium'}
						</Button>
					</CardContent>
				</Card>
			</div>
			<Script src="https://app.lemonsqueezy.com/js/lemon.js" async onLoad={setupLemonSqueezy} />
		</div>
	);
}
