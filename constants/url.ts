const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

const domain = 'expense.fyi';
const local = 'localhost:3000';
const home = isProduction ? domain : local;

const url = {
	homeWithoutApp: home,
	home: `//${home}`,
	app: {
		signin: `//app.${home}/signin`,
		signup: `//app.${home}/signup`,
		overview: `//app.${home}`,
	},
	twitter: 'https://twitter.com/gokul_i',
	github: 'https://github.com/gokulkrishh/expense.fyi',
};

export default url;
