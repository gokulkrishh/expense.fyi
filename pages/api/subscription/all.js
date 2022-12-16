import prisma from 'lib/prisma';

export default async function handle(req, res) {
  try {
    const allSubscription = await prisma.subscription.findMany();
    return res.status(200).json({ allSubscription });
  } catch (error) {
    return res.status(500).send({ error, message: 'failed to fetch the all subscriptions' });
  }
}
