'use client';
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
	ExpensesIcon,
	IncomeIcon,
	InvestmentIcon,
	OverviewIcon,
	SettingsIcon,
	SignoutIcon,
	SubscriptionsIcon,
	SupportIcon,
} from '@/components/dashboard/icons';
import shortcuts from '@/constants/shourtcuts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import SvgWhiteLogo from 'public/icons/white-logo.svg';
import { useHotkeys } from 'react-hotkeys-hook';

import SidebarLink from './sidebar-link';

const dashboardLinks = [
	{ name: 'Overview', href: '/', Icon: OverviewIcon, shortcutText: shortcuts.menu.overview.shortcut },
	{ name: 'Income', href: '/income', Icon: IncomeIcon, shortcutText: shortcuts.menu.income.shortcut },
	{ name: 'Expenses', href: '/expenses', Icon: ExpensesIcon, shortcutText: shortcuts.menu.expenses.shortcut },
	{
		name: 'Investments',
		href: '/investments',
		Icon: InvestmentIcon,
		shortcutText: shortcuts.menu.investments.shortcut,
	},
	{
		name: 'Subscriptions',
		href: '/subscriptions',
		Icon: SubscriptionsIcon,
		shortcutText: shortcuts.menu.subscriptions.shortcut,
	},
];

const settingsLinks = [
	{ href: 'mailto:support@expense.fyi', name: 'Support', Icon: SupportIcon },
	{ href: '/settings', name: 'Settings', Icon: SettingsIcon },
];

const menuShortcutList = Object.values(shortcuts.menu).map((_) => _.shortcut);

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const supabase = createClientComponentClient();

	useHotkeys(menuShortcutList, (_, handler) => {
		const keys = handler.keys?.join('');
		if (keys === shortcuts.menu.overview.shortcut) router.push('/');
		if (keys === shortcuts.menu.income.shortcut) router.push('/income');
		if (keys === shortcuts.menu.expenses.shortcut) router.push('/expenses');
		if (keys === shortcuts.menu.investments.shortcut) router.push('/investments');
		if (keys === shortcuts.menu.subscriptions.shortcut) router.push('/subscriptions');
	});

	async function signOut() {
		await supabase.auth.signOut();
		router.push('/signin');
	}

	return (
		<nav className="fixed bottom-0 left-0 top-0 z-[1] flex min-h-full w-[64px] flex-col border-r border-border bg-[#09090b] pb-2 pl-3 pr-3 pt-2 transition-all max-sm:hidden">
			<div className="z-[10] mb-[10px] flex h-full w-[100%] flex-col justify-between">
				<div className="flex h-full flex-col items-center justify-between">
					<div className="flex flex-col items-center">
						<Link href="/" className="mt-[3px] rounded-lg p-1 transition-all focus:outline-none">
							<Image className="block" src={SvgWhiteLogo} width={30} height={30} alt="Expense.fyi" />
						</Link>
						<div className="mb-2 mt-[8px] flex w-full flex-col items-center border-t border-gray-100 opacity-[0.1]" />

						{dashboardLinks.map((link) => {
							return (
								<SidebarLink
									key={link.name}
									name={link.name}
									active={pathname === link.href}
									href={link.href}
									shortcut={link.shortcutText}
								>
									<link.Icon className="text-white" />
								</SidebarLink>
							);
						})}
					</div>
					<div>
						{settingsLinks.map((link) => {
							return (
								<SidebarLink key={link.href} active={pathname === link.href} href={link.href}>
									<link.Icon className="text-white" />
								</SidebarLink>
							);
						})}
						<button
							className={`mt-2 flex h-[40px] w-full items-center justify-center rounded-lg p-2 text-base tracking-wide text-white hover:bg-secondary`}
							onClick={signOut}
							title="Sign out"
						>
							<div className="flex items-center">
								<SignoutIcon className="text-white" />
							</div>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
