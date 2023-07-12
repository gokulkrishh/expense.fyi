export default function LoaderChart({ className, type = 'bar' }) {
	if (type === 'bar') {
		return (
			<div className={`relative mb-7 w-full bg-white p-4 px-0 ${className} `}>
				<div className="animate-pulse">
					<p className="float-right h-[20px] w-[200px] rounded-md bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				</div>
				<div className="mt-[45px] w-[98%] border-b border-dashed border-gray-300"></div>
				<div className="mt-[60px] w-[98%] border-b border-dashed border-gray-300"></div>
				<p className="mt-[20px] h-[200px] w-full animate-pulse rounded-md bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
			</div>
		);
	} else if (type === 'donut') {
		return (
			<div className={`relative mb-7 w-full bg-white p-4 px-0 ${className} `}>
				<div className="animate-pulse">
					<p className="float-right h-[20px] w-[200px] rounded-md bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				</div>
				<p className="m-auto !mt-[35px] h-full max-h-[310px] w-full max-w-[310px] animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
			</div>
		);
	} else if (type === 'barlist') {
		return (
			<div className={`relative mb-7 w-full bg-white p-4 px-0 ${className}`}>
				<div className="animate-pulse">
					<p className="h-[20px] w-[200px] rounded-md bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				</div>
				<p className="mb-[10px] mt-[10px] h-[34px] w-full animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[34px] w-[60%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[34px] w-[40%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[34px] w-[20%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[34px] w-[10%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
				<p className="mb-[9px] h-[34px] w-[10%] animate-pulse rounded-sm bg-gradient-to-br from-gray-200 via-slate-50 to-gray-100 pt-2 text-xl font-semibold text-black xs:text-xl lg:text-xl xl:text-2xl" />
			</div>
		);
	}
}
