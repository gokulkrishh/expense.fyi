export default function LoaderCard({ nums = 1 }) {
	return (
		<div className="mb-6 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
			{Array(nums)
				.fill()
				.map((num, index) => (
					<div
						key={`${num}-${index}`}
						className="relative h-[88px] rounded-lg bg-white p-4 text-left shadow shadow-gray-200"
					>
						<span className="invisible absolute right-3 top-1 text-xl" />
						<h3 className="animate-pulse bg-gray-100 text-sm font-medium leading-4 text-slate-600">
							<span className="invisible">Loading</span>
						</h3>
						<p className="mt-1 w-[80%] animate-pulse bg-gray-100 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl">
							<span className="invisible">0</span>
						</p>
					</div>
				))}
		</div>
	);
}
