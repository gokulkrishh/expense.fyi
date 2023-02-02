import { useState } from 'react';

export default function SettingsLayout({ tabs, selected, onChange, children }) {
	return (
		<div className="border-gray-250 h-[38px] border-b pb-2 text-sm font-normal text-zinc-600">
			{tabs.map((tab, index) => {
				return (
					<button
						key={`${tab.name}-${index}`}
						onClick={() => onChange(tab)}
						className={`relative mr-6 rounded-md px-2 py-1.5 text-black hover:bg-gray-200`}
					>
						{tab.name}
						<span
							className={`absolute bottom-[-7px] left-0 right-0 inline-block w-full border-b-2 ${
								selected.id === tab.id ? 'border-zinc-900' : 'border-b-0 border-gray-300'
							}`}
						/>
					</button>
				);
			})}
			<div className="mt-6 mb-10 flex w-full flex-col md:flex-row">{children}</div>
		</div>
	);
}
