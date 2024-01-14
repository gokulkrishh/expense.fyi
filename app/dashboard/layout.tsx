import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import NextTopLoader from 'nextjs-toploader';

import { AuthProvider } from 'components/context/auth-provider';
import { SidebarContextProvider } from 'components/context/sidebar-provider';
import { ThemeProvider } from 'components/context/theme-provider';
import DashboardLayout from 'components/layout';
import Sidebar from 'components/sidebar';
import { Toaster } from 'components/ui/sonner';

import { apiUrls } from 'lib/apiUrls';
import { Database } from 'lib/database.types';

import url from 'constants/url';

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID;

const inter = Inter({ subsets: ['latin'] });

const supabaseOption = {
	supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
};

const title = 'Expense.fyi – Overview';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export const revalidate = 0;

async function getUser(cookies: any) {
	const res = await fetch(`${url.serverApi}/${apiUrls.user.modify}`, {
		headers: { cookie: cookies },
	});
	if (!res.ok) {
		return {};
	}
	return await res.json();
}

export default async function Layout({ children }: any) {
	const supabase = createServerComponentClient<Database>({ cookies }, supabaseOption);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const user = await getUser(cookies());

	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<body className={`${inter.className} flex h-full flex-col text-gray-600 antialiased`}>
					<NextTopLoader color="#0076ff" height={2} showSpinner={false} />
					<AuthProvider user={user} accessToken={session?.access_token || null}>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<main className="relative flex min-h-full min-w-full bg-background">
								<DashboardLayout>
									<SidebarContextProvider>
										<Sidebar />
										<div className="h-full w-full sm:ml-[64px]">
											<div className="flex h-full w-full flex-col max-sm:ml-0">{children}</div>
										</div>
									</SidebarContextProvider>
								</DashboardLayout>
							</main>
						</ThemeProvider>
						<Toaster closeButton position="top-right" theme="system" visibleToasts={3} richColors />
					</AuthProvider>
				</body>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
					strategy="afterInteractive"
				/>
				<Script id="ga4" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${GOOGLE_ANALYTICS_ID}');
					`}
				</Script>
			</html>
		</>
	);
}
