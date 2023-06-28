import LayoutHeader from 'components/dashboard/layout-header';
import Summary from 'components/dashboard/summary';

export default async function Page() {
	return (
		<>
			<LayoutHeader title="settings" />
			<div className="p-4 pt-3"></div>
		</>
	);
}
