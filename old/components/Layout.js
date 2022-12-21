import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const user = useUser();
  return (
    <div className={`Layout ${!user ? 'Layout__signup' : ''}`}>
      {user ? (
        <div className='Layout__sidebar'>
          <Navbar />
        </div>
      ) : null}
      <div className='Layout__content'>{children}</div>
    </div>
  );
}
