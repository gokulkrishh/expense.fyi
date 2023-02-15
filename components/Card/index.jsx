export default function Card({ title = '', data = '', className = 'w-[280px]', icon: Icon = null, hint, children }) {
	return (
		<div className={`rounded-lg bg-white p-4 text-left shadow shadow-gray-200 ${className}`}>
			{Icon ? Icon : null}
			{children ? (
				children
			) : (
				<>
					<h3 className="text-xs font-semibold uppercase leading-6 text-zinc-500">{title}</h3>
					<p className="text-2xl font-extrabold text-zinc-900">{data}</p>
					{hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
				</>
			)}
		</div>
	);
}
