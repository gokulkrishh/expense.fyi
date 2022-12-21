import prisma from 'lib/prisma';

export default async function handle(req, res) {
	const { emailId } = req.body;
	try {
		const result = await prisma.user.create({
			data: { emailId },
		});

		return res.status(200).json(result);
	} catch (error) {
		return res
			.status(500)
			.send({ error, message: 'Failed to create a new user' });
	}
}
