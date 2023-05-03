import { useState } from 'react';

import { showErrorToast, showSuccessToast } from 'components/Toast';

import { formatCurrency } from 'utils/formatter';

import data from 'data/currency.json';

export default function General({ user }) {
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

			showSuccessToast('Currency is updated!');
			setCurrencyData(data);
		} catch (error) {
			showErrorToast(error.message);
		}
	};

	return (
		<div className="mb-8 mt-4 w-full max-w-2xl rounded-lg bg-white p-3 text-left shadow shadow-gray-200 md:mt-0">
			<h3 className="p-3 py-3 text-xl font-extrabold leading-6 text-black">Account</h3>
			<div className="mx-2 border-b-[1px] border-zinc-200 px-3 py-1" />
			<div className="mt-2 grid gap-6 p-3 sm:grid-cols-2">
				<label className="block">
					<span className="block text-sm font-semibold text-zinc-600">Email</span>
					<div className="flex flex-col sm:flex-row">
						<input
							className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 focus:outline-none  disabled:cursor-not-allowed disabled:bg-slate-50 disabled:shadow-none"
							type="email"
							defaultValue={user.email}
							disabled
						/>
					</div>
				</label>
				<label className="block">
					<span className="block text-sm font-semibold text-zinc-600">Currency</span>
					<div className="flex flex-col sm:flex-row">
						<select
							name="currency"
							className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 py-2 pr-8 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:shadow-none"
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
					</div>
					<span className="mt-[8px] inline-block text-sm">
						Eg:{' '}
						<span className="font-medium text-orange-600">
							{formatCurrency(100, currencyData.currency, currencyData.locale)}
						</span>
					</span>
				</label>
			</div>
		</div>
	);
}
