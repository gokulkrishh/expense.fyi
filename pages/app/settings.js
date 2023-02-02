import Head from 'next/head';
import Script from 'next/script';

import { useState } from 'react';

import enforceAuth from 'components/Auth/enforceAuth';
import Badge from 'components/Badge';
import Loader from 'components/Loader';
import { BasicFeatureList } from 'components/Plans/Basic';
import { PremiumFeatureList } from 'components/Plans/Premium';
import Usage from 'components/Plans/Usage';
import { showErrorToast, showSuccessToast, showToast } from 'components/Toast';

import { makePayment } from 'lib/razorpay';

import { formatCurrency } from 'utils/formatter';

import { paymentOptions, tierNames, tiers } from 'constants/index';

import data from 'data/currency.json';

const { premium, basic } = tierNames;

const menuIds = { account: 'general', billing: 'billing', usage: 'usage' };

const menuLinks = [
	{
		name: 'General',
		id: menuIds.general,
		description: 'Manage your general details here.',
	},
	{
		name: 'Usage',
		id: menuIds.usage,
		description: 'Know your usage related details are here.',
	},
	{
		name: 'Billing',
		id: menuIds.billing,
		description: 'Manage your billing information here.',
	},
];

const payment = {
	amount: tiers.yearly.premium,
	currency: paymentOptions.currency,
};

export default function Settings({ user }) {
	const [loading, setLoading] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState(menuLinks[0]);
	const [currencyData, setCurrencyData] = useState({ currency: user.currency, locale: user.locale });

	const onUpdate = async (data) => {
		const { currency, locale } = data;
		try {
			const res = await fetch('/api/user/update', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ currency, locale }),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			showSuccessToast('Your currency has been changed!');
			setCurrencyData(data);
		} catch (error) {
			showErrorToast(error.message);
		}
	};

	const isSelectedMenuGeneral = selectedMenu.id === menuIds.general;
	const isSelectedMenuBilling = selectedMenu.id === menuIds.billing;
	const isSelectedMenuUsage = selectedMenu.id === menuIds.usage;

	return (
		<>
			<Head>
				<title>Expense.fyi - Settings</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<Script src="https://checkout.razorpay.com/v1/checkout.js" async />

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-3 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Settings</h1>
				</div>

				{/* {`${selectedMenu.id === menu.id ? 'border-blue-700 text-blue-700' : 'border-white'}`} */}

				<div className="border-gray-250 flex border-b pb-2 text-sm font-normal text-zinc-600">
					{menuLinks.map((menu) => {
						return (
							<>
								<button
									key={menu.id}
									onClick={() => setSelectedMenu(menu)}
									className={`relative mr-4 rounded-md px-2 py-1.5 text-black hover:bg-gray-200`}
								>
									{menu.name}

									<span
										className={`absolute bottom-[-10px] left-0 right-0 inline-block w-full border-b-2 ${
											selectedMenu.id === menu.id ? 'border-blue-600' : 'border-b-0 border-gray-300'
										}`}
									/>
								</button>
							</>
						);
					})}
				</div>

				<div className="mt-6 mb-10 flex w-full flex-col md:flex-row">
					<div className="mr-2 md:min-w-[300px]">
						<h2 className="text-xl text-black">{selectedMenu.name}</h2>
						<p className="mt-1 mb-1 text-sm">{selectedMenu.description}</p>
					</div>
					{isSelectedMenuUsage ? (
						<Usage user={user} usageLimit={user.isPremiumPlan ? premium.usageLimit : basic.usageLimit} />
					) : null}
					{isSelectedMenuGeneral ? (
						<div className="mt-4 flex">
							<label className="block">
								<span className="block text-sm font-normal text-zinc-600">Currency and Language</span>
								<div className="flex flex-col sm:flex-row">
									<select
										name="Currency and Locale"
										className="mt-2 block h-9 w-full max-w-xs appearance-none rounded-md bg-white py-2 px-3 pr-8 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
										onChange={(event) => {
											const [currency, locale] = event.target.value.split('-');
											onUpdate({ currency, locale });
										}}
										value={`${currencyData.currency}-${currencyData.locale}`}
									>
										{Object.keys(data).map((key) => {
											const { languages = [], currency } = data[key];
											const [currencyCode] = currency;

											return languages.map((language) => (
												<option key={language} value={`${currencyCode}-${language}`}>
													{data[key].name} - {language}
												</option>
											));
										})}
									</select>
									<span className="ml-0 mt-3 text-sm sm:mt-4 sm:ml-6">
										Eg:{' '}
										<span className="font-medium text-orange-600">
											{formatCurrency(100, user.currency, user.locale)}{' '}
										</span>
									</span>
								</div>
							</label>
						</div>
					) : null}

					{isSelectedMenuBilling ? (
						<div className="mt-0 mb-2 flex w-full flex-col md:flex-row">
							<div className="mt-4 grid w-full max-w-3xl grid-cols-1 gap-3 sm:gap-10 md:mt-0 lg:grid-cols-2">
								<div
									className={`rounded-lg border-[1px] bg-white p-4 text-left ${
										user.isBasicPlan ? 'border-blue-700' : ''
									}`}
								>
									<div className="relative flex items-center justify-between">
										<h3 className="mb-1 flex items-center text-2xl font-extrabold leading-6 text-black ">
											Basic{' '}
											{user.isBasicPlan ? (
												<Badge
													className="absolute right-[-10px] bg-blue-700 leading-[1.6] text-white"
													text={'Current'}
												/>
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
									className={`rounded-lg border-[1px] bg-white p-4 text-left ${
										user.isPremiumPlan ? 'border-blue-700' : ''
									}`}
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
													// makePayment({ ...payment, email: user.email, plan_status: user.plan_status });
													// setTimeout(() => {
													// 	setLoading(false);
													// }, 4000);
													showToast(`Payments are coming soon.`);
												}
											}}
											disabled={(user.isPremiumPlan && !user.isPremiumPlanEnded) || loading}
											className={`mt-10 flex w-full justify-center rounded-md py-2 text-center text-sm font-semibold text-white ${
												user.isPremiumPlan && !user.isPremiumPlanEnded
													? 'bg-zinc-500 hover:bg-zinc-500'
													: 'bg-zinc-900 hover:bg-zinc-800'
											}`}
										>
											{loading ? (
												<Loader />
											) : user.isBasicPlan || user.isPremiumPlanEnded ? (
												'Upgrade plan'
											) : (
												'Current plan'
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
