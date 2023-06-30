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
		<p className={`xs:block  ${className}`}>
			{text}
			<kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
				{shortcut}
			</kbd>
		</p>
	);
}
