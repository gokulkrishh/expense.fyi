import prisma from 'lib/prisma';

export default async function handle(req, res) {
  try {
    const allPosts = await prisma.subscription.findMany();
    return res.status(200).json({ allPosts });
  } catch (error) {
    return res.status(500).send({ error, message: 'failed to fetch the all subscriptions' });
  }
}
