import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'POST') {
		const { notes = '', name, price, category, date } = req.body;
		try {
			await prisma.income.create({
				data: { notes, name, price, category, user_id: user.id, date },
			});

			res.status(201).json({ message: 'Added' });
		} catch (error) {
			res.status(500).json({ error, message: 'Failed' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
