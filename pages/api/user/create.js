import prisma from 'lib/prisma';

export default async function handle(req, res) {
  const { name, emailId } = req.body;
  try {
    const result = await prisma.user.subscription({
      data: { name, emailId },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send({ error, message: 'failed to add the new subscription' });
  }
}
