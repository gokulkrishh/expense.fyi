import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'GET') {
		try {
			const data = await prisma.income.findMany({
				where: { user_id: user.id },
				select: {
					notes: true,
					name: true,
					price: true,
					category: true,
					id: true,
					date: true,
					created_at: true,
					updated_at: true,
				},
			});

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to get the all income' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
