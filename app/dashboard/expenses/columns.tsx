'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

import { Button } from 'components/ui/button';

import { formatDate } from 'lib/formatter';
import { cn } from 'lib/utils';

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

const isSorted = (column: any) => {
	return column.getIsSorted() === 'asc' || column.getIsSorted() === 'desc';
};

const getSortedClassName = (column: any) => {
	return cn({ 'font-semibold': isSorted(column) });
};

export const columns: ColumnDef<Expenses>[] = [
	{
		accessorKey: 'name',
		header: () => {
			return <div className="font-medium text-black dark:text-white">Name</div>;
		},
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
		header: ({ column }) => {
			return (
				<Button
					className={cn(`p-0 text-xs uppercase text-black dark:text-white`, getSortedClassName(column))}
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Price
					<ArrowUpDown className={cn(`ml-1 h-3 w-3 ${getSortedClassName(column)}`)} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'INR',
			}).format(price);

			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					className={cn(`p-0 text-xs uppercase text-black dark:text-white`, getSortedClassName(column))}
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Spent date
					<ArrowUpDown className={cn(`ml-1 h-3 w-3 ${getSortedClassName(column)}`)} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date = row.getValue<string>('date');
			const formatted = formatDate({ date });
			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					className={cn(`p-0 text-xs uppercase text-black dark:text-white`, getSortedClassName(column))}
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Category
					<ArrowUpDown className={cn(`ml-1 h-3 w-3 ${getSortedClassName(column)}`)} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const category = row.getValue<string>('category');
			return <div className="">{expensesCategory[category]?.name}</div>;
		},
	},
	{
		accessorKey: 'paid_via',
		header: ({ column }) => {
			return (
				<Button
					className={cn(`p-0 text-xs uppercase text-black dark:text-white`, getSortedClassName(column))}
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Paid via
					<ArrowUpDown className={cn(`ml-1 h-3 w-3 ${getSortedClassName(column)}`)} />
				</Button>
			);
		},
		cell: ({ row }) => {
			const paid_via = row.getValue<string>('paid_via');
			return <div className="">{expensesPay[paid_via]?.name}</div>;
		},
	},
	{ accessorKey: 'notes', header: 'Notes' },
	{
		accessorKey: 'actions',
		header: 'ACTIONS',
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
