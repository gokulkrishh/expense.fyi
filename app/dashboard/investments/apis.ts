import { cache } from 'react';

import { format } from 'date-fns';

import { dateFormat } from 'constants/date';

type InvestmentData = {
	notes: string;
	name: string;
	price: string;
	category: string;
	date: string;
};

export const addInvestment = async (data: InvestmentData) => {
	const res = await fetch(`/api/investments/add`, { method: 'POST', body: JSON.stringify(data) });
	return await res.json();
};
