import { getRangeDateForFilter } from './date';
import { views } from './table';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

const domain = 'expense.fyi';
const local = 'localhost:3000';
const home = isProduction ? domain : local;

const url = {
	homeWithoutApp: home,
	home: `//${home}`,
	api: `${isProduction ? 'https://app.' : 'http://app.'}${home}`,
	serverApi: `${isProduction ? 'https://' : 'http://'}${home}`,
	app: {
		signin: `//app.${home}/signin`,
		signup: `//app.${home}/signup`,
		overview: `//app.${home}`,
	},
	twitter: 'https://twitter.com/gokul_i',
	github: 'https://github.com/gokulkrishh/expense.fyi',
};

export const getApiUrl = (filterKey: string, apiPath: string, categories = []) => {
	if (filterKey === views.all.key) {
		return `/api/${apiPath}?from=all&to=all&categories=${categories.join(',')}`;
	}
	const [start, end] = getRangeDateForFilter(filterKey);
	return `/api/${apiPath}?from=${start}&to=${end}&categories=${categories.join(',')}`;
};

export default url;
