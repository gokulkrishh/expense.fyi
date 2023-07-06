const messages = {
	success: 'Successfully added!',
	updated: 'Successfully updated!',
	deleted: 'Successfully deleted!',
	loading: 'Loading...',
	error: 'Error occurred, please try again.',
	serverError: 'Internal Server Error',
	paymentSuccess: 'Your payment is successful, page will reload in 6 seconds.',
	paymentCancelled: 'Payment is cancelled, please try again',
	premiumUpgrade: 'Upgrade for access to premium features.',
	request: {
		failed: 'Failed to get the data',
		invalid: 'Invalid request',
	},
	account: {
		doesntexist: 'No such account, Sign up instead.',
		exist: 'This account already exists, Sign in instead.',
		unauthorized: 'Unauthorized request',
	},
};

export const emails = {
	email: 'hello@expense.fyi',
	feedback: {
		subject: '🎉 New Feedback Received',
		sent: 'Feedback received.',
		failed: 'Failed to send, please try again.',
	},
	usageLimit: {
		premium: 'Your Premium Plan Expired!',
		premiumExceeded: 'Your Premium Plan usage exceeded!',
		basic: 'Your Basic Plan usage exceeded!',
	},
	sent: 'We just sent an email with magic link, check your inbox.',
	from: 'Gokul from Expense.fyi <hello@expense.fyi>',
	signin: { subject: 'Sign in link for Expense.fyi' },
	signup: { subject: 'Sign up link for Expense.fyi' },
};

export default messages;
