import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res, user) => {
	const { categories = '' } = req.query;
	const categoriesList = categories.split(',');

	console.log(
		'asdasd --->',
		categoriesList.map((category) => ({ category: { contains: category } }))
	);

	if (req.method === 'GET') {
		try {
			const data = await prisma.expenses.findMany({
				where: { user_id: user.id, OR: categoriesList.map((category) => ({ category: { contains: category } })) },
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
				orderBy: {
					date: 'desc',
				},
			});

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to get the all expenses' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
