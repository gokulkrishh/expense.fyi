import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="description" content="Effortlessly Track and Manage Expenses." />
				<meta name="application-name" content="Expense.fyi" />
				<meta name="theme-color" content="#e2f3fe" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="Expense.fyi" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#e2f3fe" />
				<meta name="msapplication-TileColor" content="#e2f3fe" />
				<meta name="msapplication-TileImage" content="/static/icons/mstile-150x150.png" />
				<meta name="msapplication-navbutton-color" content="#e2f3fe" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta property="og:title" content="expense.fyi" />
				<meta property="og:type" content="website" />
				<meta property="og:description" content="Effortlessly Track and Manage Expenses." />
				<meta property="og:url" content="https://expense.fyi/" />
				<meta property="og:image" content="https://expense.fyi/static/og.jpg" />
				<meta property="og:video" content="https://expense.fyi/static/demo.mp4" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Expense.fyi" />
				<meta name="twitter:image" content="https://expense.fyi/static/og.jpg" />
				<meta name="twitter:site" content="@gokul_i" />
				<meta name="twitter:url" content="https://expense.fyi/" />
				<meta name="twitter:description" content="Effortlessly Track and Manage Expenses." />
				<link href="/static/icons/icon.svg" rel="icon" type="image/svg+xml" />
				<link href="/static/icons/favicon.ico" rel="alternate icon" sizes="any" />
				<link href="/static/icons/apple-touch-icon.png" rel="apple-touch-icon" />
				<link rel="manifest" href="/static/manifest.json" />
			</Head>
			<body className="font-default flex h-full flex-col text-gray-600 antialiased">
				<Main />
				<div id="modal-root"></div>
				<NextScript />
			</body>
		</Html>
	);
}
