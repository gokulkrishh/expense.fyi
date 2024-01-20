'use client';

import Image from 'next/image';

import { ColumnDef } from '@tanstack/react-table';
import { isThisMonth } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

import DataTableColumnHeader from 'components/table/data-table-column-header';
import { Button } from 'components/ui/button';
import { Checkbox } from 'components/ui/checkbox';

import { formatCurrency, formatDate } from 'lib/formatter';

import { SubscriptionsData } from './apis';

export const columns: ColumnDef<SubscriptionsData>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: (props) => {
			const { row } = props;
			const name = row.getValue<string>('name');
			const url = row.original?.url;
			return (
				<div className="relative flex items-center font-medium">
					<Image
						className="absolute inline-block text-transparent"
						src={`https://www.google.com/s2/favicons?domain=${url}`}
						width={14}
						height={14}
						alt={name}
					/>
					<a target="_blank" className="ml-6 underline hover:opacity-80" href={url} rel="noreferrer">
						{name}
					</a>
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
			const paid = row.original?.paid;
			const formatted = formatCurrency({ value: price, currency: user?.currency, locale: user?.locale });
			return (
				<div className="mb-1 mt-1 font-medium tabular-nums">
					{formatted}
					<p className="mt-[2px] text-xs text-muted-foreground"> per {paid.replace(/ly/, '')}</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'renewal_date',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Renewal Date" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const renewalDate = row.getValue<string>('renewal_date');
			const active = row.getValue<boolean>('active');
			const isItThisMonth = active && isThisMonth(new Date(renewalDate));
			const formatted = renewalDate ? formatDate({ date: renewalDate, locale: user?.locale }) : '-';
			return (
				<div title={isItThisMonth ? 'Due this month' : ''} className={isItThisMonth ? 'font-medium text-red-500' : ''}>
					{formatted}
				</div>
			);
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Start/Cancel Date" />,
		cell: (props) => {
			const {
				row,
				table: { options },
			} = props;
			const user = options.meta?.user;
			const startDate = row.getValue<string>('date');
			const cancelledAt = row.original?.cancelled_at;
			const formatted = formatDate({ date: startDate, locale: user?.locale });
			return (
				<div className="mb-1 mt-1">
					{formatted}
					{cancelledAt ? (
						<p className="mt-[2px] text-xs text-muted-foreground">
							Cancel: {formatDate({ date: cancelledAt, locale: user.locale })}
						</p>
					) : null}
				</div>
			);
		},
	},
	{ accessorKey: 'notes', header: 'Notes' },
	{
		accessorKey: 'active',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
		cell: (props) => {
			const { row } = props;
			const active = row.getValue<boolean>('active');
			return (
				<span
					className={`inline-flex items-center rounded-md px-2 py-1 text-xs  ${
						active
							? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-700/20'
							: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-700/10'
					}`}
				>
					{active ? 'Active' : 'Cancelled'}
				</span>
			);
		},
	},
	{
		accessorKey: 'actions',
		cell: (props) => {
			const {
				row,
				table: {
					options: { meta },
				},
			} = props;
			const active = row.original?.active;
			return (
				<div className="flex items-center">
					<Checkbox
						onCheckedChange={(checked: boolean) => {
							let updated = { ...row.original, active: checked };
							if (checked) {
								updated.cancelled_at = '';
							}
							if (meta?.onChange) meta?.onChange({ ...row.original, active: checked, cancelled_at: '' });
						}}
						checked={active}
						className="mr-3 p-0 hover:bg-transparent hover:opacity-70"
					/>
					<Button className="mr-3 rounded-lg p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
						<Pencil
							className="h-4 w-4"
							onClick={() => {
								meta?.onEdit(row.original);
							}}
						/>
					</Button>
					<Button className="rounded-lg mr-3 p-0 hover:bg-transparent hover:opacity-70" variant={'ghost'}>
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
