import { range } from 'utils/array';

export default function LoaderTable({ tr = 4, td = 6 }) {
	return (
		<>
			{range(1, tr).map((num, index) => (
				<tr className="border-b border-gray-200 last:border-0 hover:bg-gray-50" key={`${num}-${index}`}>
					{range(1, td).map((tdNum, tdIndex) => (
						<td key={`${tdNum}-${tdIndex}`} className="mt-1 h-[53px] pl-7">
							<span className="block w-[60%] animate-pulse rounded-md bg-gray-200 p-[6px] " />
						</td>
					))}
				</tr>
			))}
		</>
	);
}

export const LoaderTableHeader = ({ thList, thClassNames }) => {
	return thList.map((thItem) => (
		<th className={`${thClassNames} invisible`} key={thItem}>
			{thItem}
		</th>
	));
};
