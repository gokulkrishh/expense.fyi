'use client';

import { useRouter } from 'next/navigation';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUser } from 'app/dashboard/apis';

import prisma from 'lib/prisma';

interface User {}

interface Session {}

const AuthContext = createContext(null);

export const AuthProvider = (props: any) => {
	const [initial, setInitial] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const { accessToken, children, ...others } = props;

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
			const userData = await getUser();
			setSession(activeSession ?? null);
			setUser(userData);
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
			setUser(currentSession?.user ?? null);
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
			{session ? children : null}
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
