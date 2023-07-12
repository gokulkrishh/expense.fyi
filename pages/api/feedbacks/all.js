import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res) => {
	if (req.method === 'GET') {
		try {
			const data = await prisma.feedbacks.findMany({
				select: { message: true, client: true, device: true, os: true, id: true, created_at: true },
			});
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to add your feedback, try again.' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
