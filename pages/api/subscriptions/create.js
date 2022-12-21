import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { notes, name, amount, paid, userId, url } = req.body;
	try {
		await prisma.subscriptions.create({
			data: { notes, name, amount, paid, userId, url },
		});

		return res.status(201).json({ message: 'Your subscription is added!' });
	} catch (error) {
		return res.status(500).send({
			error: JSON.stringify(error || ''),
			message: 'Failed to add your subscription, try again.',
		});
	}
}
