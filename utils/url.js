import { filterMap } from 'components/Table/TableFilter';

import { siteUrls } from 'constants/index';

import { getRangeDateForFilter } from './date';

export const getAppUrl = () => {
	if (process.env.NODE_ENV === 'production') {
		return siteUrls.app;
	} else {
		return `http://${siteUrls.local}`;
	}
};

export const getUrl = () => {
	let url =
		process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
		'http://app.localhost:3000/';
	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`;
	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
	return url;
};

export const getApiUrl = (filterKey, apiPath, categories = []) => {
	if (filterKey === filterMap.all) return `/api/${apiPath}/all?categories=${categories.join(',')}`;
	const [start, end] = getRangeDateForFilter(filterKey);
	return `/api/${apiPath}/range?start=${start}&end=${end}&categories=${categories.join(',')}`;
};
