import FeedbackEmail from 'emails/FeedbackEmail';

import { withUserAuth } from 'lib/auth';
import resend from 'lib/email';
import prisma from 'lib/prisma';

import { sentFromEmailId } from 'constants/index';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'POST') {
		const { message } = req.body;
		try {
			await prisma.feedbacks.create({ data: { message, user_id: user.id } });

			try {
				await resend.sendEmail({
					from: sentFromEmailId,
					subject: '🎉 New Feedback Received',
					to: 'hello@expense.fyi',
					reply_to: user.email,
					react: <FeedbackEmail message={message} email={user.email} />,
				});
				res.status(201).json({ message: 'Feedback received.' });
			} catch (err) {
				throw err;
			}
		} catch (error) {
			res.status(500).json({ error, message: 'Failed' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
