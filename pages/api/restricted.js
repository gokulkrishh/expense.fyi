import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handle(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return res.send({
      content: 'This is protected content. You can access this content because you are signed in.',
    });
  }

  return res.send({
    error: 'You must be signed in to view the protected content on this page.',
  });
}
