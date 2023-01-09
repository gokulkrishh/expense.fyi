import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { currency, user_id } = req.body;
	try {
		await prisma.users.update({
			data: { currency, updated_at: new Date().toISOString() },
			where: { id: user_id },
		});
		return res.status(200).json({ message: 'Your profile is updated!' });
	} catch (error) {
		console.log('error --->', error);
		return res.status(500).send({
			error: JSON.stringify(error || ''),
			message: 'Failed to updated your profile, try again.',
		});
	}
}
