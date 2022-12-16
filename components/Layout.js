import { useUser } from '@supabase/auth-helpers-react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const user = useUser();
  return (
    <div className="Layout">
      {user ? (
        <div className="Layout__sidebar">
          <Navbar />
        </div>
      ) : null}
      <div className="Layout__content">{children}</div>
    </div>
  );
}
