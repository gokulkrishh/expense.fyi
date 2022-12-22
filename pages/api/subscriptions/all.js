import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { userId } = req.query;

	try {
		const data = await prisma.subscriptions.findMany({
			where: { user_id: userId },
		});

		return res.status(200).json({ data });
	} catch (error) {
		return res
			.status(500)
			.send({ error, message: 'Failed to get the all subscriptions' });
	}
}
