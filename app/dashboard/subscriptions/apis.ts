export type SubscriptionsData = {
	id: string;
	notes: string;
	name: string;
	price: string;
	category: string;
	cancelled_at: string;
	paid_dates: any[];
	prev_renewal_date: string;
	renewal_date: string;
	paid: string;
	url: string;
	active: boolean;
	notify: string;
	date: string;
};

export const addSubscriptions = async (data: SubscriptionsData) => {
	const res = await fetch(`/api/Subscriptionss/add`, { method: 'POST', body: JSON.stringify(data) });
	return await res.json();
};

export const deleteSubscriptions = async (id: string) => {
	const res = await fetch(`/api/subscriptions`, { method: 'DELETE', body: JSON.stringify({ id: [id] }) });
	return await res.json();
};

export const editSubscriptions = async (data: SubscriptionsData) => {
	const res = await fetch(`/api/subscriptions`, { method: 'PUT', body: JSON.stringify(data) });
	return await res.json();
};
