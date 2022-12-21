import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '/lib/supabase';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<Component {...pageProps} />
		</SessionContextProvider>
	);
}
