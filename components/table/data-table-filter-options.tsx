'use client';

import { DropdownMenuRadioGroup, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';

import { Button } from 'components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem } from 'components/ui/dropdown-menu';

import { views } from 'constants/table';

export default function DataTableFilterOptions<TData>({
	filter,
	setFilter,
}: {
	filter: string;
	setFilter: (filter: string) => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 max-sm:h-10 text-sm capitalize max-sm:px-1 lg:flex">
					<Filter className="mr-1.5 h-3 w-3 sm:inline-block" />
					{views[filter].name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				<DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
					{Object.keys(views).map((key) => {
						return (
							<DropdownMenuRadioItem key={views[key].key} value={views[key].key}>
								{views[key].name}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
