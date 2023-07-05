'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

import { Button } from 'components/ui/button';

import { formatCurrency, formatDate } from 'lib/formatter';
import { cn } from 'lib/utils';

import { incomeCategory } from 'constants/categories';

export type Income = {
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

export const columns: ColumnDef<Income>[] = [
	{
		accessorKey: 'name',
		header: () => {
			return <div className="font-medium text-black dark:text-white">Name</div>;
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
		header: ({ column }) => {
			return (
				<Button
					className={cn(`p-0 text-xs uppercase text-black dark:text-white`, getSortedClassName(column))}
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Received date
					<ArrowUpDown className={cn(`ml-1 h-3 w-3 ${getSortedClassName(column)}`)} />
				</Button>
			);
		},
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
			return <div className="">{incomeCategory[category]}</div>;
		},
	},

	{ accessorKey: 'notes', header: 'Notes' },
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
