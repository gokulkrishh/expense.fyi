import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import { calculateRenewalDate } from 'utils/date';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'GET') {
		const { start, end } = req.query;
		try {
			const data = await prisma.subscriptions.findMany({
				where: { user_id: user.id, date: { lte: end, gte: start }, active: true },
				select: {
					notes: true,
					name: true,
					price: true,
					paid: true,
					url: true,
					date: true,
					id: true,
					active: true,
					notify: true,
					created_at: true,
					updated_at: true,
				},
			});

			const updatedDate = data.map((datum) => ({
				...datum,
				renewal_date: format(calculateRenewalDate(datum.date, datum.paid), dateFormatStr),
			}));

			res.status(200).json(updatedDate);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to get the data' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
