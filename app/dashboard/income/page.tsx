import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';

export default async function Page() {
	return (
		<>
			<LayoutHeader title="investments" />
			<div className="p-4 pt-3">
				<Summary />
			</div>
		</>
	);
}
