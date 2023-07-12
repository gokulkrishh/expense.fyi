export default function TooltipText({ className, text, shortcut }) {
	return (
		<p className={`hidden rounded-md bg-zinc-800 p-2 text-xs text-white xs:block ${className}`}>
			{text}
			<span className="border-gray ml-[6px] rounded-[4px] border-[1px] border-gray-400 p-[2px] px-[5px] text-xs font-semibold uppercase">
				{shortcut}
			</span>
		</p>
	);
}
