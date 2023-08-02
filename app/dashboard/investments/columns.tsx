'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import DataTableColumnHeader from 'components/table/data-table-column-header';
import { Button } from 'components/ui/button';

import { formatCurrency, formatDate } from 'lib/formatter';

import { investmentCategory } from 'constants/categories';

export type Investments = {
	name: string;
	date: string;
	price: string;
	category: string;
	units: number;
	notes: string;
	created_at: string;
	updated_at: string;
	id: string;
	actions: string;
};

export const columns: ColumnDef<Investments>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: (props) => {
			const { row } = props;
			const name = row.getValue<string>('name');
			return <div className="font-medium">{name}</div>;
		},
	},
	{
		accessorKey: 'units',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Units" />,
		cell: ({ row }) => {
			const units = parseFloat(row.getValue('units'));
			return <div className="tabular-nums">{units}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Single Stock Price" />,
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
		accessorKey: 'price',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Total Amount" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const price = parseFloat(row.getValue('price'));
			const units = parseFloat(row.getValue('units'));
			const formatted = formatCurrency({ value: units * price, currency: user?.currency, locale: user?.locale });
			return <div className="font-medium tabular-nums">{formatted}</div>;
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Bought Date" />,
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
		cell: ({ row }) => {
			const category = row.getValue<string>('category');
			return <div className="">{investmentCategory[category]}</div>;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{ accessorKey: 'notes', header: 'Notes' },
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
