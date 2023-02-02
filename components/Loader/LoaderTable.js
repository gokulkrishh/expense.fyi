import { range } from 'utils/array';

export default function LoaderTable({ tr = 2, td = 5 }) {
	return (
		<>
			{range(1, tr).map((num, index) => (
				<tr className="animate-pulse border-b border-gray-200 last:border-0" key={`${num}-${index}`}>
					{range(1, td).map((tdNum, tdIndex) => (
						<td key={`${tdNum}-${tdIndex}`} className="mt-1 h-[53px]">
							<span className="ml-4 block h-[20px] w-[50%] rounded-md bg-gray-200 px-2" />
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
