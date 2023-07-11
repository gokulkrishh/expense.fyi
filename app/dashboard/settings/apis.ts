export const updateUser = async (data: any) => {
	const res = await fetch(`/api/user`, { method: 'PATCH', body: JSON.stringify(data) });
	return await res.json();
};

export const deleteUser = async () => {
	const res = await fetch(`/api/user`, { method: 'POST' });
	return await res.json();
};
