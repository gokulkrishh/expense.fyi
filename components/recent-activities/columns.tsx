'use client';

import { ColumnDef } from '@tanstack/react-table';

export type recentActivities = {
	no: string;
	name: string;
	amount: string;
	category: string;
};

export const columns: ColumnDef<recentActivities>[] = [
	{
		accessorKey: 'no',
		header: 'No',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
];
