import { cache } from 'react';

import { format } from 'date-fns';

import { dateFormat } from 'constants/date';

type IncomeData = {
	notes: string;
	name: string;
	price: string;
	category: string;
	date: string;
};

export const addIncome = async (data: IncomeData) => {
	const res = await fetch(`/api/income/add`, { method: 'POST', body: JSON.stringify(data) });
	return await res.json();
};
