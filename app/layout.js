import 'styles/globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='flex h-full flex-col font-sans text-gray-600 antialiased'>{children}</body>
		</html>
	);
}
