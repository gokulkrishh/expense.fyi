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
				<link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#e2f3fe" />
				<link rel="apple-touch-icon" href="/static/icons/apple-touch-icon.png" />
				<link
					href="/static/icons/favicon-32x32.png"
					type="image/png"
					rel="icon"
					media="(prefers-color-scheme: light)"
				/>
				<link
					href="/static/icons/favicon-white-32x32.png"
					type="image/png"
					rel="icon"
					media="(prefers-color-scheme: dark)"
				/>
				<link href="/static/icons/favicon.ico" rel="shortcut icon" type="image/x-icon"></link>
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
