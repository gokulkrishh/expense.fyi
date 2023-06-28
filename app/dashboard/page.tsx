import LayoutHeader from '@/components/dashboard/layout-header';
import Summary from '@/components/dashboard/summary';

export async function getExpenses({ from, to }: { from: string; to: string }) {
	if (from && to) {
		const data = await fetch(`/api/expenses/range?f=${from}&t=${to}`);
		return await data.json();
	}
	return [];
}

export default async function Page() {
	return (
		<>
			<LayoutHeader title="overview" showDatePicker={true} />
			<div className="p-4 pt-3">
				<Summary />
			</div>
		</>
	);
}
