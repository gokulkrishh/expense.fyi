import textFilter from 'text-filter';

export const lookup = ({ data, name, fields = ['name'] }: { data: any; name: string; fields?: string[] }) => {
	const result = data.filter(textFilter({ query: name, fields }));
	if (result.length)
		return Object.values(
			result.reduce((acc: any, datum: any) => {
				const name = datum?.name?.toLowerCase();
				if (!acc[name]) {
					acc[name] = datum;
				}
				return acc;
			}, {})
		).slice(0, 3);
	return result;
};
