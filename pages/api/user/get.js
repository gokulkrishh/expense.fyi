import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { user_id } = req.query;

	try {
		const data = await prisma.users.findUnique({
			where: { id: user_id },
		});

		return res.status(200).json(data);
	} catch (error) {
		return res.status(500).send({ error, message: 'Failed to get the user data' });
	}
}
