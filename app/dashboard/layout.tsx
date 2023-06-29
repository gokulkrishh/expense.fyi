import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from 'components/context/auth-provider';
import DashboardLayout from 'components/layout';
import Sidebar from 'components/sidebar';
import { ThemeProvider } from 'components/theme-provider';

import { Database } from 'lib/database.types';

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

export default async function Layout({ children }: any) {
	const supabase = createServerComponentClient<Database>({ cookies }, supabaseOption);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<body>
					<AuthProvider accessToken={session?.access_token || null}>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<main className="relative flex min-h-full min-w-full bg-background">
								<DashboardLayout>
									<Sidebar />
									<div className="h-full w-full sm:ml-[64px]">
										<div className="h-full w-full max-sm:ml-0">{children}</div>
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
