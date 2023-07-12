export const incrementUsageLimit = (method) => {
	if (method === 'POST') fetch('/api/user/usage', { method: 'POST' });
};
