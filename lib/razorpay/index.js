// Source: https://www.freecodecamp.org/news/integrate-a-payment-gateway-in-next-js-and-react-with-razorpay-and-tailwindcss/
// API: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/
import { format } from 'date-fns';

import { showErrorToast, showSuccessToast, showWarningToast, toastMessages } from 'components/Toast';

import { dateFormatStr, logo, siteName, tierNames } from 'constants/index';

export const makePayment = async ({ amount, currency, email }) => {
	const razorpayOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ amount, currency }),
	};

	try {
		const fetchResponse = await fetch('/api/razorpay', razorpayOptions);
		const data = await fetchResponse.json();
		if (!fetchResponse.ok) {
			throw new Error(data.message || fetchResponse.statusText);
		}

		var paymentOptions = {
			key: process.env.RAZORPAY_KEY,
			name: siteName,
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			description: 'Thankyou for the payment. Now enjoy effortless expense tracking for an year.',
			image: logo,
			handler: async (response) => {
				try {
					const res = await fetch('/api/user/upgrade', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							billing_start_date: format(new Date(), dateFormatStr),
							order_id: response.razorpay_order_id,
							plan_status: tierNames.premium.key,
							payment_id: response.razorpay_payment_id,
							payment_signature: response.razorpay_signature,
						}),
					});

					if (!res.ok) {
						const error = await res.json();
						throw new Error(error.message || res.statusText);
					}

					showSuccessToast(toastMessages.paymentSuccess, 6000);
					setTimeout(() => window.location.reload(), 6000);
				} catch (error) {
					showErrorToast(error.message);
				}
			},
			modal: {
				ondismiss: () => showWarningToast('Payment is cancelled, please try again.'),
			},
			notify: { email: true },
			prefill: { email },
			hidden: { contact: true, email: true },
		};

		const paymentObject = new window.Razorpay(paymentOptions);
		paymentObject.open();
	} catch (error) {
		showErrorToast(error.message);
	}
};
