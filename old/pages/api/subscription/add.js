import prisma from 'lib/prisma';

export default async function handle(req, res) {
  const { notes, name, amount, paid, userId } = req.body;
  try {
    await prisma.subscription.create({
      data: { notes, name, amount, paid, userId },
    });

    return res.status(201).json({ message: 'Subscription is added successfully' });
  } catch (error) {
    return res.status(500).send({ error: JSON.stringify(error || ''), message: 'failed to add the new subscription' });
  }
}
