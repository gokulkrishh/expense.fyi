import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'POST') {
		try {
			await prisma.users.update({ data: { usage: { increment: 1 } }, where: { id: user.id } });
			res.status(200).end('Done');
		} catch {
			res.status(500).end('Failed');
		}
	} else {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
