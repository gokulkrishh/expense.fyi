import Router from 'next/router';

import { useEffect, useState } from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Analytics } from '@vercel/analytics/react';
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

import Layout from 'components/Layout';

import fetcher from 'lib/fetcher';

import 'styles/globals.css';

import 'nprogress/nprogress.css';

import '@tremor/react/dist/esm/tremor.css';

export default function App({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
		Router.events.on('routeChangeStart', () => NProgress.start());
		Router.events.on('routeChangeComplete', () => NProgress.done());
		Router.events.on('routeChangeError', () => NProgress.done());
	}, []);

	const isAuthenticated = pageProps.initialSession && pageProps.initialSession.user;

	return (
		<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
			<SWRConfig value={{ fetcher }}>
				{isAuthenticated ? (
					<Tooltip.Provider delayDuration={500}>
						<Layout user={pageProps.user}>
							<Component {...pageProps} />
						</Layout>
					</Tooltip.Provider>
				) : (
					<Component {...pageProps} />
				)}
				<Toaster />
				<Analytics />
			</SWRConfig>
		</SessionContextProvider>
	);
}
