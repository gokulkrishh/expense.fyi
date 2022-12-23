import { useEffect, useState } from 'react';

export default function Dropdown({ options, onSelect, label = '', selected, className }) {
	const [state, setState] = useState([{}]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setState(options);
		setOpen(false);
	}, [options]);

	return (
		<div className={`relative ${className}`}>
			{label ? <span className='text-md block font-semibold leading-6 text-gray-900'>{label}</span> : null}

			<button
				type='button'
				className='mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-800 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600  sm:text-sm'
				aria-haspopup='listbox'
				aria-expanded='true'
				aria-labelledby='listbox-label'
				onClick={() => {
					setOpen(!open);
				}}
			>
				<span className='flex items-center'>
					<span className={`block truncate  text-slate-800`}>
						{selected && selected.id ? selected.name : state[0].name}
					</span>
				</span>
			</button>

			{open ? (
				<ul
					className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
					role='listbox'
					aria-labelledby='listbox-label'
					aria-activedescendant='listbox-option-3'
				>
					{state.map((option, index) => (
						<li
							className={`ocus:outline-none relative cursor-default select-none py-2 pl-2 pr-9 text-gray-900 hover:bg-zinc-300 ${
								selected && selected.id === option.id ? 'bg-zinc-300' : ''
							}`}
							role='option'
							tabIndex={0}
							aria-selected={option.selected}
							key={option.id}
							onClick={() => {
								onSelect(option);
							}}
						>
							<div className='flex items-center'>
								<span className='ml-3 block truncate font-normal'>{option.name}</span>
							</div>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
