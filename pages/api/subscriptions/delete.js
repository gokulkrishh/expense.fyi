import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { id } = req.body;
	try {
		await prisma.subscriptions.delete({
			where: { id },
		});
		return res
			.status(200)
			.json({ message: 'Your subscription has been deleted!' });
	} catch (error) {
		return res.status(500).send({
			error: JSON.stringify(error || ''),
			message: 'Failed to deleted your subscription, try again.',
		});
	}
}
