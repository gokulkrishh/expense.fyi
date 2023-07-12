import { useEffect, useRef } from 'react';

import { Transition } from '@headlessui/react';

import { Button } from './ui/button';

type AutoCompleteListProps = {
	searchTerm?: string;
	show: boolean;
	onHide: () => void;
	data: any[];
	onClick: (datum: any) => void;
};

export default function AutoCompleteList({ searchTerm = '', show, onHide, data = [], onClick }: AutoCompleteListProps) {
	const ref = useRef<any>();

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current?.contains(event.target)) {
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
			enter="transition ease-out duration-200"
			enterFrom="opacity-0 -translate-y-1"
			enterTo="opacity-100 translate-y-0"
			leave="transition ease-in duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			show={show}
		>
			{data.length ? (
				<div
					ref={ref}
					className="absolute mt-1 min-w-[160px] max-w-[250px] overflow-auto rounded-md border border-border bg-popover text-base shadow-md focus:outline-none sm:text-sm"
				>
					{data.map((datum) => {
						const { name: datumName, id } = datum;
						const name = datumName.toLowerCase();
						let string, highlightedText, endString;
						const nameIndex = name.indexOf(searchTerm);
						if (searchTerm.length) {
							string = datumName.substr(0, nameIndex);
							endString = datumName.substr(nameIndex + searchTerm.length);
							highlightedText = datumName.substr(nameIndex, searchTerm.length);
						}
						return (
							<Button
								className="w-full justify-start rounded-none border-border px-3 py-2 [&:not(:last-child)]:border-b"
								variant={'ghost'}
								key={id}
								onClick={() => onClick(datum)}
							>
								{searchTerm.length ? (
									<span>
										{string}
										<span className="font-semibold">{highlightedText}</span>
										{endString}
									</span>
								) : (
									name
								)}
							</Button>
						);
					})}
				</div>
			) : null}
		</Transition>
	);
}
