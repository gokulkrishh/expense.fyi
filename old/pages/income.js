import Head from 'next/head';
import enforceAuthenticated from '/components/enforceAuthenticated';

export default function Income() {
  return (
    <div>
      <Head>
        <title>Income - Expense Tracker</title>
        <meta name="description" content="Income page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Income</h1>
      </main>

      <footer></footer>
    </div>
  );
}

export const getServerSideProps = enforceAuthenticated();
