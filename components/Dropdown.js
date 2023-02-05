import { Fragment, useEffect, useRef } from 'react';

import { Transition } from '@headlessui/react';

export default function Dropdown({ show, onHide, data = [], onClick }) {
	const ref = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onHide();
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onHide]);

	return (
		<Transition
			as={'div'}
			enter="transition-opacity duration-75"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			show={show}
		>
			{data.length ? (
				<div
					ref={ref}
					className="absolute mt-1 w-full max-w-[150px] overflow-auto rounded-md bg-white py-1 text-base shadow-sm ring-1 ring-gray-300 focus:outline-none sm:text-sm"
				>
					{data.map(({ name, id, category }) => (
						<button
							key={id}
							onClick={() => onClick({ name, category })}
							className="relative w-full cursor-default select-none p-2 text-left text-gray-900 hover:bg-gray-100"
						>
							{name}
						</button>
					))}
				</div>
			) : null}
		</Transition>
	);
}
