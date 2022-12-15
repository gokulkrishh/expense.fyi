import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Signup() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Signup - Expense Tracker</title>
        <meta name="description" content="Signup for Expense Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Track your subscription at ease</h1>
        {!session ? (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        ) : (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </main>

      <footer></footer>
    </div>
  );
}
