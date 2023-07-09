export type ExpenseData = {
	notes: string;
	name: string;
	price: string;
	category: string;
	date: string;
	paid_via: string;
	id: string | null;
};

export const addExpense = async (data: ExpenseData) => {
	const res = await fetch(`/api/expenses/add`, { method: 'POST', body: JSON.stringify(data) });
	return await res.json();
};

export const deleteExpense = async (id: string) => {
	const res = await fetch(`/api/expenses`, { method: 'DELETE', body: JSON.stringify({ id: [id] }) });
	return await res.json();
};

export const editExpense = async (data: ExpenseData) => {
	const res = await fetch(`/api/expenses`, { method: 'PUT', body: JSON.stringify(data) });
	return await res.json();
};
