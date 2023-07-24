import { apiUrls } from 'lib/apiUrls';

export const updateUser = async (data: any) => {
	const res = await fetch(apiUrls.user.modify, { method: 'PATCH', body: JSON.stringify(data) });
	return await res.json();
};

export const deleteUser = async () => {
	const res = await fetch(apiUrls.user.modify, { method: 'POST' });
	return await res.json();
};
