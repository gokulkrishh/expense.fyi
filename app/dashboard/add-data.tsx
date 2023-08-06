'use client';

import Add from 'components/add-button';
import { useOverview } from 'components/context/overview-provider';

const AddData = () => {
	const { data } = useOverview();
	const { mutateExpenses } = data.mutate;
	return <Add type="expenses" mutate={mutateExpenses} />;
};

export default AddData;
