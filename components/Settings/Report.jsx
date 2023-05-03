import { useState } from 'react';

import { Switch } from '@headlessui/react';

import { showErrorToast, showSuccessToast, showToast, toastMessages } from 'components/Toast';

export default function Report({ user }) {
	const [emailReport, setEmailReport] = useState(user.monthly_email_report);

	const onChange = async (toggle) => {
		setEmailReport(toggle);
		try {
			const res = await fetch('/api/user/update', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ monthly_email_report: toggle }),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || res.statusText);
			}

			if (toggle) {
				showSuccessToast('Email insights are turned on', 3000);
			} else {
				showSuccessToast('Email insights are turned off', 3000);
			}
		} catch (error) {
			showErrorToast(error.message);
			setEmailReport(false);
		}
	};

	const onChangeDummy = () => {
		showToast(toastMessages.premiumUpgrade, 4000);
	};

	const EmailReportsToggle = (onChange) => {
		return (
			<div className="mt-2 grid gap-6 p-3 sm:grid-cols-1">
				<label className="block">
					<div className="flex items-center justify-between text-black">
						<p className="max-w-[260px] text-[15px] xs:max-w-full">
							Get useful insights about your spendings on month end via email.
						</p>
						<Switch
							checked={emailReport}
							onChange={onChange}
							className={`${emailReport ? 'bg-green-600' : 'bg-gray-400'}
	relative inline-flex h-[21px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Email report</span>
							<span
								aria-hidden="true"
								className={`${emailReport ? 'translate-x-4' : 'translate-x-0'}
		pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
					</div>
				</label>
			</div>
		);
	};

	return (
		<div className="mb-8 mt-4 w-full max-w-2xl rounded-lg bg-white p-3 text-left shadow shadow-gray-200 md:mt-0">
			<h3 className="p-3 py-3 text-xl font-extrabold leading-6 text-black">Email Report</h3>
			<div className="mx-2 border-b-[1px] border-zinc-200 px-3 py-1" />
			{user.isPremiumPlan && !user.isPremiumPlanEnded
				? EmailReportsToggle(onChange)
				: EmailReportsToggle(onChangeDummy)}
		</div>
	);
}
