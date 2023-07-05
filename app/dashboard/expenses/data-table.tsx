'use client';

import { useState } from 'react';

import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import {
	ColumnDef,
	ColumnFiltersState,
	RowData,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { Filter, SlidersHorizontal } from 'lucide-react';

import { useUser } from 'components/context/auth-provider';
import { useExpenses } from 'components/context/expenses-provider';
import { Button } from 'components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { Input } from 'components/ui/input';
import { Skeleton } from 'components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';

import { dateFormat } from 'constants/date';

import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

const emptyData = [{}, {}, {}, {}, {}];

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		user: { locale: string; currency: string };
	}
}

const TableLoadingCell = () => {
	return <Skeleton className="h-[20px] w-[60%] rounded-md pr-2" />;
};

export function DataTable<TData, TValue>() {
	const user = useUser();
	const { data, loading, filter, setFilter } = useExpenses();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
		meta: { user },
	});

	return (
		<div className="mb-8">
			<DataTableToolbar
				filename={`Expenses-${format(new Date(), dateFormat)}.csv`}
				filter={filter}
				setFilter={setFilter}
				loading={loading || (!loading && !data.length)}
				table={table}
			/>
			<div className="rounded-md border border-border">
				<Table>
					<TableHeader className="bg-muted">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead className="text-black dark:text-white" key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : loading && table.getRowModel().rows?.length === 0 ? (
							<>
								{emptyData.map((_, index) => {
									return (
										<TableRow key={index}>
											{Array.from({ length: columns.length }).map((_, idx) => {
												return (
													<TableCell className="p-3" key={idx}>
														<TableLoadingCell />
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
							</>
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No data
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
