import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '/lib/supabase';
import Layout from '/components/Layout';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionContextProvider>
	);
}
