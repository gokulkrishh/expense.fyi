'use client';

import { useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import shortcuts from 'constants/shortcuts';

import AddExpense from './add/expenses';

const openShortcutKey = Object.values(shortcuts.modal.open.shortcut);

export default function Add({ mutate }: { mutate?: any }) {
	const [show, setShow] = useState(false);
	useHotkeys(openShortcutKey, () => setShow(true));

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						className="z-100 fixed bottom-[20px] right-[20px] flex h-[56px] w-[56px] items-center justify-between rounded-full bg-blue-600 p-[12px] text-sm font-medium uppercase text-white shadow-lg hover:bg-blue-700 sm:h-[48px] sm:w-[48px]"
						onClick={() => {
							setShow(!show);
						}}
					>
						<PlusIcon className="h-12 w-12" />
					</button>
				</TooltipTrigger>
				<TooltipContent className="mb-1 mr-1" hideWhenDetached side="top">
					{shortcuts.modal.open.text}
					<kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
						{shortcuts.modal.open.shortcut}
					</kbd>{' '}
				</TooltipContent>
			</Tooltip>
			<AddExpense show={show} selected={{}} mutate={mutate} onHide={() => setShow(false)} />
		</>
	);
}
