import { Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import './overwrites.css';

const inter = Inter({ subsets: ['latin'] });

const title = 'Expense.fyi – Track your expenses with ease';
const description = 'Effortlessly Track and Manage Expenses.';

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID;

export const metadata = {
	title,
	description,
	manifest: 'https://expense.fyi/manifest.json',
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		creator: '@gokul_i',
		images: ['https://expense.fyi/og.jpg'],
	},
	openGraph: {
		title,
		description,
		url: 'https://expense.fyi',
		type: 'website',
		images: ['https://expense.fyi/og.jpg'],
	},
	icons: {
		icon: 'https://expense.fyi/icons/icon.svg',
		shortcut: 'https://expense.fyi/favicon.ico',
		apple: 'https://expense.fyi/icons/apple-icon.png',
	},
	appleWebApp: {
		title,
		statusBarStyle: 'black',
		startupImage: ['https://expense.fyi/icons/apple-icon.png'],
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	userScalable: false,
	themeColor: '#09090b',
};

export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex h-full flex-col text-gray-600 antialiased`}>{children}</body>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />
			<Script id="ga4" strategy="afterInteractive">
				{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${GOOGLE_ANALYTICS_ID}');
					`}
			</Script>
		</html>
	);
}
