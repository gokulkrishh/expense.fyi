import { format } from 'date-fns';

import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import { calculatePaidCount, calculateRenewalDate } from 'utils/date';

import { dateFormatStr } from 'constants/index';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'GET') {
		const { active, start, end } = req.query;

		const whereCondition = { user_id: user.id };

		if (active === 'true') {
			whereCondition.active = true;
		}

		try {
			const data = await prisma.subscriptions.findMany({
				where: whereCondition,
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
				paidCount: calculatePaidCount(datum, start, end),
			}));

			res.status(200).json(updatedDate);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to get the all subscriptions' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
