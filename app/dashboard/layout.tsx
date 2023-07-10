import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { SWRConfig } from 'swr';

import { AuthProvider } from 'components/context/auth-provider';
import DashboardLayout from 'components/layout';
import Sidebar from 'components/sidebar';
import { ThemeProvider } from 'components/theme-provider';
import { Toaster } from 'components/ui/toaster';

import { Database } from 'lib/database.types';
import fetcher from 'lib/fetcher';

import url from 'constants/url';

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

async function getUser(cookies: any) {
	const res = await fetch(`${url.serverApi}/api/user`, {
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
					<AuthProvider user={user} accessToken={session?.access_token || null}>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<main className="relative flex min-h-full min-w-full bg-background">
								<DashboardLayout>
									<Sidebar />
									<div className="h-full w-full sm:ml-[64px]">
										<div className="flex h-full w-full flex-col max-sm:ml-0">{children}</div>
									</div>
								</DashboardLayout>
							</main>
						</ThemeProvider>
						<Toaster />
					</AuthProvider>
				</body>
			</html>
		</>
	);
}
