import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { notes, name, price, paid, renewal, user_id, url } = req.body;
	try {
		await prisma.subscriptions.create({
			data: { notes, name, price: Number(price), paid, user_id, url, renewal },
		});

		return res.status(201).json({ message: 'Your subscription is added!' });
	} catch (error) {
		return res.status(500).send({
			error: JSON.stringify(error || ''),
			message: 'Failed to add your subscription, try again.',
		});
	}
}