import Image from 'next/image';
import { useSession } from 'next-auth/react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <div className="Layout">
        <div className="Layout__sidebar">
          <Navbar />
        </div>
        <div className="Layout__content">
          <div className="Layout__header">
            {session ? <Image src={session.user.image} alt={session.user.name} width={40} height={40} /> : null}
          </div>
          <div className="Layout__body">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
