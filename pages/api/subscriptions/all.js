import { format } from 'date-fns';

import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

import { calculatePaidCount, calculatePreviousRenewalDate, calculateRenewalDate } from 'utils/date';

import { dateFormatStr } from 'constants/index';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'GET') {
		const { start, end } = req.query;

		try {
			const data = await prisma.subscriptions.findMany({
				where: { user_id: user.id },
			});

			const updatedDate = data.map((datum) => {
				const renewal_date = calculateRenewalDate(datum.date, datum.paid);
				const prev_renewal_date = format(calculatePreviousRenewalDate(renewal_date, datum.paid), dateFormatStr);
				return {
					...datum,
					renewal_date: format(renewal_date, dateFormatStr),
					prev_renewal_date,
					paid_count: calculatePaidCount(datum, start, end, prev_renewal_date),
				};
			});

			res.status(200).json(updatedDate);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to get the all subscriptions' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
