import Head from 'next/head';

import enforceAuthenticated from '/components/enforceAuthenticated';

export default function Savings() {
  return (
    <div>
      <Head>
        <title>Settings - Expense Tracker</title>
        <meta name="description" content="Settings page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Settings</h1>
      </main>

      <footer></footer>
    </div>
  );
}

export const getServerSideProps = enforceAuthenticated();
