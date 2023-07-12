import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'GET') {
		const { start, end, categories = '' } = req.query;
		const categoriesList = categories.split(',');

		try {
			const data = await prisma.expenses.findMany({
				where: {
					user_id: user.id,
					date: { lte: end, gte: start },
					OR: categoriesList.map((category) => ({ category: { contains: category } })),
				},
				orderBy: {
					date: 'desc',
				},
				select: {
					notes: true,
					name: true,
					price: true,
					category: true,
					paid_via: true,
					id: true,
					date: true,
					created_at: true,
					updated_at: true,
				},
			});

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to get the data' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});