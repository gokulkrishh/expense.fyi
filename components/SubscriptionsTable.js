export default function SubscriptionTable({ data = [] }) {
	return (
		<>
			{data.map((datum) => (
				<div
					key={datum.id}
					className='overflow-hidden bg-white shadow sm:rounded-lg'
				>
					{datum.name}
				</div>
			))}
		</>
	);
}
