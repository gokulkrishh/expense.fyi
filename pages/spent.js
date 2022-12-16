import Head from 'next/head';

import enforceAuthenticated from '/components/enforceAuthenticated';

export default function Spent() {
  return (
    <div>
      <Head>
        <title>Spent - Expense Tracker</title>
        <meta name="description" content="Spent page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Spent</h1>
      </main>

      <footer></footer>
    </div>
  );
}

export const getServerSideProps = enforceAuthenticated();
