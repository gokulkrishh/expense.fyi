import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(
	async (req, res, user) => {
		if (req.method === 'GET') {
			try {
				// TODO: Revert this code post prod
				const data = await prisma.users.findFirst({ where: { email: req.query.email } });
				if (data.id && data.email === req.query.email) {
					return res.status(200).json({ allow: true });
				} else {
					return res.status(500).json({ message: 'Signup are closed at the moment.' });
				}
			} catch (error) {
				return res.status(500).send({ error, message: 'Failed to get the data' });
			}
		} else {
			res.setHeader('Allow', ['GET']);
			return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
		}
	},
	{
		checkUser: true, // TODO: remove this before production
	}
);
