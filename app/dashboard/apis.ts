import { apiUrls } from 'lib/apiUrls';

import url from 'constants/url';

export const incrementUsage = async () => {
	const res = await fetch(`${url.api}/${apiUrls.user.usage}`, { method: 'POST' });
	if (!res.ok) {
		return 'Failed';
	}
	return await res.json();
};
