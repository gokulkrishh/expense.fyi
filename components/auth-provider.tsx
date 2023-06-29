import { useRouter } from 'next/navigation';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface User {}

interface Session {}

const AuthContext = createContext(null);

export const AuthProvider = (props: any) => {
	const [initial, setInitial] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const { accessToken, ...rest } = props;

	useEffect(() => {
		async function getActiveSession() {
			const {
				data: { session: activeSession },
			} = await supabase.auth.getSession();
			setSession(activeSession ?? null);
			setUser(activeSession?.user ?? null);
			setInitial(false);
		}

		getActiveSession();

		const {
			data: { subscription: authListener },
		} = supabase.auth.onAuthStateChange((_, currentSession) => {
			if (currentSession?.access_token !== accessToken) {
				router.refresh();
			}

			setSession(currentSession);
			setUser(currentSession?.user ?? null);
		});

		return () => {
			authListener?.unsubscribe();
		};
	}, [accessToken, router, supabase.auth]);

	const value = useMemo(() => {
		return {
			initial,
			session,
			user,
			signOut: () => supabase.auth.signOut(),
		};
	}, [initial, session, supabase.auth, user]);

	return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
