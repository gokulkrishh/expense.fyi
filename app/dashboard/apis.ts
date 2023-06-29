import { cache } from 'react';

import { format } from 'date-fns';

import { dateFormat } from 'constants/date';

export const getExpenses = async ({ from, to }: { from: string; to: string }) => {
	if (from && to) {
		const res = await fetch(
			`/api/expenses?from=${format(new Date(from), dateFormat)}&to=${format(new Date(to), dateFormat)}`
		);
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
