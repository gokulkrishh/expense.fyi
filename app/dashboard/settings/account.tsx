'use client';

import { Combobox } from 'components/combobox';
import { useUser } from 'components/context/auth-provider';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

import data from 'data/currency.json';

import { updateUser } from './apis';

const currencyData = Object.keys(data)
	.map((key: string) => {
		const { languages = [], currency } = data[key as keyof typeof data];
		const [currencyCode] = currency;
		if (!currencyCode) return false;
		return languages.map((language: any) => ({
			label: `${data[key as keyof typeof data].name} - ${language}`,
			value: `${currencyCode}-${language}`.toLowerCase(),
		}));
	})
	.filter(Boolean)
	.flat(Infinity);

export default function Account() {
	const user = useUser();
	const currency = `${user.currency}-${user.locale}`;

	return (
		<Card className="w-full">
			<CardHeader>
				<h2 className="font-semibold text-primary dark:text-white">Account</h2>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 sm:grid-cols-2">
					<div>
						<Label className="mb-3 block" htmlFor="email">
							Email
						</Label>
						<Input id="email" disabled defaultValue={user.email} />
					</div>
					<div>
						<Label className="mb-3 block" htmlFor="currency">
							Currency
						</Label>
						<Combobox
							data={currencyData}
							selected={currency}
							onChange={async (value: string) => {
								const [currency, locale] = value.split('-');
								await updateUser({ currency, locale });
							}}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
