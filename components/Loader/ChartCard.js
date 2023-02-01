export default function ChartLoading({ className }) {
	return (
		<div className={`relative w-full bg-white p-4 px-0 ${className} `}>
			<p className="h-full w-full animate-pulse rounded-sm bg-gray-200 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
		</div>
	);
}
