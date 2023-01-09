import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function enforceAuth() {
	return async (context) => {
		const supabase = createServerSupabaseClient(context);

		const { data } = await supabase.auth.getSession();
		const { session } = data;

		if (!session) {
			return {
				redirect: {
					destination: '/signin',
					permanent: true,
				},
			};
		}

		const hostname = 'http://localhost:3000';
		const res = await fetch(`${hostname}/api/user/get?user_id=${session.user.id}`);
		const userData = await res.json();

		return {
			props: {
				initialSession: session,
				user: { ...session.user, currency: userData.currency },
			},
		};
	};
}
