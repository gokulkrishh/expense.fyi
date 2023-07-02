import { cache } from 'react';

import { format } from 'date-fns';

import { dateFormat } from 'constants/date';

type ExpenseData = {
	notes: string;
	name: string;
	price: string;
	category: string;
	date: string;
	paid_via: string;
};

export const addExpense = async (data: ExpenseData) => {
	const res = await fetch(`/api/expenses/add`, { method: 'POST', body: JSON.stringify(data) });
	return await res.json();
};
