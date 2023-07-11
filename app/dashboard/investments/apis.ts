export type InvestmentData = {
	notes: string;
	name: string;
	price: string;
	category: string;
	units: number;
	date: string;
};

export const addInvestment = async (data: InvestmentData) => {
	const res = await fetch(`/api/investments/add`, { method: 'POST', body: JSON.stringify(data) });
	if (!res.ok) {
		const error = await res.json();
		throw error;
	}
	return await res.json();
};

export const deleteInvestment = async (id: string) => {
	const res = await fetch(`/api/investments`, { method: 'DELETE', body: JSON.stringify({ id: [id] }) });
	return await res.json();
};

export const editInvestment = async (data: InvestmentData) => {
	const res = await fetch(`/api/investments`, { method: 'PUT', body: JSON.stringify(data) });
	return await res.json();
};
