import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(
	async (req, res, user) => {
		if (req.method === 'POST') {
			const { order_identifier, billing_start_date, plan_status, order_status, order_store_id, order_number } =
				req.body;

			try {
				await prisma.users.update({
					data: { order_identifier, billing_start_date, plan_status, order_status, order_store_id, order_number },
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
