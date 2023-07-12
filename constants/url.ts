import { getRangeDateForFilter } from './date';
import { views } from './table';

const isProduction = process.env.NODE_ENV === 'production';

const domain = 'expensetest123.vercel.app';
const local = 'localhost:3000';
const home = isProduction ? domain : local;

const url = {
	homeWithoutApp: home,
	home: `//${home}`,
	api: `${isProduction ? 'https://' : 'http://'}${home}`,
	serverApi: `${isProduction ? 'https://' : 'http://'}${home}`,
	app: {
		signin: `//${home}/signin`,
		signup: `//${home}/signup`,
		overview: `//${home}`,
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
