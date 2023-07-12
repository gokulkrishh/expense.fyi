import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res) => {
	if (req.method === 'PATCH') {
		const { notes, name, price, paid, url, id, date, active, cancelled_at } = req.body;

		if (!id) {
			res.status(400).json({ message: 'Invalid request' });
		}

		try {
			await prisma.subscriptions.update({
				data: { notes, name, price, date, paid, url, active, cancelled_at },
				where: { id },
			});
			res.status(200).json({ message: 'Updated' });
		} catch (error) {
			res.status(500).json({ error, message: 'Failed' });
		}
	} else {
		res.setHeader('Allow', ['PATCH']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
