'use client';

import { useRouter } from 'next/navigation';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SWRConfig } from 'swr';

import fetcher from 'lib/fetcher';

interface User {
	currency: string;
	locale: string;
	billing_start_date: string;
	trial_start_date: string;
	order_status: string;
	usage: number;
	email: string;
	plan_status: string;
	new_signup_email: boolean;
	basic_usage_limit_email: boolean;
	premium_plan_expired_email: boolean;
	premium_usage_limit_email: boolean;
	monthly_email_report: boolean;
	isPremium: boolean;
	isPremiumPlanEnded: boolean;
}

interface Session {}

const AuthContext = createContext(null);

export const AuthProvider = (props: any) => {
	const [initial, setInitial] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const { accessToken, user, children, ...others } = props;

	useEffect(() => {
		const searchParams = new URLSearchParams(window?.location?.hash ?? '');
		const access_token = searchParams.get('#access_token');
		const refresh_token = searchParams.get('refresh_token');

		if (access_token && refresh_token) {
			supabase.auth.setSession({ access_token, refresh_token });
			router.push('/');
			setInitial(true);
		} else if (!accessToken) {
			window.location.href = '/signin';
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		async function getActiveSession() {
			const {
				data: { session: activeSession },
			} = await supabase.auth.getSession();
			setSession(activeSession ?? null);
			setInitial(false);
		}

		getActiveSession();

		const {
			data: { subscription: authListener },
		} = supabase.auth.onAuthStateChange((event, currentSession) => {
			if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				router.refresh();
			}

			if (event == 'SIGNED_OUT') {
				window.location.href = '/signin';
			}

			setSession(currentSession);
		});

		return () => {
			authListener?.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value = useMemo(() => {
		return {
			initial,
			session,
			user,
			signOut: () => supabase.auth.signOut(),
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initial, session, user]);

	return (
		<AuthContext.Provider value={value} {...others}>
			<SWRConfig value={{ fetcher }}>{session ? children : null}</SWRConfig>
		</AuthContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext<any>(AuthContext);
	if (context === undefined) {
		throw new Error(`useUser must be used within a AuthContext.`);
	}
	return context?.user ?? null;
};
