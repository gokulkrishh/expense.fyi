export const groupBy = (arr = [], lambda) => {
	return arr.reduce((groups, current) => {
		var val = lambda(current);
		var index = groups.findIndex((x) => x.key == val);

		if (index < 0) {
			index = groups.push({ key: val, items: [] }) - 1;
		}

		groups[index].items.push(current);
		return groups;
	}, []);
};

export const groupByYear = (arr) => {
	var response = {};
	arr.forEach((d) => {
		for (var k in d) {
			var _ = k.split('-');
			var year = _[0];
			var month = _[1];
			if (!response[year]) response[year] = { total: 0 };
			response[year][month] = response[year][month] ? response[year][month] + d[k] : d[k];
			response[year].total += d[k];
		}
	});
	return response;
};

export const sortByKey = (arr, key) => {
	return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
};

export const sortDate = (arr, key) => {
	return arr.sort((a, b) => new Date(arr[key]) - new Date(arr[key]));
};

export const range = (start, stop) => Array.from({ length: stop - start + 1 }, (_, i) => start + i);
