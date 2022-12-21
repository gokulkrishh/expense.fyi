import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
			</Head>
			<body className='flex h-full flex-col font-sans text-gray-600 antialiased'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
