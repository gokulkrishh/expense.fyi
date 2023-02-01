export default function LoaderChart({ className }) {
	return (
		<div className={`relative w-full bg-white p-4 px-0 ${className} `}>
			<p className="mt-2 h-[48%] w-full animate-pulse rounded-sm bg-gray-200 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
			<p className="mt-2 h-[48%] w-full animate-pulse rounded-sm bg-gray-200 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
		</div>
	);
}
