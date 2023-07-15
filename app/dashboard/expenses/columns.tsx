'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import DataTableColumnHeader from 'components/table/data-table-column-header';
import { Button } from 'components/ui/button';

import { formatCurrency, formatDate } from 'lib/formatter';

import { expensesCategory, expensesPay } from 'constants/categories';

export type Expenses = {
	name: string;
	date: string;
	price: string;
	category: string;
	paid_via: string;
	notes: string;
	created_at: string;
	updated_at: string;
	id: string;
	actions: string;
};

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		isTogglable: boolean;
	}
}

export const columns: ColumnDef<Expenses>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="name" />,
		cell: ({ row }) => {
			const category = row.getValue<string>('category');
			return (
				<div className="font-medium">
					<span className="mr-2">{expensesCategory[category]?.emoji}</span> {row.getValue('name')}
				</div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const price = parseFloat(row.getValue('price'));
			const formatted = formatCurrency({ value: price, currency: user?.currency, locale: user?.locale });
			return <div className="font-medium tabular-nums">{formatted}</div>;
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => <DataTableColumnHeader column={column} title="spent date" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const date = row.getValue<string>('date');
			const formatted = formatDate({ date, locale: user?.locale });
			return <div className="">{formatted}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => <DataTableColumnHeader column={column} title="category" />,
		cell: ({ row }) => {
			const category = row.getValue<string>('category');
			return <div className="">{expensesCategory[category]?.name}</div>;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: 'paid_via',
		header: ({ column }) => <DataTableColumnHeader column={column} title="paid via" />,
		cell: ({ row }) => {
			const paid_via = row.getValue<string>('paid_via');
			return <div className="">{expensesPay[paid_via]?.name}</div>;
		},
	},
	{ accessorKey: 'notes' },
	{
		accessorKey: 'actions',
		cell: (props) => {
			const {
				row,
				table: {
					options: { meta },
				},
			} = props;
			return (
				<div className="flex">
					<Button className="mr-1 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Pencil
							className="h-4 w-4"
							onClick={() => {
								meta?.onEdit(row.original);
							}}
						/>
					</Button>
					<Button className="ml-2 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Trash2
							className="h-4 w-4"
							onClick={() => {
								meta?.onDelete(row.original?.id);
							}}
						/>
					</Button>
				</div>
			);
		},
		meta: {
			isTogglable: false,
		},
	},
];
