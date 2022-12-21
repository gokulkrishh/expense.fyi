export default function SubscriptionTable() {
	return (
		<>
			<table className='overflow-hidden bg-white shadow sm:rounded-lg'>
				<thead className='border-b border-gray-200'>
					<tr className=' bg-gray-50 px-3 py-3 sm:grid sm:grid-cols-6 sm:gap-2 sm:px-4'>
						<th className='text-left'>Name</th>
						<th className='text-left'>Amout</th>
						<th className='text-left'>Subscription</th>
						<th className='text-left'>URL</th>
						<th className='text-left'>Notes</th>
						<th className='text-left'>Notify</th>
					</tr>
				</thead>
				<tbody>
					<tr className='bg-white px-3 py-3 sm:grid sm:grid-cols-6 sm:gap-2 sm:px-4'>
						<td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
						<td>Malcolm Lockyer</td>
						<td>1961</td>
						<td>1961</td>
						<td>1961</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
