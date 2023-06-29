'use client';

import { ColumnDef } from '@tanstack/react-table';

export type recentActivities = {
	no: number;
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
		header: 'In / Category',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
];