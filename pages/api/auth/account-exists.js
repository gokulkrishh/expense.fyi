import prisma from 'lib/prisma';

export default async function handle(req, res) {
	if (req.method === 'POST') {
		const { email } = req.body;
		const user = await prisma.users.findFirst({ where: { email }, select: { email: true } });
		if (user) {
			return res.status(200).json({ exists: true });
		}
		return res.status(200).json({ exists: false });
	} else {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
}
