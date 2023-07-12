import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const title = 'Expense.fyi – Track your expenses with ease';
const description = 'Effortlessly Track and Manage Expenses.';

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID;

export const metadata = {
	title,
	description,
	manifest: 'https://expense.fyi/static/manifest.json',
	themeColor: '#09090b',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		userScalable: false,
	},
	twitter: {
		card: 'summary_large_image',
		title,
		url: 'https://expense.fyi',
		description,
		creator: '@gokul_i',
		images: ['https://expense.fyi/static/og.jpg'],
	},
	openGraph: {
		title,
		description,
		video: 'https://expense.fyi/static/demo.mp4',
		url: 'https://expense.fyi',
		type: 'website',
		images: ['https://expense.fyi/static/og.jpg'],
	},
	icons: {
		icon: 'https://expense.fyi/static/icons/icon.svg',
		shortcut: 'https://expense.fyi/static/favicon.ico',
		apple: 'https://expense.fyi/static/icons/apple-icon.png',
	},
	appleWebApp: {
		mobileWebAppCapable: 'yes',
		title,
		statusBarStyle: '#09090b',
		startupImage: ['https://expense.fyi/static/icons/apple-icon.png'],
	},
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
