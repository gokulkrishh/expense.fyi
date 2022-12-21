import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function enforceAuth() {
	return async (context) => {
		const supabase = createServerSupabaseClient(context);

		const { data } = await supabase.auth.getSession();
		const { session } = data;

		if (!session) {
			return {
				redirect: {
					destination: '/signup',
					permanent: false,
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
}
