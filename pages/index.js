import Head from 'next/head';
import useSWR from 'swr';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import fetcher from 'lib/fetcher';
import AddExpense from 'components/AddExpense';
import Login from 'components/Login';
import SubscriptionData from 'components/SubscriptionData';
import enforceAuthenticated from '/components/enforceAuthenticated';

export default function Home({ user }) {
  const { data } = useSWR('/api/subscription/all', fetcher);

  return (
    <>
      <Head>
        <title>Login/Signup - Expense Tracker</title>
        <meta name="description" content="Login/Signup for Expense Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

export const getServerSideProps = enforceAuthenticated();
