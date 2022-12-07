import Head from 'next/head';

import AddExpense from 'components/AddExpense';

export default function Home({ title }) {
  return (
    <div>
      <Head>
        <title>Overview - Expense Tracker</title>
        <meta name="description" content="Overview page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="Overview__header">
          <h1>Overview</h1>
          <AddExpense />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
