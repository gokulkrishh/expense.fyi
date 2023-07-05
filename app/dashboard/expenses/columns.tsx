'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

import { Button } from 'components/ui/button';

import { formatCurrency, formatDate } from 'lib/formatter';
import { cn } from 'lib/utils';

import { expensesCategory, expensesPay } from 'constants/categories';

import { DataTableColumnHeader } from './data-table-column-header';

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

const isSorted = (column: any) => {
	return column.getIsSorted() === 'asc' || column.getIsSorted() === 'desc';
};

const getSortedClassName = (column: any) => {
	return cn({ 'font-semibold': isSorted(column) });
};

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
			return <div className="font-medium">{formatted}</div>;
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
			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => <DataTableColumnHeader column={column} title="category" />,
		cell: ({ row }) => {
			const category = row.getValue<string>('category');
			return <div className="">{expensesCategory[category]?.name}</div>;
		},
	},
	{
		accessorKey: 'paid_via',
		header: ({ column }) => <DataTableColumnHeader column={column} title="paid" />,
		cell: ({ row }) => {
			const paid_via = row.getValue<string>('paid_via');
			return <div className="">{expensesPay[paid_via]?.name}</div>;
		},
	},
	{ accessorKey: 'notes' },
	{
		accessorKey: 'actions',
		cell: ({ row }) => {
			return (
				<div className="flex">
					<Button className="mr-1 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Pencil className="h-4 w-4" />
					</Button>
					<Button className="ml-2 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	},
];
