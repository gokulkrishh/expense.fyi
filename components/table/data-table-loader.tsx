import { Skeleton } from 'components/ui/skeleton';
import { TableCell, TableRow } from 'components/ui/table';

export default function TableLoader({ rows = 5, columns = 6 }: { rows: number; columns: number }) {
	return (
		<>
			{Array(rows)
				.fill(0)
				.map((_, index) => {
					return (
						<TableRow key={index}>
							{Array.from({ length: columns }).map((_, idx) => {
								return (
									<TableCell className="p-3" key={idx}>
										<Skeleton className="h-[20px] w-[60%] rounded-md pr-2" />
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
		</>
	);
}
