import LayoutHeader from 'components/dashboard/layout-header';
import Summary from 'components/dashboard/summary';

export default async function Page() {
	return (
		<>
			<LayoutHeader title="subscriptions" />
			<div className="p-4 pt-3">
				<Summary />
			</div>
		</>
	);
}
