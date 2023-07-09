'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Download } from 'lucide-react';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useToast } from 'components/ui/use-toast';

import { excludedColumns, exportTableToCsv } from 'lib/export';

import DataTableFilterOptions from './data-table-filter-options';
import DataTableViewOptions from './data-table-view-options';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	className?: String;
	loading: boolean;
	filter: string;
	filename: string;
	setFilter: (filter: string) => void;
}

export function DataTableToolbar<TData>({
	table,
	className,
	loading,
	filter,
	setFilter,
	filename,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const { toast } = useToast();

	return (
		<div className={`mb-4 mt-10 flex items-center justify-between ${className}`}>
			<>
				<div className="flex flex-1 items-center space-x-2">
					<Input
						disabled={loading}
						placeholder="Filter by name"
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
						className="h-8 w-[250px] lg:w-[350px]"
					/>
					{isFiltered && (
						<Button
							variant="ghost"
							onClick={() => table.resetColumnFilters()}
							className="h-8 px-2 text-primary lg:px-3"
						>
							Reset
							<Cross2Icon className="ml-2 h-4 w-4" />
						</Button>
					)}
				</div>
				{loading ? null : (
					<>
						<DataTableViewOptions table={table} />
						<DataTableFilterOptions setFilter={setFilter} filter={filter} />
						<Button
							variant="outline"
							onClick={() => {
								toast({ description: 'Export will begin shortly.' });
								exportTableToCsv(filename);
							}}
							size="sm"
							className="ml-4 hidden h-8 text-sm capitalize  lg:flex"
						>
							<Download className="mr-2 h-3.5 w-3.5" />
							Export
						</Button>
					</>
				)}
			</>
		</div>
	);
}
