import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import Login from '/components/Login';
import { supabase } from '/lib/supabase';

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Signup - Expense Tracker</title>
        <meta name="description" content="Signup for Expense Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (session) {
    return {
      redirect: { destination: '/', permanent: true },
    };
  }

  return { props: {} };
};
