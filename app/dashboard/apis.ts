import { cache } from 'react';

import { format } from 'date-fns';

import { dateFormat } from 'constants/date';

type Expenses = {
	from: string;
	to: string;
	categories?: Array<string>;
};

export const getExpenses = async ({ from, to, categories = [] }: Expenses) => {
	if (from && to) {
		const res = await fetch(`/api/expenses`, { method: 'POST', body: JSON.stringify({ from, to, categories }) });
		if (!res.ok) {
			return [];
		}
		return await res.json();
	}
};

export const getSubscriptions = async ({ from, to }: { from: string; to: string }) => {
	if (from && to) {
		const res = await fetch(
			`/api/subscriptions?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
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
			`/api/investments?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
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
			`/api/income?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
		);
		if (!res.ok) {
			return [];
		}
		return await res.json();
	}
};

export const getUser = async () => {
	const res = await fetch(`/api/user`);
	if (!res.ok) {
		return {};
	}
	return await res.json();
};
