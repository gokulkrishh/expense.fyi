import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (_, res, user) => {
	if (req.method === 'GET') {
		try {
			const data = await prisma.users.findUnique({ where: { id: user.id } });

			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).send({ error, message: 'Failed to get the data' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
