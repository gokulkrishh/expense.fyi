import Head from 'next/head';

import enforceAuthenticated from '/components/enforceAuthenticated';

export default function Subscriptions() {
  return (
    <div>
      <Head>
        <title>Subscriptions - Expense Tracker</title>
        <meta name="description" content="Subscriptions page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Subscriptions</h1>
      </main>

      <footer></footer>
    </div>
  );
}

export const getServerSideProps = enforceAuthenticated();
