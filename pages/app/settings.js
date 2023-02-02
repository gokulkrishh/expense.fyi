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
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<Script src="https://checkout.razorpay.com/v1/checkout.js" async />

			<div className="h-ful mb-20">
				<div className="mb-2 flex justify-between">
					<h1 className="mr-3 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Settings</h1>
				</div>

				<SettingsLayout selected={selectedTab} tabs={tabs} onChange={(tab) => setSelectedTab(tab)}>
					<div className="mt-0 mb-10 flex w-full flex-col md:flex-row">
						<div className="mr-2 md:min-w-[300px]">
							<h2 className="text-xl text-black">{selectedTab.name}</h2>
							<p className="mt-1 mb-1 text-sm">{selectedTab.description}</p>
						</div>
						<selectedTab.component user={user} />
					</div>
				</SettingsLayout>
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
