import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(
	async (req, res, user) => {
		if (req.method === 'POST') {
			const { order_id, billing_start_date, plan_status, payment_id, payment_signature } = req.body;

			try {
				await prisma.users.update({
					data: { billing_start_date, order_id, plan_status, payment_id, payment_signature },
					where: { id: user.id },
				});
				res.status(200).json({ message: 'Your payment details are captured.' });
			} catch (error) {
				res.status(500).json({ error, message: 'Failed to captue your payment details, try again.' });
			}
		} else {
			res.setHeader('Allow', ['POST']);
			return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
		}
	},
	{
		allow: true,
	}
);
