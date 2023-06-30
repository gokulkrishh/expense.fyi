'use client';

import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

export default function SidebarLink({
	href,
	name = '',
	children,
	active,
	className = '',
	shortcut,
}: {
	href: string;
	name?: string;
	children: any;
	active?: boolean;
	className?: string;
	shortcut?: string;
}) {
	return (
		<>
			{shortcut ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={href}
							className={`mb-2 mt-1 flex items-center justify-center rounded-lg p-2 tracking-wide text-white transition-all hover:bg-[#27272a] ${
								active ? 'bg-[#27272a]' : ''
							} ${className}`}
						>
							{children}
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">
						{name}
						<kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
							{shortcut}
						</kbd>
					</TooltipContent>
				</Tooltip>
			) : (
				<Link
					href={href}
					className={`mb-2 mt-1 flex items-center justify-center rounded-lg p-2 tracking-wide text-white transition-all hover:bg-[#27272a] ${
						active ? 'bg-[#27272a]' : ''
					} ${className}`}
				>
					{children}
				</Link>
			)}
		</>
	);
}
