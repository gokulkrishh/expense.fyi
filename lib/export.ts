// Source: https://stackoverflow.com/a/56370447/2195730

const separator = ',';

// Note: Doing to avoid actions columns being exported (assumption last column would be action)
const excludeLastColumnIndex = 1;

export const exportTableToCsv = (filename: string) => {
	const rows = document.querySelectorAll('table tr');

	const csv = [];

	for (var i = 0; i < rows.length; i++) {
		var row = [];
		var cols = rows[i].querySelectorAll<any>('td, th');
		for (var j = 0; j < cols.length - excludeLastColumnIndex; j++) {
			var data = cols[j]?.innerText?.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ');
			data = data.replace(/"/g, '" "');
			row.push('"' + data + '"');
		}
		csv.push(row.join(separator));
	}

	var csvStr = csv.join('\n');
	var link = document.createElement('a');
	link.style.display = 'none';
	link.setAttribute('target', '_blank');
	link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvStr));
	link.setAttribute('download', filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

type ExcludeColumns = {
	[key: string]: boolean;
};

export const excludedColumns: ExcludeColumns = { actions: true };
