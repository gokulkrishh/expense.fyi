import Table from 'components/Table';

import { formatDate, formatDateToRelative, isItToday } from 'utils/formatter';

const tdClassNames = 'relative p-3 pl-8 text-black text-sm';
const thList = ['S.no', 'message', 'date ↓', 'device / os / browser'];

export default function FeedbacksTable({ isLoading, data = [], locale }) {
	if (!isLoading && !data.length) {
		return 'No feedbacks';
	}

	return (
		<Table title="Feedbacks" thList={thList} isLoading={isLoading} isPremiumPlan={false}>
			{data
				.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
				.map((datum, index) => {
					return (
						<tr key={datum.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
							<td className={tdClassNames}>{index + 1}</td>
							<td className={`${tdClassNames}  break-words`}>{datum.message}</td>
							<td className={tdClassNames}>
								{isItToday(new Date(datum.created_at), new Date())
									? `Today ${formatDateToRelative(new Date(datum.created_at), locale)}`
									: formatDate(new Date(datum.created_at), locale)}
							</td>
							<td className={`${tdClassNames}`}>
								<span className="capitalize">{datum.device} /</span>
								<span className=""> {datum.os} /</span>
								<span className=""> {datum.client}</span>
							</td>
						</tr>
					);
				})}
		</Table>
	);
}
