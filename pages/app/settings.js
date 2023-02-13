import Head from 'next/head';
import Script from 'next/script';

import enforceAuth from 'components/Auth/enforceAuth';
import Billing from 'components/Settings/Billing';
import General from 'components/Settings/General';
import Usage from 'components/Settings/Usage';
import SettingsLayout from 'components/SettingsLayout';

import { onDismiss, onSuccess, paymentEvents } from 'lib/payments';

export default function Settings({ user }) {
	const setupLemonSqueezy = () => {
		if (typeof window.LemonSqueezy.Setup === 'function') {
			window.LemonSqueezy.Setup({
				eventHandler: ({ event, data }) => {
					if (event === paymentEvents.success) {
						onSuccess(data);
					} else if (event === paymentEvents.closed) {
						onDismiss();
					} else {
						console.error(`Unknown event type: ${event}`);
					}
				},
			});
		}
	};

	return (
		<>
			<Head>
				<title>Expense.fyi - Settings</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>

			<Script src="https://app.lemonsqueezy.com/js/lemon.js" async onLoad={setupLemonSqueezy} />

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
