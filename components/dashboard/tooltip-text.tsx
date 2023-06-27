export default function TooltipText({
	className,
	text,
	shortcut,
}: {
	className?: string;
	text: string;
	shortcut: string;
}) {
	return (
		<p
			className={`xs:block hidden rounded-md bg-zinc-800 p-[6px] pl-2 pr-2 text-xs capitalize text-white ${className}`}
		>
			{text}
			<kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
				{shortcut}
			</kbd>
		</p>
	);
}
