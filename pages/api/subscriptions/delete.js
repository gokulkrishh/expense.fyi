import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res) => {
	if (req.method === 'DELETE') {
		const { id } = req.body;

		if (!id) {
			res.status(400).json({ message: 'Invalid request' });
		}

		try {
			await prisma.subscriptions.delete({ where: { id } });
			res.status(200).json({ message: 'Deleted' });
		} catch (error) {
			res.status(500).json({ error, message: 'Failed' });
		}
	} else {
		res.setHeader('Allow', ['DELETE']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
