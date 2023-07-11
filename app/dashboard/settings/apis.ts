export const updateUser = async (data: any) => {
	const res = await fetch(`/api/user`, { method: 'PATCH', body: JSON.stringify(data) });
	return await res.json();
};
