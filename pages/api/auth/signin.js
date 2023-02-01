import { createClient } from '@supabase/supabase-js';
import SignInEmail from 'emails/SignIn';

import resend from 'lib/email';

import { getURL } from 'utils/url';

import { sentFromEmailId } from 'constants/index';

const supbaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handle(req, res) {
	if (req.method === 'POST') {
		const { email } = req.body;

		try {
			const { data, error } = await supbaseAdmin.auth.admin.generateLink({
				type: 'magiclink',
				email,
				options: { redirectTo: getURL() },
			});

			if (error) {
				throw error;
			}

			const { properties } = data;
			const { action_link } = properties;

			try {
				await resend.sendEmail({
					from: sentFromEmailId,
					subject: 'Sign in link for Expense.fyi',
					to: email,
					react: <SignInEmail magicLink={action_link} />,
				});
				res.status(200).json({ message: 'We just sent an email with magic link, check your inbox.' });
			} catch (err) {
				throw err;
			}
		} catch (error) {
			res.status(500).json({ message: String(error) || 'Error occurred, please try again.' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
}
