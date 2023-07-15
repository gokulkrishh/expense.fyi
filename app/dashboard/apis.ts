import { format } from 'date-fns';

import { dateFormat } from 'constants/date';
import url from 'constants/url';

type Expenses = {
	from: string;
	to: string;
};

export const getExpenses = async ({ from, to }: Expenses) => {
	if (from && to) {
		const res = await fetch(`${url.api}/api/expenses`, {
			method: 'POST',
			body: JSON.stringify({ from, to }),
		});
		if (!res.ok) {
			return [];
		}
		return await res.json();
	}
};

export const getSubscriptions = async ({ from, to }: { from: string; to: string }) => {
	if (from && to) {
		const res = await fetch(
			`${url.api}/api/subscriptions?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
		);
		if (!res.ok) {
			return [];
		}
		return await res.json();
	}
};

export const getInvestments = async ({ from, to }: { from: string; to: string }) => {
	if (from && to) {
		const res = await fetch(
			`${url.api}/api/investments?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
		);
		if (!res.ok) {
			return [];
		}
		return await res.json();
	}
};

export const getIncome = async ({ from, to }: { from: string; to: string }) => {
	if (from && to) {
		const res = await fetch(
			`${url.api}/api/income?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
		);
		if (!res.ok) {
			return [];
		}
		return await res.json();
	}
};

export const incrementUsage = async () => {
	const res = await fetch(`${url.api}/api/user/usage`, { method: 'POST' });
	if (!res.ok) {
		return 'Failed';
	}
	return await res.json();
};
