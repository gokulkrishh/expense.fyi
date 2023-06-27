import DashboardLayout from '@/components/dashboard/layout';
import Sidebar from '@/components/dashboard/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';

const title = 'Expense.fyi – Overview';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

export default function Layout({ children }: any) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<body>
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
				</body>
			</html>
		</>
	);
}
