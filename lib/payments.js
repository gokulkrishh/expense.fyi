// https://docs.lemonsqueezy.com/api/orders#the-order-object
import { format } from 'date-fns';

import { showErrorToast, showSuccessToast, showWarningToast, toastMessages } from 'components/Toast';

import { dateFormatStr, tierNames } from 'constants/index';

export const paymentEvents = { success: 'Checkout.Success', closed: 'PaymentMethodUpdate.Closed' };

export const onSuccess = async ({ order }, onClose) => {
	const { attributes } = order.data;

	try {
		const res = await fetch('/api/user/upgrade', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				billing_start_date: format(new Date(), dateFormatStr),
				plan_status: tierNames.premium.key,
				order_identifier: attributes.identifier,
				order_store_id: String(attributes.store_id),
				order_number: String(attributes.order_number),
				order_status: attributes.status,
			}),
		});

		onClose();

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || res.statusText);
		}

		showSuccessToast(toastMessages.paymentSuccess, 6000);
		setTimeout(() => window.location.reload(), 6000);
	} catch (error) {
		showErrorToast(error.message);
	}
};

export const onDismiss = () => {
	showWarningToast(toastMessages.paymentCancelled);
};
