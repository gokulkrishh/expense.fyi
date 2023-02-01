import { withUserAuth } from 'lib/auth';
import prisma from 'lib/prisma';

export default withUserAuth(async (req, res, user) => {
	if (req.method === 'PATCH') {
		const { currency, locale } = req.body;

		try {
			await prisma.users.update({ data: { currency, locale }, where: { id: user.id } });
			res.status(200).json({ message: 'Your data is updated.' });
		} catch (error) {
			res.status(500).json({ error, message: 'Failed to updated, please try again.' });
		}
	} else {
		res.setHeader('Allow', ['PATCH']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
});
