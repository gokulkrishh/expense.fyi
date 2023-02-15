import { PlusIcon } from '@heroicons/react/24/solid';

export default function AddButton({ onClick }) {
	return (
		<button
			className="z-100 fixed bottom-[20px] right-[20px] flex h-[56px] w-[56px] items-center justify-between rounded-full bg-blue-600 p-[12px] text-sm font-medium uppercase text-white shadow-lg hover:bg-blue-700 sm:h-[48px] sm:w-[48px]"
			onClick={onClick}
		>
			<PlusIcon className="h-12 w-12" />
		</button>
	);
}
