'use client';

import Link from 'next/link';

import * as Tooltip from '@radix-ui/react-tooltip';

import TooltipText from './tooltip-text';

export default function SidebarLink({
	href,
	name,
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
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Link
							href={href}
							className={`mb-2 mt-1 flex items-center justify-center rounded-lg p-2 tracking-wide text-white transition-all hover:bg-muted ${
								active ? 'bg-[#27272a]' : ''
							} ${className}`}
						>
							{children}
						</Link>
					</Tooltip.Trigger>
					<Tooltip.Content hideWhenDetached side="right" className="TooltipContent">
						<TooltipText className="xs:hidden ml-4 sm:block" text={name} shortcut={shortcut} />
					</Tooltip.Content>
				</Tooltip.Root>
			) : (
				<Link
					href={href}
					className={`mb-2 mt-1 flex items-center justify-center rounded-lg p-2 tracking-wide text-white transition-all hover:bg-secondary ${
						active ? 'bg-gray-200 dark:bg-secondary' : ''
					} ${className}`}
				>
					{children}
				</Link>
			)}
		</>
	);
}
