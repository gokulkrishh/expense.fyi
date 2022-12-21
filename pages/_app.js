import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

import Layout from '/components/Layout';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionContextProvider>
	);
}
