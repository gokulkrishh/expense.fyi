export default function ChartLoader({ className, type }: { className?: string; type: string }) {
	if (type === 'bar') {
		return (
			<div className={`relative mb-7 rounded-lg bg-background p-4 text-left ${className} `}>
				<div className="animate-pulse">
					<p className="float-right h-[20px] w-[200px] rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				</div>
				<div className="mt-[45px] w-[98%] rounded-sm border-b border-dashed border-gray-200 dark:border-muted"></div>
				<div className="mt-[60px] w-[98%] rounded-sm border-b border-dashed border-gray-200 dark:border-muted"></div>
				<p className="mt-[20px] h-[200px] w-full animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
			</div>
		);
	} else if (type === 'donut') {
		return (
			<div className={`relative mb-7 rounded-lg bg-background p-4 text-left ${className} `}>
				<div className="animate-pulse">
					<p className="float-right h-[20px] w-[200px] rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				</div>
				<p className="m-auto !mt-[35px] h-full max-h-[310px] w-full max-w-[310px] animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
			</div>
		);
	} else if (type === 'barlist') {
		return (
			<div className={`relative mb-7 rounded-lg bg-background p-4 text-left ${className}`}>
				<div className="animate-pulse">
					<p className="h-[20px] w-[200px] rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				</div>
				<p className="mb-[10px] mt-[10px] h-[32px] w-full animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[32px] w-[60%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[32px] w-[40%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[32px] w-[30%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[32px] w-[20%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[32px] w-[10%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-gray-100 pt-2 text-xl font-semibold dark:from-[#27272A] dark:via-[#27272A] dark:to-[#27272A] lg:text-xl xl:text-2xl" />
			</div>
		);
	}
}
