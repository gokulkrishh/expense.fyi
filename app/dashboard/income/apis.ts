export type IncomeData = {
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

export const deleteIncome = async (id: string) => {
	const res = await fetch(`/api/income`, { method: 'DELETE', body: JSON.stringify({ id: [id] }) });
	return await res.json();
};

export const editIncome = async (data: IncomeData) => {
	const res = await fetch(`/api/income`, { method: 'PUT', body: JSON.stringify(data) });
	return await res.json();
};
