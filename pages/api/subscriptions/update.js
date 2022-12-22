import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { notes, name, price, paid, userId, url, id } = req.body;
	try {
		await prisma.subscriptions.update({
			data: { notes, name, price, paid, user_id: userId, url },
			where: { id },
		});
		return res.status(200).json({ message: 'Your subscription is updated!' });
	} catch (error) {
		return res.status(500).send({
			error: JSON.stringify(error || ''),
			message: 'Failed to add your subscription, try again.',
		});
	}
}
