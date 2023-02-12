import Head from 'next/head';
import Script from 'next/script';

import { useState } from 'react';

import enforceAuth from 'components/Auth/enforceAuth';
import Billing from 'components/Settings/Billing';
import General from 'components/Settings/General';
import Usage from 'components/Settings/Usage';
import SettingsLayout from 'components/SettingsLayout';

const tabIds = { account: 'general', billing: 'billing', usage: 'usage' };

const tabs = [
	{
		name: 'General',
		id: tabIds.general,
		description: 'Manage your general details here.',
		component: General,
	},
	{
		name: 'Usage',
		id: tabIds.usage,
		description: 'Know your usage related details are here.',
		component: Usage,
	},
	{
		name: 'Billing',
		id: tabIds.billing,
		description: 'Manage your billing information here.',
		component: Billing,
	},
];

export default function Settings({ user }) {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	return (
		<>
			<Head>
				<title>Expense.fyi - Settings</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>

			<Script src="https://checkout.razorpay.com/v1/checkout.js" async />

			<div className="h-ful mb-20">
				<h1 className="mb-4 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Settings</h1>
				<SettingsLayout>
					<General user={user} />
					<Usage user={user} />
					<Billing user={user} />
				</SettingsLayout>
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
