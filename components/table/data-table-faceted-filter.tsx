import * as React from 'react';

import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { useData } from 'components/context/data-provider';
import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from 'components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Separator } from 'components/ui/separator';

import { cn } from 'lib/utils';

interface DataTableFacetedFilter<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	disabled?: boolean;
	onFilter?: (filterData: any) => void;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}

export default function DataTableFacetedFilter<TData, TValue>({
	column,
	disabled,
	title,
	options,
	onFilter,
}: DataTableFacetedFilter<TData, TValue>) {
	const facets = column?.getFacetedUniqueValues();
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={`h-8 border-dashed ${cn({
						'pointer-events-none opacity-50': disabled,
						'max:sm:w-full': selectedValues.size < 1,
					})}`}
				>
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 1 ? (
									<Badge variant="secondary" className="rounded-sm px-1 font-normal">
										{selectedValues.size}
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="whitespace-nowrap rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(filterValues.length ? filterValues : undefined);
											onFilter?.(filterValues.length ? filterValues : []);
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
											)}
										>
											<CheckIcon className={cn('h-4 w-4')} />
										</div>
										{option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
										<span>{option.label}</span>
										{facets?.get(option.value) && (
											<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => {
											column?.setFilterValue(undefined);
											onFilter?.([]);
										}}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
