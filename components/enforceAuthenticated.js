import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const enforceAuthenticated = () => {
  return async (context) => {
    const supabase = createServerSupabaseClient(context);

    const { data } = await supabase.auth.getSession();
    const { session } = data;

    if (!session) {
      return {
        redirect: {
          destination: '/signup',
          permanent: true,
        },
      };
    }

    return {
      props: {
        initialSession: session,
        user: session.user,
      },
    };
  };
};

export default enforceAuthenticated;
